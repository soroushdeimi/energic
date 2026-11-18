import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#253644",
          2: "#2d4152",
        },
        green: "#00a950",
        bg: "#ffffff",
        "bg-soft": "#f5f5f5",
        muted: "#a3a3a3",
        "blue-1": "#78b9ff",
        "blue-2": "#c2d6ff",
        danger: "#ff7878",
      },
      fontFamily: {
        peyda: ["var(--font-peyda)", "Tahoma", "Arial", "sans-serif"],
        vazirmatn: ["var(--font-vazirmatn)", "Tahoma", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        pill: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
