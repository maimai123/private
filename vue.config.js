const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: '8080',
    https: false, // 是否使用https协议
    hotOnly: true, // 是否开启热更新
    proxy: {
      '/api': {
        target: 'http://rmq.duoge.work'
      }
    }
  }
}
