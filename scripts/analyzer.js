const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { base } = require('./base')
const getPort = require('get-port')
const webpack = require('webpack')
const { merge } = require('./util')

;(async () => {
  const analyzerPort = await getPort({ port: 8000 })
  const analyzer = {
    mode: 'development',
    devtool: 'cheap-source-map',
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      })
    ]
  }

  const doAnalyze = async () => {
    webpack(merge(analyzer, base), (err) => {
      err && console.log(err)
    })
  }

  doAnalyze()
})()
