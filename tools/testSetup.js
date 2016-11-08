/* eslint-disable no-var */

process.env.NODE_ENV = 'test';

// register babel so it will transpile
require('babel-register')();

// Disable webpack-specific features for tests since Mocha doesnt know what to do with them
var noLoader = function() { return null; };
require.extensions['.css'] = noLoader;
require.extensions['.png'] = noLoader;
require.extensions['.jpg'] = noLoader;

// configure JSDOM and set global vars to simulate browser env.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent: 'node.js'
};

documentRef = document; //eslint-disable-line no-undef
