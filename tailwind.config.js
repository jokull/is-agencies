module.exports = {
  purge: ["./src/**/*.svelte", "./src/*.html"],
  variants: {},
  theme: {
    extend: {
      fontFamily: {
        sans: '"IBM Plex Sans", ui-sans-serif',
        serif: '"IBM Plex Serif", ui-serif',
        mono: '"IBM Plex Mono", monospace',
      },
      colors: {
        sand: "#F8F6F1",
        darkcloud: "#233454",
        ribbon: "#0066F5",
        dust: "#DAD8D5",
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
