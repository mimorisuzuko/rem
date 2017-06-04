const open = require('open');
const Rem = require('../');

new Rem({
	google: {
		description: 'Search Google for ${querys[0]}',
		minQuerysLength: 1,
		exec: (querys, options) => {
			if (options.hasOwnProperty('images')) {
				open(`https://www.google.co.jp/search?q=${querys[0]}&tbm=isch`);
			} else {
				open(`https://www.google.co.jp/search?q=${querys[0]}`);
			}
		}
	}
});