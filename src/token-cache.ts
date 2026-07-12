import * as SecureStore from "expo-secure-store";

/**
 * Persists the Clerk session token in the device secure enclave / keystore
 * (CLAUDE.md §9). Passed to `ClerkProvider`.
 */
export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // best-effort; a failed save just forces re-auth next launch
    }
  },
};
