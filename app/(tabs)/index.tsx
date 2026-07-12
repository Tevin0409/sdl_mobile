import { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  CATEGORIES,
  PRODUCTS,
  formatKes,
  type MockProduct,
} from "../../src/mock-data";

const STEEL = "#9BA1AA";
const RED = "#DC0014";

export default function ShopScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCat = category === "all" || p.category === category;
      const inQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [query, category]);

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="px-4 pb-3 pt-1">
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="font-display text-xl text-foreground">
              HikDigital Mart
            </Text>
            <Text className="text-xs text-muted-foreground">
              Hikvision distributor · Nairobi
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2.5">
          <View className="h-11 flex-1 flex-row items-center rounded-full bg-secondary px-3.5">
            <Ionicons name="search" size={18} color={STEEL} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search cameras, NVRs, SKUs"
              placeholderTextColor={STEEL}
              className="ml-2 flex-1 text-sm text-foreground"
            />
          </View>
          <IconButton icon="heart-outline" />
          <IconButton icon="cart-outline" badge={2} />
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <PromoBanner />
            <CategoryChips selected={category} onSelect={setCategory} />
            <Text className="mb-1 mt-1 px-4 font-display text-base text-foreground">
              {category === "all"
                ? "Popular products"
                : CATEGORIES.find((c) => c.id === category)?.name}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="px-4 py-10 text-center text-muted-foreground">
            No products match “{query}”.
          </Text>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            favorite={favorites.has(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */

function IconButton({
  icon,
  badge,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  badge?: number;
}) {
  return (
    <TouchableOpacity className="relative h-11 w-11 items-center justify-center rounded-full bg-secondary">
      <Ionicons name={icon} size={20} color={STEEL} />
      {badge ? (
        <View className="absolute -right-0.5 -top-0.5 h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1">
          <Text className="text-[10px] font-bold text-primary-foreground">
            {badge}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

function PromoBanner() {
  return (
    <View className="mx-4 mb-4 overflow-hidden rounded-2xl bg-steel-900 p-4">
      <View
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20"
        pointerEvents="none"
      />
      <Text className="text-xs font-semibold uppercase tracking-widest text-primary">
        Trade pricing
      </Text>
      <Text className="mt-1 font-display text-lg text-white">
        Save more as a verified installer
      </Text>
      <Text className="mt-1 text-sm text-steel-300">
        Sign in to unlock your tier pricing on every SKU.
      </Text>
    </View>
  );
}

function CategoryChips({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <FlatList
      horizontal
      data={CATEGORIES}
      keyExtractor={(c) => c.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 14 }}
      renderItem={({ item }) => {
        const active = item.id === selected;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            className={
              active
                ? "flex-row items-center gap-1.5 rounded-full bg-primary px-3.5 py-2"
                : "flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2"
            }
          >
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={15}
              color={active ? "#fff" : STEEL}
            />
            <Text
              className={
                active
                  ? "text-sm font-semibold text-primary-foreground"
                  : "text-sm text-muted-foreground"
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

function ProductCard({
  product,
  favorite,
  onToggleFavorite,
}: {
  product: MockProduct;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="flex-1 rounded-2xl border border-border bg-card p-3"
    >
      <View className="mb-2.5 aspect-square items-center justify-center rounded-xl bg-secondary">
        <Ionicons
          name={product.icon as keyof typeof Ionicons.glyphMap}
          size={46}
          color={STEEL}
        />
        {product.badge ? (
          <View className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5">
            <Text className="text-[10px] font-bold text-primary-foreground">
              {product.badge}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={onToggleFavorite}
          hitSlop={8}
          className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-card/90"
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={favorite ? RED : STEEL}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {product.category}
      </Text>
      <Text
        className="mt-0.5 font-display text-sm text-foreground"
        numberOfLines={1}
      >
        {product.name}
      </Text>
      <Text className="mt-1 font-mono text-sm font-semibold text-primary">
        {formatKes(product.priceKes)}
      </Text>
    </TouchableOpacity>
  );
}
