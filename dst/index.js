/// <reference path="../typings/index.d.ts" />

const _ = require('lodash');

class Ballon {
	/**
	 * @param {Rem} rem
	 */
	constructor(rem) {
		const element = document.createElement('div');
		element.classList.add('ballon');
		element.innerText = 'はい、スバルくんのレムです。';
		_.forEach([
			{ jp: 'わなわな', status: Rem.STATUS.WNWN },
			{ jp: 'もじもじ', status: Rem.STATUS.MJMJ }
		], (data, i) => {
			const a = document.createElement('a');
			a.href = '#';
			a.innerText = data.jp;
			a.dataset.status = data.status;
			a.addEventListener('click', this.choice.bind(this));
			element.appendChild(a);
		});
		rem.element.appendChild(element);

		this.rem = rem;
		this.element = element;

		this.show(false);
	}

	/**
	 * @param {Boolean} bool
	 */
	show(bool = true) {
		this.element.style.display = bool ? '' : 'none';
	}

	/**
	 * @returns {Boolean}
	 */
	isShwon() {
		return this.element.style.display !== 'none';
	}

	choice() {
		this.rem.status = parseInt(event.target.dataset.status, 10);
		this.rem.index = 0;
		[this.rem.wnwnField, this.rem.mjmjField].forEach((a, i) => a.style.display = this.rem.status === i ? '' : 'none');
		this.show(false);
	}
}

class Rem {
	constructor() {
		const element = document.createElement('div');
		element.classList.add('rmt-field');
		element.addEventListener('click', this.click.bind(this));
		document.body.appendChild(element);

		const wnwnField = document.createElement('div');
		wnwnField.classList.add('wnwn-field');
		const mjmjField = document.createElement('div');
		mjmjField.classList.add('mjmj-field');
		_.forEach([wnwnField, mjmjField], (a) => element.appendChild(a));

		this.element = element;
		this.wnwnField = wnwnField;
		this.mjmjField = mjmjField;
		this.ballon = new Ballon(this);
		this.interval = 1000 / 15;
		this.index = 0;
		this.data = [
			{
				imgs: _.map(Array(13), (a, i) => {
					const img = document.createElement('img');
					img.src = `../images/wnwn/${`0${i}`.slice(-2)}.png`;
					img.style.width = '100%';
					img.style.display = 'none';
					wnwnField.appendChild(img);
					return img;
				})
			},
			{
				imgs: _.map(Array(9), (a, i) => {
					const img = document.createElement('img');
					img.src = `../images/mjmj/${`0${i}`.slice(-2)}.png`;
					img.style.width = '100%';
					img.style.display = 'none';
					mjmjField.appendChild(img);
					return img;
				})
			}
		];
		this.status = Rem.STATUS.WNWN;

		this.draw();
	}

	draw() {
		const remu = this.data[this.status];
		_.forEach(remu.imgs, (a, i) => a.style.display = i === this.index ? 'block' : 'none');
		this.index += 1;
		if (this.index === remu.imgs.length - 1) { this.index = 0; }
		setTimeout(this.draw.bind(this), this.interval);
	}

	click() {
		if (this.ballon.element.contains(event.target)) { return; }
		this.ballon.show(!this.ballon.isShwon());
	}

	static get STATUS() {
		return {
			WNWN: 0,
			MJMJ: 1
		};
	}
}

const rem = new Rem();