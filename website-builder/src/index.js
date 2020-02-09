const mode = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

module.exports = {
  mode,
  entry: require.resolve("@maze/website"),
  plugins: [
    new (require("html-webpack-plugin"))({
      template: require.resolve("@maze/website/src/index.html")
    })
  ]
};
