const open = require('open');
const Rem = require('../');

new Rem({
	google: {
		description: 'Search Google for ${querys[0]}',
		minQuerysLength: 1,
		exec: (querys) => {
			open(`https://www.google.co.jp/search?q=${querys[0]}`);
		}
	}
});