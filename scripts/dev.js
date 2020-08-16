const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const getPort = require('get-port')
const { base } = require('./base')
const { merge } = require('./util')

let port = process.env.PORT || 3000

const dev = {
  mode: 'development',
  devtool: 'cheap-source-map'
}

const compiler = webpack(merge(dev, base))
const open = async () => {
  port = await getPort({port})
  const server = new WebpackDevServer(compiler, {
    host: '127.0.0.1',
    // open: true,
    hot: true
  }).listen(port, (err) => {
    if(err) {
      server.close()
      process.exit(1)
    }
    console.log('the current dev server start at:', `127.0.0.1:${port}`)
  })
  ;['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => {
      server.close();
      process.exit();
    });
  });
}

open()

