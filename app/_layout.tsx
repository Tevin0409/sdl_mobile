import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "../src/token-cache";
import "../global.css";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

/**
 * Root providers: Clerk (secure-store token cache) + Convex. Real-time comes
 * from Convex subscriptions; the same `getMe`/RBAC model as web applies
 * (CLAUDE.md §9).
 */
export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <StatusBar style="auto" />
        <Slot />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
