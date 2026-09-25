import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Borboleta brand colors
        borboleta: {
          purple: {
            50: "#f5f0ff",
            100: "#ede0ff",
            200: "#dcc5ff",
            300: "#c59aff",
            400: "#ab65ff",
            500: "#9333ea",
            600: "#7c22d4",
            700: "#6b1abd",
            800: "#581799",
            900: "#48167d",
            950: "#2e0a57",
          },
          gold: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#d4a017",
            600: "#b78309",
            700: "#926408",
            800: "#78500b",
            900: "#64420e",
          },
          rose: {
            DEFAULT: "#e879a0",
            light: "#f5a3c2",
            dark: "#c4527a",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        butterfly: {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg) scaleX(1)" },
          "25%": { transform: "translateY(-20px) rotate(5deg) scaleX(0.8)" },
          "50%": { transform: "translateY(-10px) rotate(-3deg) scaleX(1)" },
          "75%": { transform: "translateY(-25px) rotate(8deg) scaleX(0.9)" },
        },
        "wing-flutter": {
          "0%, 100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 160, 23, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(212, 160, 23, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        butterfly: "butterfly 4s ease-in-out infinite",
        "wing-flutter": "wing-flutter 0.3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s infinite",
      },
      backgroundImage: {
        "gradient-borboleta":
          "linear-gradient(135deg, #9333ea 0%, #d4a017 50%, #e879a0 100%)",
        "gradient-purple-gold":
          "linear-gradient(135deg, #6b1abd 0%, #d4a017 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
