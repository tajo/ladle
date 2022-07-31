module.exports = {
  content: ["./lib/app/src/styles/*.css"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--ladle-primary-50)",
          100: "var(--ladle-primary-100)",
          200: "var(--ladle-primary-200)",
          300: "var(--ladle-primary-300)",
          400: "var(--ladle-primary-400)",
          500: "var(--ladle-primary-500)",
          600: "var(--ladle-primary-600)",
          700: "var(--ladle-primary-700)",
          800: "var(--ladle-primary-800)",
          900: "var(--ladle-primary-900)",
        },
        accent: {
          50: "var(--ladle-accent-50)",
          100: "var(--ladle-accent-100)",
          200: "var(--ladle-accent-200)",
          300: "var(--ladle-accent-300)",
          400: "var(--ladle-accent-400)",
          500: "var(--ladle-accent-500)",
          600: "var(--ladle-accent-600)",
          700: "var(--ladle-accent-700)",
          800: "var(--ladle-accent-800)",
          900: "var(--ladle-accent-900)",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 100ms linear 1",
      },
    },
  },
};
