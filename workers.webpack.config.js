const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const cesiumSource = '../cesium/Source';
const thirdPartyWorkers = 'ThirdParty/Workers/';

var workerFiles = {
	'cesiumWorkerBootstrapper': path.resolve(cesiumSource, 'Workers/cesiumWorkerBootstrapper.js'),
	'transferTypedArrayTest': path.resolve(cesiumSource, 'Workers/transferTypedArrayTest.js')
};
fs.readdirSync(path.resolve(__dirname, cesiumSource, thirdPartyWorkers))
	.forEach(function (file) {
		workerFiles[path.basename(file, '.js')] = path.resolve(cesiumSource, thirdPartyWorkers, file);
	});

module.exports = {
	context: __dirname,
	entry: workerFiles,
	target: 'webworker',
	output: {
		filename: '[name].js',
		chunkFilename : '[name].js',
		path: path.resolve(__dirname, 'dist'),
		sourcePrefix: '' // Needed by Cesium for multiline strings
	},
	resolve: {
		alias: {
			Workers: path.resolve(__dirname, cesiumSource, 'Workers')
		}
	},
	// module: {
	// 	rules: [{
	// 		test: /\.js$/,
	// 		enforce: 'pre',
	// 		include: path.resolve(__dirname, cesiumSource),
	// 		use: [{
	// 			loader: 'webpack-strip-block',
	// 			options: {
	// 				start: '>>includeStart(\'debug\', pragmas.debug);',
	// 				end: '>>includeEnd(\'debug\')'
	// 			}
	// 		}]
	//     }]
	// },
	plugins: [
	    new webpack.IgnorePlugin(/(Assets|Widgets)/),
	    new webpack.optimize.UglifyJsPlugin()
  	],
	node: {
       fs: "empty"
    }
};