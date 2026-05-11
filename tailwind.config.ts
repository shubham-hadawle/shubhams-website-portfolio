import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        graphite: {
          50: "#f5f5f6",
          100: "#e6e6e8",
          200: "#c6c6cc",
          300: "#a4a4ad",
          400: "#7d7d88",
          500: "#5b5b66",
          600: "#43434c",
          700: "#2f2f37",
          800: "#1c1c22",
          900: "#0d0d10",
          950: "#070709",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "grid-pan": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(40px, 40px, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0.4) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "aurora": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "grid-pan": "grid-pan 20s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "sparkle": "sparkle 3.6s ease-in-out infinite",
        "shine-sweep": "shine-sweep 1.4s ease-out",
        "spin-slow": "spin-slow 28s linear infinite",
        "aurora": "aurora 18s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
      },
      boxShadow: {
        "card": "0 1px 0 hsl(var(--border)), 0 8px 24px -12px hsl(var(--shadow) / 0.5)",
        "card-hover":
          "0 1px 0 hsl(var(--foreground) / 0.08), 0 18px 50px -22px hsl(var(--shadow) / 0.6)",
        "glow-soft": "0 0 0 1px hsl(var(--border)), 0 0 40px -8px hsl(var(--foreground) / 0.18)",
        "glow-indigo":
          "0 0 0 1px hsl(231 80% 70% / 0.35), 0 0 40px -8px hsl(231 90% 70% / 0.35)",
        "glow-amber":
          "0 0 0 1px hsl(35 95% 60% / 0.35), 0 0 40px -8px hsl(35 95% 60% / 0.35)",
        "glow-emerald":
          "0 0 0 1px hsl(151 70% 55% / 0.35), 0 0 40px -8px hsl(151 70% 55% / 0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
