const Rem = require('../app/index');
const _ = require('lodash');
const open = require('open');

new Rem({
	google: {
		description: 'Search Google for "${query}"',
		f: (args, query) => {
			open(`https://www.google.co.jp/search?q=${query}`);
		},
		query: (args) => {
			const { _: [, ...tails] } = args;

			return _.join(tails, ' ');
		}
	}
});