# Rem

Rem supports user work, like a maid.

## Who is Rem?

[She](http://re-zero-anime.jp/character.html?c=6) is a twin maid younger sister.

## Example

Search Google with Rem.

![demo](demo.gif)

from `dst/index.js`

* `google`: Search Google. if `--images`, search Google Images.
* `lower`: to lower case
* `camel`: to camel case
* `unhex`: hexadecimal to decimal

```javascript
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
```

## Usage

Requirements: Electron v1.3.1

```
git clone https://github.com/mimorisuzuko/rem.git
cd rem
npm i
npm start
```

## API

### `new Rem({Commands})`

Commands has multiple keys as `Command` name.

#### `Command`

* `description`: the description of command
* `f`: When typed command, the function that has a argument parsed by `minimist` is executed.

### `rem.hide()`

Hide Electron window.