/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Editorial New'", "Georgia", "serif"],
        sans: ["'Neue Montreal'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        g: {
          white: "#ffffff",
          off: "#f8f8f6",
          light: "#efefed",
          mid: "#aaaaaa",
          dim: "#666666",
          dark: "#1a1a1a",
          black: "#0a0a0a",
          accent: "#111111",
          // Teal — Icicle palette (richer, not dull)
          ice: "#3a9e9e",
          "ice-light": "#c0e0e0",
          "ice-dim": "#266e6e",
        },
      },
      transitionTimingFunction: {
        gallery: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
}
