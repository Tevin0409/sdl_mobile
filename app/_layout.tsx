import { useCallback, useState } from "react";
import { View } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { tokenCache } from "../src/token-cache";
import { AnimatedSplash } from "../src/animated-splash";
import "../global.css";

// Keep the native splash up until fonts are ready, then the animated splash
// takes over — no white flash between the two.
void SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

/**
 * Root providers: Clerk (secure-store token cache) + Convex. Boots through an
 * animated brand splash, then a Stack whose default route is the tab group and
 * whose `sign-in` route presents as a modal (CLAUDE.md §9).
 */
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });
  const [splashDone, setSplashDone] = useState(false);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <View style={{ flex: 1, backgroundColor: "#101216" }} onLayout={onLayout}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="sign-in"
              options={{ presentation: "modal" }}
            />
          </Stack>
          {splashDone ? null : (
            <AnimatedSplash onFinish={() => setSplashDone(true)} />
          )}
        </View>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
