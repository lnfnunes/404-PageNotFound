module.exports = {
  entry: [
    './src/js/main.js',
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist/js',
  },
};
