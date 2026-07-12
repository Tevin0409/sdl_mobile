/**
 * Placeholder catalog data for the storefront UI. Replaced by real Convex
 * queries when the catalog module lands — the shapes here loosely mirror what
 * those documents will expose (SKU, price in KES, category).
 */

export type MockProduct = {
  id: string;
  name: string;
  sku: string;
  priceKes: number;
  category: string;
  /** Ionicons glyph used as an image stand-in until real media exists. */
  icon: string;
  badge?: string;
};

export type MockCategory = {
  id: string;
  name: string;
  icon: string;
};

export const CATEGORIES: MockCategory[] = [
  { id: "all", name: "All", icon: "grid-outline" },
  { id: "cameras", name: "Cameras", icon: "videocam-outline" },
  { id: "nvr", name: "NVR / DVR", icon: "hardware-chip-outline" },
  { id: "access", name: "Access", icon: "finger-print-outline" },
  { id: "alarms", name: "Alarms", icon: "notifications-outline" },
  { id: "network", name: "Network", icon: "wifi-outline" },
];

export const PRODUCTS: MockProduct[] = [
  {
    id: "p1",
    name: "DS-2CD2143G2 Dome",
    sku: "DS-2CD2143G2-I",
    priceKes: 12500,
    category: "cameras",
    icon: "videocam-outline",
    badge: "4MP",
  },
  {
    id: "p2",
    name: "ColorVu Bullet 4MP",
    sku: "DS-2CD2047G2-L",
    priceKes: 15900,
    category: "cameras",
    icon: "videocam-outline",
    badge: "ColorVu",
  },
  {
    id: "p3",
    name: "8-Ch 4K NVR",
    sku: "DS-7608NXI-K2",
    priceKes: 28400,
    category: "nvr",
    icon: "hardware-chip-outline",
    badge: "AcuSense",
  },
  {
    id: "p4",
    name: "16-Ch Turbo DVR",
    sku: "iDS-7216HQHI-M2",
    priceKes: 21750,
    category: "nvr",
    icon: "hardware-chip-outline",
  },
  {
    id: "p5",
    name: "Fingerprint Terminal",
    sku: "DS-K1T341AMF",
    priceKes: 34900,
    category: "access",
    icon: "finger-print-outline",
    badge: "Face + Card",
  },
  {
    id: "p6",
    name: "Wireless PIR Detector",
    sku: "DS-PDP15P-EG2-WE",
    priceKes: 6800,
    category: "alarms",
    icon: "notifications-outline",
  },
  {
    id: "p7",
    name: "PoE Switch 8-Port",
    sku: "DS-3E1310P-EI",
    priceKes: 11200,
    category: "network",
    icon: "wifi-outline",
    badge: "PoE+",
  },
  {
    id: "p8",
    name: "PTZ ColorVu 4MP",
    sku: "DS-2DE4425IW-DE",
    priceKes: 58600,
    category: "cameras",
    icon: "videocam-outline",
    badge: "25× Zoom",
  },
];

export function formatKes(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}
