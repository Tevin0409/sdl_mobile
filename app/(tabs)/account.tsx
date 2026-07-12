import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@hikdigital/backend/convex/_generated/api";

const STEEL = "#9BA1AA";
type IconName = keyof typeof Ionicons.glyphMap;

export default function AccountScreen() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const me = useQuery(api.profiles.getMe);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 pb-3 pt-1">
        <Text className="font-display text-xl text-foreground">Account</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4 }}>
        {isSignedIn ? (
          <>
            <View className="mb-4 flex-row items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Ionicons name="person" size={26} color="#DC0014" />
              </View>
              <View className="flex-1">
                <Text className="font-display text-base text-foreground">
                  {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Signed in"}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </Text>
                <View className="mt-1.5 flex-row gap-1.5">
                  <Pill>{me?.pricingTier ?? "…"}</Pill>
                  {me?.role ? <Pill>{me.role}</Pill> : null}
                </View>
              </View>
            </View>

            <View className="overflow-hidden rounded-2xl border border-border bg-card">
              <MenuRow icon="receipt-outline" label="Orders" />
              <MenuRow icon="location-outline" label="Addresses" />
              <MenuRow icon="heart-outline" label="Favorites" />
              <MenuRow icon="settings-outline" label="Settings" last />
            </View>

            <TouchableOpacity
              onPress={() => signOut()}
              className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl border border-destructive/40 py-3.5"
            >
              <Ionicons name="log-out-outline" size={18} color="#DC0014" />
              <Text className="text-sm font-semibold text-destructive">
                Sign out
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View className="items-center rounded-2xl border border-border bg-card px-6 py-10">
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Ionicons name="person-outline" size={34} color={STEEL} />
            </View>
            <Text className="text-center font-display text-lg text-foreground">
              You’re browsing as a guest
            </Text>
            <Text className="mt-2 text-center text-sm text-muted-foreground">
              Sign in to track orders, save favorites, and unlock your trade
              pricing.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/sign-in")}
              className="mt-6 w-full flex-row items-center justify-center gap-2 rounded-full bg-primary py-3"
              style={{
                shadowColor: "#DC0014",
                shadowOpacity: 0.4,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <Text className="text-sm font-semibold text-primary-foreground">
                Sign in
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-full bg-secondary px-2 py-0.5">
      <Text className="font-mono text-[10px] text-muted-foreground">
        {children}
      </Text>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  last,
}: {
  icon: IconName;
  label: string;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      className={
        last
          ? "flex-row items-center gap-3 px-4 py-3.5"
          : "flex-row items-center gap-3 border-b border-border px-4 py-3.5"
      }
    >
      <Ionicons name={icon} size={20} color={STEEL} />
      <Text className="flex-1 text-sm text-foreground">{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={STEEL} />
    </TouchableOpacity>
  );
}
