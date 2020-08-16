const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

exports.base = {
  entry: {
    home: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": "src/",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader", "cache-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "thread-loader", 
          {
            loader: "babel-loader",
            options: {
              presets: ["@vue/babel-preset-app"]
            },
          },
          {
            loader: 'cache-loader'
          }
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "static/images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
      minSize: 30000, // 最小尺寸，30000
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 10, // 最大异步请求数， 默认5
      maxInitialRequests: 6, // 最大初始化请求书，默认3
      automaticNameDelimiter: '~', // 打包分隔符
      cacheGroups: {
        vendor: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是async)
          test: /vue|moment|lodash/, // 正则规则验证，如果符合就提取 chunk
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5, // 最大异步请求数， 默认1
          maxInitialRequests: 3, // 最大初始化请求书，默认1
          reuseExistingChunk: true // 可设置是否重用该chunk
        }
      }
    }
  }
};
