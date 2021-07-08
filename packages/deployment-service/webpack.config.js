const slsw = require('serverless-webpack')
const { webpackConfigNode, PATHS } = require('@reapit/ts-scripts')
const CopyPlugin = require('copy-webpack-plugin')

console.log(slsw)

webpackConfigNode.entry = slsw.lib.entries
webpackConfigNode.optimization.minimize = slsw.lib.webpack.isLocal ? false : true

// new ResolveTSPathsToWebpackAlias({
//   tsconfig: PATHS.tsConfig,
// }),

webpackConfigNode.plugins.push(new CopyPlugin({ 
  patterns: [
    { from: 'config.json', to: PATHS.output },
    { from: 'public-keys.json', to: PATHS.output },
  ]
}))

module.exports = webpackConfigNode
