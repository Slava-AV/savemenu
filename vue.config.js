module.exports = {
  lintOnSave: false,

  pwa: {
    name: 'SaveMenu'
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  devServer: {
    hot: true
  },

  configureWebpack: {
    devtool: 'source-map'
  }
};



