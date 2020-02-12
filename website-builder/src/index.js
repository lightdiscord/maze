const mode = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

module.exports = {
  mode,
  entry: require.resolve("@maze/website"),
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-runtime", { absoluteRuntime: true }],
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new (require("html-webpack-plugin"))({
      template: require.resolve("@maze/website/src/index.html")
    })
  ]
};
