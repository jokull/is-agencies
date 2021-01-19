module.exports = {
  purge: ["./src/**/*.svelte"],
  variants: {},
  theme: {
    extend: {
      colors: {
        sand: "#F8F6F1",
        darkcloud: "#233454",
        ribbon: "#0066F5",
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
