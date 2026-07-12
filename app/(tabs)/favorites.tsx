import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

/**
 * Favorites empty-state. Once the catalog module lands this reads the user's
 * saved products from Convex; for now it nudges guests to sign in so favorites
 * can persist to their account.
 */
export default function FavoritesScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 pb-3 pt-1">
        <Text className="font-display text-xl text-foreground">Favorites</Text>
        <Text className="text-xs text-muted-foreground">
          Products you’ve saved
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Ionicons name="heart-outline" size={34} color="#9BA1AA" />
        </View>
        <Text className="text-center font-display text-lg text-foreground">
          No favorites yet
        </Text>
        <Text className="mt-2 text-center text-sm text-muted-foreground">
          Tap the heart on any product to save it here.
        </Text>

        {isSignedIn ? null : (
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="mt-6 flex-row items-center gap-2 rounded-full bg-primary px-5 py-2.5"
            style={{
              shadowColor: "#DC0014",
              shadowOpacity: 0.4,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Text className="text-sm font-semibold text-primary-foreground">
              Sign in to sync
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
