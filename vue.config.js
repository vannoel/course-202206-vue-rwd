const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/component.scss";`
      }
    }
  },
})
