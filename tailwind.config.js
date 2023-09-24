module.exports = {
  theme: {
    extend: {
      width: {
        800: "800px",
      },
      height: {
        800: "800px",
      },
    },
  },
  presets: [require("@vercel/examples-ui/tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vercel/examples-ui/**/*.js",
  ],
};
