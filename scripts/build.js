const webpack = require('webpack')
const { base } = require('./base')
const { merge } = require('./util')
const rimraf = require('rimraf')
const TerserPlugin = require('terser-webpack-plugin')
const os = require('os')

const build = {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        parallel: os.cpus().length - 1
      })
    ],
  }
}

const doBuild = async () => {
  rimraf.sync('build', ['rmdir'])
  webpack(merge(build, base), (err) => {
    err && console.log(err)
    process.exit()
  })
}

doBuild()
