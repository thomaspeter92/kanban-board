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
      colors: {
        purple: {
          light: "#A8A4FF",
          dark: "#635FC7",
        },
        black: {
          dark: "#000112",
          medium: "#20212C",
          light: "#2B2C37",
        },
        gray: {
          dark: "#828FA3",
          medium: "#E4EBFA",
          light: "#F4F7FD",
        },
        red: {
          dark: "#EA5555",
          light: "#FF9898",
        },
      },
      fontSize: {
        headingXl: ["24px", { fontWeight: "700", lineHeight: "30px" }],
        headingL: ["18px", { fontWeight: "700", lineHeight: "23px" }],
        headingM: ["15px", { fontWeight: "700", lineHeight: "19px" }],
        headingS: [
          "12px",
          { fontWeight: "700", lineHeight: "15px", letterSpacing: "2.4px" },
        ],
        bodyL: ["13px", { fontWeight: "500", lineHeight: "23px" }],
        bodyM: ["12px", { fontWeight: "700", lineHeight: "15px" }],
      },
    },
  },
  plugins: [],
};
export default config;
