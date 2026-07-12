# hikdigital-mobile — Expo app

Companion shopping + technician app (Expo SDK 54, Expo Router, React 19). Clerk auth
with a secure-store token cache; Convex subscriptions; NativeWind consuming the shared
theme preset.

## Cross-repo dependencies (git deps)

```jsonc
"@hikdigital/backend":   "github:<org>/hikdigital-backend#main",   // Convex api
"@hikdigital/shared-ui": "github:<org>/hikdigital-shared-ui#main"  // theme preset
```

Local dev uses `file:../…` (already set). `metro.config.js` watches the sibling repos
so linked source is picked up.

## Commands

```bash
bun install
bun run start      # expo start
bun run typecheck
bun run lint       # expo lint
```

## Env (`.env.example`)

`EXPO_PUBLIC_CONVEX_URL`, `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`, `EXPO_PUBLIC_SENTRY_DSN`.

See the platform docs in the **hikdigital-backend** repo (CLAUDE.md §9).
