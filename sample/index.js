const Rem = require('../app/index');
const open = require('open');

new Rem({
	open: {
		description: 'Open ${typedURL}',
		f: () => open('http://example.com/')
	}
});