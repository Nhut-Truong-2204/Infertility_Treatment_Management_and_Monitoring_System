const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class", // 🟢 CẦN THÊM DÒNG NÀY
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "-100%" },
        },
        swim: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "tail-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        swim: "swim 4s ease-in-out infinite",
        "tail-wiggle": "tail-wiggle 0.3s ease-in-out infinite",
        gradient: "gradient 8s linear infinite",
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-gradient-radial": {
          backgroundImage: "radial-gradient(var(--tw-gradient-stops))",
        },
      });
    }),
  ],
};
