module.exports = {
    mode: "development",
    entry: {
      "prac3-1": "./src/prac3-1.js"
    },
    output: {
        filename: '[name].js'
    },
    devServer: {
        static: {
            directory: __dirname
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
    performance: {
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000
    },
    module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.glsl$/,
        use: {
          loader: 'webpack-glsl-loader'
        }
      }
    ]
  }
};