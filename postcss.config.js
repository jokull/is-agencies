const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const production = mode === "production";

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss"),
    production &&
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
  ].filter(Boolean),
};
