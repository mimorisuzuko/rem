const open = require('open');

module.exports = {
	google: {
		description: 'Search Google for ${querys[0]}',
		exec: (querys) => {
			open(`https://www.google.co.jp/search?q=${querys[0]}`);
		}
	}
};