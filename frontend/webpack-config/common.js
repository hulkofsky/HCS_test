const webpack = require(`webpack`)
const {DefinePlugin} = webpack
const HTMLPlugin = require(`html-webpack-plugin`)
const AppConfig = require(`./index`)

// plugins
const htmlPlugin = new HTMLPlugin({
  filename: `index.html`,
  template: `${AppConfig.SRC_DIR}/index.html`,
  title: AppConfig.APP_TITLE,
  minify: {collapseWhitespace: true},
  inject: true
})

const definePlugin = new DefinePlugin({
  devMod: JSON.stringify(`development`)
})

// common config
module.exports = {

  entry: `${AppConfig.SRC_DIR}/index.js`,
  output: {
    path: `${AppConfig.PROD_DIR}`,
    filename: `js/[name].js`,
    publicPath: `/`
  },

  resolve: {
    extensions: [`.js`, `.jsx`, `.json`, `.css`]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: AppConfig.SRC_DIR,
        use: {
          loader: `babel-loader`
        }
      }
    ]
  },

  plugins: [htmlPlugin, definePlugin],

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: `vendors`,
          chunks: `all`,
          test: /node_modules/,
          priority: 20
        },
        common: {
          name: `common`,
          minChunks: 2,
          chunks: `async`,
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }

}