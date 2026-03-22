import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
<<<<<<< HEAD
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
=======
>>>>>>> 5511633 (Initial commit from Create Next App)
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
<<<<<<< HEAD
        brand: {
          primary: "#5057f5",
          "primary-light": "#e8e9fe",
          secondary: "#7c3aed",
          orange: "#ff5c26",
          "orange-light": "#fff1eb",
          teal: "#00b2a9",
          "teal-light": "#e6faf9",
          slate: "#475467",
        },
        neutral: {
          900: "#101828",
          800: "#1a1c21",
          700: "#344054",
          600: "#475467",
          500: "#667085",
          400: "#98a2b3",
          300: "#d0d5dd",
          200: "#eaecf0",
          100: "#f2f4f7",
          50: "#f9fafb",
        },
        status: {
          success: "#12b76a",
          "success-bg": "#ecfdf3",
          "success-border": "#abefc6",
          warning: "#f79009",
          "warning-bg": "#fffaeb",
          "warning-border": "#fedf89",
          error: "#f04438",
          "error-bg": "#fef3f2",
          "error-border": "#fecdca",
          info: "#0086c9",
          "info-bg": "#f0f9ff",
          "info-border": "#b9e6fe",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(80, 87, 245, 0.15)",
        "glow-teal": "0 0 20px rgba(0, 178, 169, 0.15)",
        "glow-orange": "0 0 20px rgba(255, 92, 38, 0.2)",
        card: "0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)",
        "card-hover":
          "0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "card-xl":
          "0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)",
      },
      animation: {
        "fade-slide-up": "fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "pulse-ring": "pulseRing 2s infinite",
        shimmer: "shimmer 1.5s infinite",
        "count-reveal":
          "countReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        float: "float 4s ease-in-out infinite",
        "bar-grow": "barGrow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
=======
>>>>>>> 5511633 (Initial commit from Create Next App)
      },
    },
  },
  plugins: [],
};
export default config;
