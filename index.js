const chalk = require('chalk')

const PLUGIN_NAME = 'loaderCountWebpackPlugin'

class LoderCountWebpackPlugin {
  constructor() {
    this.cache = Object.create(null)
  }
  // Define the `apply` method
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.compilation.tap(
      'PLUGIN_NAME',
      (compilation) => {
        compilation.hooks.buildModule.tap('PLUGIN_NAME', (module) => {
          const { loaders, resource } = module
          if (loaders && loaders.length) {
            for (const loader of loaders) {
              const match = loader.loader.match(/node\_modules\/([a-zA-Z\-\_]+)\//)
              const loaderName = match && match[1] ? match[1] : loader.loader
              const sourceIsInNodeModules = /node_modules/.test(resource)
              if (!this.cache[loaderName]) {
                this.cache[loaderName] = {
                  count: 0,
                  inNodeModules: []
                }
              }

              this.cache[loaderName].count++
              sourceIsInNodeModules && this.cache[loaderName].inNodeModules.push(resource)
            }
          }
        })
      }
    )

    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      Object.keys(this.cache).forEach(key => {
        const { count } = this.cache[key]
        console.log(chalk.green(`loader: ${key} has processed ${count} ${count > 1 ? 'files' : 'file'}`))
        const fileLength = this.cache[key].inNodeModules.length
        if (fileLength) {
          console.log(chalk.yellow(`And ${fileLength} ${fileLength > 1 ? 'files are' : 'file is' } in node_modules`))
          this.cache[key].inNodeModules.forEach(file => {
            console.log(chalk.magenta(`==> ${file}`))
          })
        }
      })
    })
  }
}

module.exports = LoderCountWebpackPlugin