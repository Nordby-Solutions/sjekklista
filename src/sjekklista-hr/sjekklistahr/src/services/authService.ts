/**
 * Authentication Service
 * Manages OIDC flow, token storage, and refresh logic
 * Designed to support refresh tokens and automatic token renewal
 */

import { UserManager, type UserManagerSettings, User, type StateStore } from 'oidc-client-ts';
import { authConfig } from '../config/authConfig';

/**
 * Session storage-based StateStore implementation for OIDC state
 */
class SessionStorageStateStore implements StateStore {
  async set(key: string, value: string): Promise<void> {
    sessionStorage.setItem(key, value);
  }

  async get(key: string): Promise<string | null> {
    return sessionStorage.getItem(key);
  }

  async remove(key: string): Promise<string | null> {
    const value = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    return value;
  }

  async getAllKeys(): Promise<string[]> {
    return Object.keys(sessionStorage);
  }
}

export class AuthService {
  private userManager: UserManager;
  private currentUser: User | null = null;

  constructor() {
    const settings: UserManagerSettings = {
      ...authConfig,
      // Enable token refresh via refresh token (when supported by backend)
      accessTokenExpiringNotificationTimeInSeconds: 60,
      // Use session storage for OIDC state
      userStore: new SessionStorageStateStore(),
    };

    this.userManager = new UserManager(settings);

    // Subscribe to token expiration events for refresh token implementation
    this.userManager.events.addAccessTokenExpiring(() => {
      console.warn('Access token expiring soon');
      // Trigger automatic renewal when implemented with refresh tokens
      this.renewToken();
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.warn('Access token expired');
      // Redirect to login if renewal fails
      this.logout();
    });

    this.userManager.events.addUserLoaded((user) => {
      this.currentUser = user;
    });

    this.userManager.events.addUserUnloaded(() => {
      this.currentUser = null;
    });
  }

  /**
   * Subscribe to user loaded event
   */
  addUserLoaded(handler: (user: User) => void): () => void {
    this.userManager.events.addUserLoaded(handler);
    return () => this.userManager.events.removeUserLoaded(handler);
  }

  /**
   * Subscribe to user unloaded event
   */
  addUserUnloaded(handler: () => void): () => void {
    this.userManager.events.addUserUnloaded(handler);
    return () => this.userManager.events.removeUserUnloaded(handler);
  }

  /**
   * Start the login flow
   */
  async login(): Promise<void> {
    try {
      await this.userManager.signinRedirect();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Handle redirect from IDP callback
   */
  async handleCallback(): Promise<User | null> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      this.currentUser = user;
      return user;
    } catch (error) {
      console.error('Callback handling failed:', error);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  async getUser(): Promise<User | null> {
    if (!this.currentUser) {
      this.currentUser = await this.userManager.getUser();
    }
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return !!user && !user.expired;
  }

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.access_token || null;
  }

  /**
   * Get refresh token (for future implementation)
   */
  async getRefreshToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.refresh_token || null;
  }

  /**
   * Renew access token using refresh token
   * This will be enhanced when refresh token grant is fully configured
   */
  async renewToken(): Promise<User | null> {
    try {
      const user = await this.userManager.signinSilent();
      this.currentUser = user;
      return user;
    } catch (error) {
      console.warn('Token renewal failed:', error);
      // If renewal fails, force logout
      await this.logout();
      return null;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.userManager.signoutRedirect();
      this.currentUser = null;
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear local state even if redirect fails
      this.currentUser = null;
      sessionStorage.clear();
    }
  }

  /**
   * Get user claims (profile information)
   */
  async getClaims(): Promise<Record<string, any> | null> {
    const user = await this.getUser();
    return user?.profile || null;
  }

  /**
   * Get user ID
   */
  async getUserId(): Promise<string | null> {
    const user = await this.getUser();
    return user?.profile?.sub || null;
  }
}

// Singleton instance
export const authService = new AuthService();
