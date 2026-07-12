import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BRAND_DARK = "#101216"; // steel-950
const BRAND_RED = "#DC0014"; // hik-600 / primary

/**
 * Branded launch animation shown over the app until it finishes (~1.7s), then
 * `onFinish` unmounts it to reveal the storefront. Uses RN's `Animated`
 * (native driver) — no Reanimated/worklets babel wiring required.
 */
export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const markScale = useRef(new Animated.Value(0.6)).current;
  const markOpacity = useRef(new Animated.Value(0)).current;
  const wordShift = useRef(new Animated.Value(14)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const underline = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(markScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(markOpacity, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(wordOpacity, {
          toValue: 1,
          duration: 360,
          useNativeDriver: true,
        }),
        Animated.timing(wordShift, {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(underline, {
        toValue: 1,
        duration: 420,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(420),
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 340,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onFinish();
    });
    // animation refs are stable; run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container, { opacity: containerOpacity }]}
      pointerEvents="none"
    >
      <Animated.View
        style={[
          styles.mark,
          { opacity: markOpacity, transform: [{ scale: markScale }] },
        ]}
      >
        <Ionicons name="shield-checkmark" size={40} color="#fff" />
      </Animated.View>

      <Animated.View
        style={{ opacity: wordOpacity, transform: [{ translateY: wordShift }] }}
      >
        <Text style={styles.wordmark}>HikDigital Mart</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.underline,
          { transform: [{ scaleX: underline }] },
        ]}
      />

      <Animated.Text style={[styles.tagline, { opacity: wordOpacity }]}>
        Hikvision security, delivered
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BRAND_DARK,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  mark: {
    height: 84,
    width: 84,
    borderRadius: 22,
    backgroundColor: BRAND_RED,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    shadowColor: BRAND_RED,
    shadowOpacity: 0.55,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  wordmark: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    color: "#fff",
    letterSpacing: 0.3,
  },
  underline: {
    marginTop: 14,
    height: 3,
    width: 72,
    borderRadius: 999,
    backgroundColor: BRAND_RED,
  },
  tagline: {
    marginTop: 18,
    fontSize: 13,
    color: "#9BA1AA", // steel-400
    letterSpacing: 0.2,
  },
});
