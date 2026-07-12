import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORIES, PRODUCTS } from "../../src/mock-data";

const STEEL = "#9BA1AA";

/** Category browse grid (mock counts until the catalog module lands). */
export default function CategoriesScreen() {
  const categories = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 pb-3 pt-1">
        <Text className="font-display text-xl text-foreground">Categories</Text>
        <Text className="text-xs text-muted-foreground">
          Browse the Hikvision range
        </Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(c) => c.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const count = PRODUCTS.filter((p) => p.category === item.id).length;
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              className="flex-1 rounded-2xl border border-border bg-card p-4"
            >
              <View className="mb-3 h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                  color="#DC0014"
                />
              </View>
              <Text className="font-display text-base text-foreground">
                {item.name}
              </Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">
                {count} {count === 1 ? "product" : "products"}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={STEEL}
                style={{ position: "absolute", right: 14, top: 16 }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
