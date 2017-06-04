# Rem

Rem supports users work, like a maid.

![](ss.gif)

## Usage

### new Rem(config: Object)

If the input is `google レム --images`, it is parsed by [`yargs-parser`](https://github.com/yargs/yargs-parser) and `config.google.exec` is executed  with `querys = ['レム']` and `options = { images: true }`.

e.g.) [index.js](sample)

```javascript
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
```
