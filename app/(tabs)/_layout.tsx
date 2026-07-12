import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const ACTIVE = "#DC0014"; // brand red
const INACTIVE = "#9BA1AA"; // steel-400

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: Record<string, { label: string; icon: IconName; active: IconName }> = {
  index: { label: "Shop", icon: "storefront-outline", active: "storefront" },
  categories: { label: "Categories", icon: "grid-outline", active: "grid" },
  favorites: { label: "Favorites", icon: "heart-outline", active: "heart" },
  account: { label: "Account", icon: "person-outline", active: "person" },
};

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}

/** Custom bar = guest "sign in" strip (when signed out) + the tab buttons. */
function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <View className="border-t border-border bg-card">
      {isSignedIn ? null : (
        <View className="flex-row items-center gap-3 border-b border-border bg-secondary px-4 py-2.5">
          <Ionicons name="sparkles" size={16} color={ACTIVE} />
          <Text className="flex-1 text-sm text-foreground">
            Sign in and enjoy more
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="rounded-full bg-primary px-4 py-1.5"
            style={{
              shadowColor: ACTIVE,
              shadowOpacity: 0.4,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
            }}
          >
            <Text className="text-sm font-semibold text-primary-foreground">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row" style={{ paddingBottom: insets.bottom || 8 }}>
        {state.routes.map((route, index) => {
          const meta = TABS[route.name];
          if (!meta) return null;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              className="flex-1 items-center gap-1 pt-2.5"
            >
              <Ionicons
                name={focused ? meta.active : meta.icon}
                size={22}
                color={focused ? ACTIVE : INACTIVE}
              />
              <Text
                className="text-[11px] font-medium"
                style={{ color: focused ? ACTIVE : INACTIVE }}
              >
                {meta.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
