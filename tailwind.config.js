/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    screens: {
      "xs-mobile": "360px", // => $media min(min-width: 360px) { ... }
      xs: "576px",
      md: "768px",
      lg: "992px",
      "max-xs-mobile": { raw: "(max-width: 359px)" },
      "max-xs": { raw: "(max-width: 576px)" },
      "xsm-xs": { raw: "(min-width: 360px) and (max-width: 576px)" },
      "xs-md": { raw: "(min-width: 577px) and (max-width: 768px)" },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat, sans-serif"],
      },
    },
  },
  plugins: [],
};
