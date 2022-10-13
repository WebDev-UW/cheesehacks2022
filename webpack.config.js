const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//const openCPU = require("./src/resources/opencpu-0.4.js");
// Include .env variables and expose to React files
// Code lightly altered from https://stackoverflow.com/a/63021138/4459036
const webpack = require("webpack");
const dotenv = require("dotenv");
const { HotModuleReplacementPlugin, optimize } = require("webpack");
const env = dotenv.config().parsed;
const envPlugin = new webpack.EnvironmentPlugin({ ...env });
const devMode = process.env.NODE_ENV !== "production";
console.log(`Building in ${devMode ? "development mode" : "production mode"}.`);

module.exports = {
  stats: 'minimal',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  mode: devMode ? "development" : "production",
  entry: devMode ? ["./src/index.js", 'webpack-hot-middleware/client'] : "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  /*devtool: "source-map",*/
  devServer: {
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /^(?!.*?\.module).*\.s?css$/, // matches .css and .scss but not .module.css and .module.scss
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: devMode ? [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    envPlugin,
    new HotModuleReplacementPlugin()
  ] : [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    envPlugin
  ]
};
