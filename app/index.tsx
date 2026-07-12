import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@hikdigital/backend/convex/_generated/api";

export default function HomeScreen() {
  const { isSignedIn } = useAuth();
  const me = useQuery(api.profiles.getMe);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-3 p-6">
        <Text className="font-display text-2xl font-bold text-foreground">
          HikDigital Mart
        </Text>
        <Text className="text-center text-muted-foreground">
          Mobile scaffold — identity + Convex wiring. Shopping and technician
          flows land in later modules.
        </Text>
        <Text className="font-mono text-xs text-muted-foreground">
          {isSignedIn ? `tier: ${me?.pricingTier ?? "…"}` : "browsing as guest"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
