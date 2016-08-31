/// <reference path="../typings/index.d.ts" />

const electron = require('electron');
const _ = require('lodash');
const minimist = require('minimist');
const fs = require('fs');
const {ipcRenderer} = electron;

_.templateSettings.interpolate = /\${([\s\S]+?)}/g;

/**
 * @param {String} tagName
 * @param {String} innerText
 * @param {String} pattern
 * @returns {Element}
 */
const highlightedElement = (tagName, innerText, pattern) => {
	const element = document.createElement(tagName);
	let i = 0;
	_.forEach(innerText, (character) => {
		if (character === pattern[i]) {
			const span = document.createElement('span');
			span.classList.add('highlight');
			span.innerText = character;
			element.appendChild(span);
			i += 1;
		} else {
			element.appendChild(document.createTextNode(character));
		}
	});
	return i === pattern.length ? element : null;
};

class Rem {
	/**
	 * @param {Object} commands
	 */
	constructor(commands) {
		const element = document.createElement('div');
		document.body.appendChild(element);
		element.classList.add('rmt-field');

		const rmts = _.map(['wnwn', 'mjmj'], (a, i) => {
			const div = document.createElement('div');
			div.classList.add('rmt', a);
			element.appendChild(div);
			return div;
		});

		commands.wnwn = {
			description: 'WNWN Mode',
			f: (args) => {
				this.status = Rem.STATUS.WNWN;
				this.hide();
			}
		};

		commands.mjmj = {
			description: 'MJMJ Mode',
			f: (args) => {
				this.status = Rem.STATUS.MJMJ;
				this.hide();
			}
		};

		this.element = element;
		this.commands = commands;
		this.rmts = rmts;
		this.ballon = new Ballon(this);
		this.status = Rem.STATUS.WNWN;

		this.ballon.input.focus();
		this.ballon.updateChoices();
	}

	hide() {
		ipcRenderer.sendSync('hide', {});
	}

	set status(status) {
		this._status = status;
		_.forEach(this.rmts, (a, i) => {
			a.style.display = i === this.status ? '' : 'none';
		});
	}

	get status() {
		return this._status;
	}

	static get STATUS() {
		return {
			WNWN: 0,
			MJMJ: 1
		};
	}
}

class Ballon {
	/**
	 * @param {Rem} rem
	 */
	constructor(rem) {
		const element = document.createElement('div');
		rem.element.appendChild(element);
		element.classList.add('ballon');
		const choicesField = document.createElement('div');
		choicesField.classList.add('ballon-choices-field');
		const choices = document.createElement('div');
		choices.classList.add('ballon-choices');
		const description = document.createElement('div');
		description.classList.add('ballon-description');
		_.forEach([choices, description], (a) => choicesField.appendChild(a));
		const inputField = document.createElement('div');
		inputField.classList.add('ballon-input-field');
		const input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('keydown', this.keydown.bind(this));
		input.addEventListener('keyup', this.updateChoices.bind(this));
		inputField.appendChild(input);
		_.forEach([choicesField, inputField], (a) => element.appendChild(a));

		this.element = element;
		this.input = input;
		this.choices = choices;
		this.description = description;
		this.rem = rem;
	}

	keydown() {
		const keyfunc = this.keydownfuncs[`kc${event.keyCode}`];
		if (!keyfunc) { return; }
		keyfunc();
	}

	autocomplete() {
		const child = this.choices.firstChild;
		if (!child) { return; }
		const tail = _.trim(_.join(_.slice(_.split(this.value, ' '), 1), ' '));
		this.value = `${child.innerText} ${tail}`;
		this.caret = this.value.length + 1;
	}

	updateChoices() {
		this.choices.innerText = '';
		this.description.innerText = '';
		const {args} = this;
		const head = args._[0];
		const tail = _.join(_.slice(args._, 1), ' ');
		_.forEach(_.keys(this.rem.commands).sort((a) => a[0] == head[0] ? 0 : 1), (k) => {
			const {description} = this.rem.commands[k];
			const span = highlightedElement('span', k, head);
			if (!span) { return; }
			span.dataset.description = _.template(description)({ query: tail });
			span.classList.add('ballon-choice');
			this.choices.appendChild(span);
		});
		const child = this.choices.firstChild;
		if (!child) { return; }
		this.description.innerText = child.dataset.description;
	}

	get keydownfuncs() {
		return {
			kc9: () => {
				event.preventDefault();
				this.autocomplete();
			},
			kc13: () => {
				const {args} = this;
				const command = this.rem.commands[args._[0]];
				if (command) {
					this.value = '';
					command.f(args);
				} else {
					this.autocomplete();
				}
			}
		};
	}

	get args() {
		const v = _.split(this.value, ' ');
		const args = minimist(v);
		return args;
	}

	get value() {
		return this.input.value;
	}

	set value(value) {
		this.input.value = value;
	}

	set caret(caret) {
		this.input.setSelectionRange(caret, caret);
	}
}

module.exports = { Rem, _ };