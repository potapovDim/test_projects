const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const MinifyPlugin = require("babel-minify-webpack-plugin")

const {ENV} = process.env

function productionBuildOutput() {
  const servicePath = path.resolve(__dirname, '../server/static')

  if(ENV === 'production') {
    return {
      entry: {
        index: './src/index.js',
      },
      output: {
        filename: 'bundle.[name].js',
        path: servicePath,
      }
    }
  } else {
    return {
      entry: {
        index: './src/index.js',
        // redux_store: './src/reducers/index.js',
        // components: './src/components/index.js'
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devtool: 'source-map',
    }
  }
}

module.exports = {

  ...productionBuildOutput(),

  devServer: {
    port: 8080,
    inline: true,
    liveReload: false,
    historyApiFallback: true,
    proxy: {
      '/': 'http://127.0.0.1:3000'
    }
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
    }),
    // new MinifyPlugin()
  ]
}