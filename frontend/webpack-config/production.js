const miniCSSExtractPlugin = require(`mini-css-extract-plugin`)
const merge = require(`webpack-merge`)
const commonConfig = require(`./common`)
const AppConfig = require(`./index`)

// plugins
const CSSExtractPlugin = new miniCSSExtractPlugin({
  filename: `css/[name].css`
})

// production config
module.exports = merge(commonConfig, {

  mode: `production`,

  module: {
    rules: [
      {
        test: /\.css$/,
        include: AppConfig.SRC_DIR,
        use: [
          {
            loader: miniCSSExtractPlugin.loader,
            options: {
              publicPath: `../`
            }
          },
          {
            loader: `css-loader`,
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: `[name]__[local]--[hash:base64:7]`
            }
          },
          {
            loader: `postcss-loader`,
            options: {
              plugins: () => [
                require(`autoprefixer`)(AppConfig.AUTOPREFIXER),
                require(`postcss-csso`)
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [CSSExtractPlugin]

})