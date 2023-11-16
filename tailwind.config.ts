import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        custom: "0.875rem",
      },
      fontFamily: {
        calibri: ["Calibri", "sans"],
      },
      backgroundColor: {
        "custom-blue": "rgb(31, 41, 55)",
        darkRed: "#8b0000",
      },
    },
  },

  variants: {
    extend: {
      textColor: ["responsive", "hover", "focus", "group-hover"],
    },
  },

  plugins: [],
};

export default config;
