const path = require(`path`)

module.exports = Object.freeze({
  APP_TITLE: `HCS Test`, // title in index.html (html-webpack-plugin)
  SRC_DIR: path.resolve(__dirname, `../source`), // directory name for development
  PROD_DIR: path.resolve(__dirname, `../build`), // directory name for production
  AUTOPREFIXER: {
    browsers: [`last 2 versions`, `iOS >= 9`],
    grid: true
  } // config for autoprefixer
})