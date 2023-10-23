/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#7945ff",
        secondaryBg: "#5c2dd5",
        p1Bg: "#fd6687",
        p2Bg: "#ffce67",
      },
      boxShadow: {
        tokenShadow: "0px 4px 0px 0px rgb(0, 0, 0);",
        tokenInnerShadow: "0px 8px 0px 0px rgba(0, 0, 0, 0.5) inset;",
        boardShadow: "0px 12px 0px 0px rgb(0, 0, 0);",
        boardInnerShadow: "0px 14px 0px 0px rgb(0, 0, 0) inset;",
        boardInnerShadowMd: "0px 10px 0px 0px rgb(0, 0, 0) inset;",
        boardInnerShadowLg: "0px 6px 0px 0px rgb(0, 0, 0) inset;",
        overlayShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
      },
      gridTemplateAreas: {
        layout: ['a b', 'game game'],
        lgLayout: ['a game b']
      },
      gridTemplateColumns: {
        boardLayout: '1fr 600px 1fr'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@savvywombat/tailwindcss-grid-areas')
  ],
};
