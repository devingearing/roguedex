const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const createConfig = (browser, manifestFile) => {
  const outputPath = path.resolve(__dirname, 'dist', browser);

  return {
    entry: {
      background: './src/background.js',
      content: './src/content/content.js',
      inject: './src/inject.js'
    },
    output: {
      path: outputPath,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              pure_funcs: ['console.info', 'console.log']
            },
          },
          extractComments: false, // Prevents the creation of LICENSE.txt files
        })
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: `src/${manifestFile}`, to: 'manifest.json' },
          { from: 'src/options', to: 'options' },
          { from: 'src/styles.css', to: '' },
          { from: 'src/RogueDex.png', to: '' },
          { from: 'src/images', to: 'images' },
          { from: 'src/fonts', to: 'fonts' },
          { from: 'src/content', to: 'content' },
          { from: 'src/libs', to: 'libs' },
          { from: 'src/images', to: 'images' }
        ]
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, 'dist'),
        filename: `${browser}.zip`
      })
    ],
    performance: {
      hints: false // Disables the size limit warnings
    },
    mode: 'production'
  };
};

module.exports = [
  createConfig('chrome', 'manifest.json'),
  createConfig('firefox', 'manifest_firefox.json')
];
