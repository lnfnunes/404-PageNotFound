module.exports = {
  entry: [
    './src/js/main.js',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ],
  },
  output: {
    path: __dirname + '/dist/js',
    filename: 'main.js',
  },
};
