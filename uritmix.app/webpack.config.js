const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: { import: "./src/Index.tsx" },
    vendor: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "temp_cache"),
  },
  devtool: "source-map",
  resolve: {
    /*alias: {
      "@component/*": path.resolve(__dirname, "./")
    },*/
    alias: {
      process: "process/browser",
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
      { test: /\.css$/, use: ["thread-loader", "style-loader", "css-loader"] },
      { test: /\.ttf$/, use: ["thread-loader", "file-loader"] },
      { test: /\.(svg|png)$/, use: { loader: "url-loader" } },
    ],
  },
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      "/api/": "http://localhost:5030",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_API_URL": JSON.stringify(process.env.REACT_API_URL),
      "process.env.REACT_BUILD_VERSION": JSON.stringify(
        process.env.REACT_BUILD_VERSION
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/public", "index.html"),
      favicon: path.resolve(__dirname, "./src/public", "favicon.ico"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
