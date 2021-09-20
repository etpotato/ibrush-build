import { StatsWriterPlugin } from 'webpack-stats-plugin';
let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

export default {
  mode: mode,
  entry: {
    main: './src/js/main.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new StatsWriterPlugin({
      stats: {
        all: true,
        assets: true,
      },
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  externals: {
    jquery: 'jQuery',
  },
};
