/// <reference path="../typings/index.d.ts" />

const nodeopen = require('open');
const copy = require('copy-to-clipboard');
const {Rem, _} = require('./rem.js');

const rem = new Rem({
	google: {
		description: 'Search Google for "${query}"',
		f: (args) => {
			const q = _.join(_.slice(args._, 1), ' ');
			if (args.images) {
				nodeopen(`https://www.google.com/search?q=${q}&tbm=isch`);
			} else {
				nodeopen(`https://www.google.co.jp/search?q=${q}`);
			}
			rem.hide();
		}
	},
	lower: {
		description: 'Convert "${query}" to lower case',
		f: (args) => {
			const q = _.join(_.slice(args._, 1), ' ');
			copy(_.toLower(q));
			rem.hide();
		}
	},
	camel: {
		description: 'Convert "${query}" to camel case',
		f: (args) => {
			const q = _.join(_.slice(args._, 1), ' ');
			copy(_.camelCase(q));
			rem.hide();
		}
	},
	unhex: {
		description: 'Convert hexadecimal number',
		f: (args) => {
			const q = _.join(_.slice(args._, 1), ' ');
			copy(_.parseInt(q, 16));
			rem.hide();
		}
	}
});
