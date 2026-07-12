const preset = require("@hikdigital/shared-ui/tailwind-preset").default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset"), preset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
