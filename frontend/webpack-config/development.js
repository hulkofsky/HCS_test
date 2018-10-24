const webpack = require(`webpack`)
const merge = require(`webpack-merge`)
const {HotModuleReplacementPlugin} = webpack
const commonConfig = require(`./common`)
const AppConfig = require(`./index`)

// plugins
const hotModuleReplacementPlugin = new HotModuleReplacementPlugin()

// development config
module.exports = merge(commonConfig, {

  mode: `development`,

  devtool: `cheap-module-source-map`,

  devServer: {
    compress: true,
    contentBase: AppConfig.PROD_DIR,
    publicPath: `/`,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: AppConfig.SRC_DIR,
        use: [
          {loader: `style-loader`},
          {
            loader: `css-loader`,
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: `[name]__[local]--[hash:base64:7]`
            }
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: true,
              plugins: () => [
                require(`autoprefixer`)(AppConfig.AUTOPREFIXER)
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [hotModuleReplacementPlugin]

})