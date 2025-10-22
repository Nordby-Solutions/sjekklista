// src/utils/jwks.ts
import { createRemoteJWKSet, jwtVerify, JWK } from "jose";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const JWKS_URL = `${SUPABASE_URL.replace(
  /\/$/,
  ""
)}/auth/v1/.well-known/jwks.json`;

const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

// maybe add caching logic, e.g., TTL or memory cache, to avoid fetching every request

export async function verifySupabaseJWT(token: string) {
  // The verify call will pick the right key based on the token’s header.kid
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `${SUPABASE_URL}/auth/v1`,
    // maybe audience depending on your config
  });
  return payload;
}
