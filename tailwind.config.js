const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.552rem",
      "7xl": "4.052rem",
      title: "10rem",
      large: "1.125rem",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        thisGray: "#2B2B2B",
        thisWhite: "#f1f1f1",
        thisSlate: "#4d4d4d",
      },
      spacing: {
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
      },
      translate: {
        "40%": "40%",
        "30%": "30%",
      },
    },
    fontFamily: {
      DELIRIUM: ["DELIRIUM"],
      Hikou: ["Hikou"],
      keifont: ["keifont"],
      OriginBold: ["Origin-Sans-Bold"],
      Origin: ["Origin-Sans"],
      OriginLight: ["Origin-Sans-Light"],
      Vancouver: ["Vancouver"],
    },
    letterSpacing: {
      title_home: "1.5rem",
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.3xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
