const path = require('path')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  output: {
    path: path.resolve(__dirname, '.webpack/main')
  },
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    fallback: {
      fs: false,
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer'),
      'util': require.resolve('util'),
      'assert': require.resolve('assert'),
      'http': require.resolve('stream-http'),
      'url': require.resolve('url'),
      'https': require.resolve('https-browserify'),
      'os': require.resolve('os-browserify'),
      'path': require.resolve('path-browserify')
    },
  },
};
