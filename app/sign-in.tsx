import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const STEEL = "#9BA1AA";

/**
 * Modal email/password sign-in for the storefront, mirroring the admin form.
 * On success Clerk's session is activated and we pop back to the tabs; the
 * guest strip disappears reactively (CLAUDE.md §9).
 */
export default function SignInModal() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    if (!isLoaded || busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await signIn.create({ identifier: email, password });
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        router.back();
      } else {
        setError("Additional verification is required to sign in.");
      }
    } catch (err) {
      setError(clerkErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Ionicons name="shield-checkmark" size={16} color="#fff" />
          </View>
          <Text className="font-display text-base text-foreground">
            HikDigital
          </Text>
        </View>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          className="h-9 w-9 items-center justify-center rounded-full bg-secondary"
        >
          <Ionicons name="close" size={20} color={STEEL} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-xs font-semibold uppercase tracking-widest text-primary">
            Welcome
          </Text>
          <Text className="mt-1.5 font-display text-2xl text-foreground">
            Sign in to your account
          </Text>
          <Text className="mt-1.5 text-sm text-muted-foreground">
            Track orders, save favorites, and see your trade pricing.
          </Text>

          <View className="mt-7 gap-4">
            <Labeled label="Email address">
              <View className="h-12 flex-row items-center rounded-xl border border-input bg-secondary/50 px-3">
                <Ionicons name="mail-outline" size={18} color={STEEL} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={STEEL}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  className="ml-2 flex-1 text-sm text-foreground"
                />
              </View>
            </Labeled>

            <Labeled label="Password">
              <View className="h-12 flex-row items-center rounded-xl border border-input bg-secondary/50 px-3">
                <Ionicons name="lock-closed-outline" size={18} color={STEEL} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor={STEEL}
                  secureTextEntry={!show}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  className="ml-2 flex-1 text-sm text-foreground"
                />
                <Pressable onPress={() => setShow((s) => !s)} hitSlop={8}>
                  <Ionicons
                    name={show ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={STEEL}
                  />
                </Pressable>
              </View>
            </Labeled>
          </View>

          {error ? (
            <View className="mt-5 rounded-xl bg-destructive/10 px-3 py-2.5">
              <Text className="text-sm text-destructive">{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={onSubmit}
            disabled={busy || !isLoaded}
            activeOpacity={0.85}
            className="mt-6 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-primary"
            style={{
              opacity: busy || !isLoaded ? 0.6 : 1,
              shadowColor: "#DC0014",
              shadowOpacity: 0.4,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 5 },
            }}
          >
            <Text className="text-sm font-semibold text-primary-foreground">
              {busy ? "Signing in…" : "Sign in"}
            </Text>
            {busy ? null : (
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} className="mt-4 py-2">
            <Text className="text-center text-sm font-medium text-muted-foreground">
              Continue as guest
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Text className="mb-1.5 text-sm font-medium text-foreground">{label}</Text>
      {children}
    </View>
  );
}

function clerkErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "errors" in err) {
    const errors = (err as { errors?: { longMessage?: string; message?: string }[] })
      .errors;
    const first = errors?.[0];
    if (first) return first.longMessage ?? first.message ?? "Something went wrong.";
  }
  return "Something went wrong. Please try again.";
}
