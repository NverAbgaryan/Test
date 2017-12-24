const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html'
})
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test:/\.vue$/, loader:'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }},
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|.mp4)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.((a*)png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name:'[name].[ext]',
            outputPath:'img/'
          }
        }]
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('css/style.css')]
}
