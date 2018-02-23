let {DefinePlugin} = require ("webpack")
let path           = require("path")

module.exports = {
  entry: {
    "main.js": [
      "babel-polyfill",
      "whatwg-fetch",
      "chat-client/main",
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules      : true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                    browsers: [
                        "ie >= 11",
                        "last 2 Edge versions",
                        "last 2 Firefox versions",
                        "last 2 Chrome versions",
                        "last 2 Safari versions",
                        "last 2 Opera versions",
                        "last 2 iOS versions",
                        "last 2 ChromeAndroid versions"
                    ]
                })
              ]
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [
                "transform-object-rest-spread"
              ],
              presets: [
                "env",
                "react"
              ]
            }
          }
        ]
      }
    ]
  },
  node: {
    net: 'empty',
  },
  plugins: [
    new DefinePlugin(
        Object.entries(process.env)
            .map(x => ({["process.env." + x[0]]: JSON.stringify(x[1])}))
            .reduce((x, y) => Object.assign(x, y), {}),
    ),
  ],
  output: {
    filename  : "[name]",
    path      : path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".css", ".js", ".jsx"],
    modules: ["src", "node_modules"]
  }
}