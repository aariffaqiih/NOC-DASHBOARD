/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#fff",
      card: "#1C1C39",
      dark2: "#060612",
      chart: "#1C1C39cc",
    },
    screens: {
      off: "0px",
      forbidden: "978px",
      md: "1108px",
      "md-dashboard": "1157px",
      lg: "1206px",
      "lg-rspnsv-topcard": "1226px",
      "xl-rspnsv-topcard": "1300px",
      xl: "1307px",
    },
    extend: {},
  },
  plugins: [],
};
