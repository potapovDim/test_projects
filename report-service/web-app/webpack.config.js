const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {ENV} = process.env

function productionBuildOutput() {
  const servicePath = path.resolve(__dirname, '../server/static')
  if(ENV === 'production') {
    return {
      path: servicePath,
      filename: "bundle.js"
    }
  } else {
    return {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js"
    }
  }
}

module.exports = {
  entry: "./src/index.js",
  output: productionBuildOutput(),
  devServer: {
    port: 8080,
    inline: true,
    liveReload: false,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}