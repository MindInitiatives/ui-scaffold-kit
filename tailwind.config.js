/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem", // 👈 smaller padding for mobile
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        roboto: ["var(--font-roboto)"],
      },
      screens: {
        xs: "298px", // 👈 extra small devices
        mini: "400px",
        sm: "640px",
        md: "768px",
        ml: "896px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  }
};
