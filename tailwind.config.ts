import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#f8fafc",
          muted: "#aeb8c8",
          night: "#050713",
          panel: "rgba(255, 255, 255, 0.06)",
          gold: "#f5c76b",
          magenta: "#b61592",
          blue: "#4f7cff"
        }
      },
      boxShadow: {
        cinematic: "0 28px 90px rgba(0, 0, 0, 0.42)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
