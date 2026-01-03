# Authentication Setup Guide

## Overview

This guide explains the OpenID Connect (OIDC) authentication setup configured for the Sjekklista HR application.

## Configuration

### Environment Variables

Create a `.env.local` file in the `sjekklistahr` directory with the following values:

```env
VITE_AUTH_AUTHORITY=https://localhost:7222
VITE_AUTH_CLIENT_ID=react-client
VITE_AUTH_REDIRECT_URI=http://localhost:3000/callback
VITE_AUTH_POST_LOGOUT_URI=http://localhost:3000
VITE_API_BASE_URL=http://localhost:5000/api
```

These values can also be customized in `src/config/authConfig.ts`.

## Architecture

### Components

1. **AuthService** (`src/services/authService.ts`)
   - Manages OIDC user manager and user lifecycle
   - Handles login, logout, token management
   - Supports automatic token renewal via refresh tokens
   - Manages token expiration events

2. **AuthContext** (`src/context/AuthContext.tsx`)
   - Provides authentication state to React components
   - Exposes `useAuth()` hook for accessing auth methods and state
   - Manages user, tokens, loading, and error states

3. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Route wrapper that enforces authentication
   - Redirects unauthenticated users to `/login`

4. **LoginPage** (`src/pages/LoginPage.tsx`)
   - Entry point for unauthenticated users
   - Initiates the OIDC login flow

5. **AuthCallback** (`src/pages/AuthCallback.tsx`)
   - Handles IDP redirect after successful authentication
   - Processes the authorization code and exchanges for tokens

6. **ApiClient** (`src/data/apiClient.ts`)
   - Enhanced with automatic authorization header injection
   - Handles 401 responses with automatic token renewal
   - Integrates with AuthService for token management

## Authentication Flow

### Initial Login
1. User visits `/` → redirected to `/select-tenant` → protected route requires auth
2. User is redirected to `/login` page
3. User clicks "Sign In" → `authService.login()` initiates OIDC redirect
4. IDP redirects to `http://localhost:3000/callback` with authorization code
5. `AuthCallback` component processes the code exchange for tokens
6. User is redirected to `/select-tenant` with valid access token

### API Requests
1. Any API request includes `Authorization: Bearer {accessToken}` header
2. If API returns 401, axios interceptor attempts token renewal
3. If renewal succeeds, original request is retried
4. If renewal fails, user is logged out

### Token Refresh (Future Implementation)
The current setup is designed to support refresh token flow:
- `AuthService.renewToken()` uses `signinSilent()` for token refresh
- IDP can return refresh tokens during initial authentication
- Configure `response_type` in authConfig to include refresh token support:
  ```typescript
  // When IDP supports it, enable:
  response_type: 'code',
  access_type: 'offline', // or grant_type: 'refresh_token'
  ```

## Using Authentication in Components

### Check Authentication Status
```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return <div>You are authenticated!</div>;
}
```

### Get User Information
```typescript
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <p>Name: {user?.profile?.name}</p>
      <p>Email: {user?.profile?.email}</p>
    </div>
  );
}
```

### Get Access Token
```typescript
const { accessToken } = useAuth();

// Token is automatically included in API requests
// Access it directly if needed for custom headers
console.log('Token:', accessToken);
```

### Logout User
```typescript
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();

  return <button onClick={() => logout()}>Logout</button>;
}
```

## IDP Configuration Requirements

Your IDP must be configured with:

1. **Client Registration**
   - Client ID: `react-client`
   - Redirect URI: `http://localhost:3000/callback`
   - Response Type: `code` (Authorization Code Flow)
   - Scopes: `openid profile sjekklista.api`

2. **Token Support**
   - Access Token endpoint
   - Optional: Refresh Token grant (for token renewal)
   - Optional: Introspection endpoint (for token validation)

3. **CORS Configuration**
   - Allow requests from `http://localhost:3000`
   - Allow `Authorization` header

## Backend API Integration

### Required Headers
Your API should expect:
- `Authorization: Bearer {accessToken}` - For authenticated requests
- `X-Tenant: {tenantId}` - For tenant identification (already configured)

### Token Validation
The API should:
1. Validate the JWT signature using IDP's public key
2. Check token expiration
3. Return 401 if token is invalid or expired
4. Optionally return 403 if user lacks required scopes

Example backend validation (C#/ASP.NET Core):
```csharp
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = "https://localhost:7222";
    options.Audience = "sjekklista.api";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
    };
});
```

## Security Best Practices Implemented

1. **Token Storage**: Tokens stored in sessionStorage (cleared on tab close)
2. **HTTPS Only**: Configured for HTTPS URLs in production
3. **Secure Cookies**: Refresh tokens should use httpOnly flag (IDP configuration)
4. **Token Expiration**: Automatic logout on token expiration
5. **Silent Renewal**: Configured to refresh tokens before expiration
6. **PKCE Support**: oidc-client-ts supports PKCE (recommended for SPAs)

## Troubleshooting

### Issue: Token Not Included in API Requests
- Check that `ApiClient.interceptors.request` is properly configured
- Verify `authService.getAccessToken()` returns a valid token
- Check browser console for errors

### Issue: 401 Errors and Infinite Redirects
- Verify IDP credentials in `.env.local`
- Check that `redirect_uri` matches IDP configuration
- Ensure API returns 401 for invalid tokens (not 403)

### Issue: Silent Renewal Not Working
- Verify IDP has CORS enabled for the app origin
- Check that refresh tokens are being issued by IDP
- Ensure IDP supports `response_type=code` with token refresh

## Future Enhancements

1. **Refresh Token Rotation**: Implement server-side refresh token rotation
2. **Token Introspection**: Add periodic token validation
3. **Multi-Tab Sync**: Sync auth state across browser tabs
4. **Revocation**: Implement token revocation on logout
5. **Custom Claims**: Extract and use custom claims from user profile
6. **Role-Based Access**: Implement role checks in ProtectedRoute

## Additional Resources

- [oidc-client-ts Documentation](https://github.com/authts/oidc-client-ts)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
- [RFC 6749 - OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
- [PKCE - Authorization Code Flow with PKCE](https://tools.ietf.org/html/rfc7636)
