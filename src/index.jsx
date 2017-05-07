const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');
const minimist = require('minimist');
const { ipcRenderer } = require('electron');
const { Component } = React;

class Textarea extends Component {
	constructor(props) {
		super(props);

		ipcRenderer.on('focus', this.onFocus.bind(this));
	}

	onFocus() {
		ReactDOM.findDOMNode(this).focus();
	}

	render() {
		const { props: { onBlur, onChange, onKeyDown, value } } = this;

		return (
			<input onBlur={onBlur} onChange={onChange} onKeyDown={onKeyDown} value={value} style={{
				display: 'block',
				boxSizing: 'border-box',
				width: '100%',
				fontSize: '2rem',
				outline: 'none',
				border: 'none',
				backgroundColor: 'transparent'
			}} />
		);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}
}

class App extends Component {
	constructor(props) {
		super(props);

		this.config = _.toPairs(ipcRenderer.sendSync('setup'));
		this.state = { value: '' };
		this.parsed = {};
		this.candidates = [];
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	/**
	 * @param {string} value
	 */
	parse(value) {
		const i = _.get(value.match(/\s/), ['index'], value.length);
		let splited = [value.substring(0, i)];
		const tail = value.substring(i);
		const matched = tail.match(/[^"\s]+|"(?:\\"|[^"])+"/g);

		if (matched) {
			splited = _.concat(splited, matched);
		} else if (tail !== '') {
			splited.push(tail);
		}

		return minimist(_.map(splited, (s) => {
			const { length } = s;

			return s.substring(s.charAt(0) === '"' ? 1 : 0, s.charAt(length - 1) === '"' ? length - 1 : length);
		}));
	}

	render() {
		const {
			config,
			state: { value }
		} = this;
		const parsed = this.parse(value);
		const { _: [command, ...querys] } = parsed;
		const { length } = command;
		const candidates = [];

		_.forEach(config, ([key, { description }]) => {
			let i = 0;
			const element = [];

			_.forEach(key, (k) => {
				let matched = false;

				for (let j = i; j < length; j += 1) {
					if (k === command.charAt(j)) {
						matched = true;
						i += 1;
						break;
					}
				}

				element.push(
					matched ? <span style={{ textDecoration: 'underline' }}>{k}</span> : k
				);
			});

			if (i === length) {
				candidates.push({
					text: key,
					description,
					element
				});
			}
		});

		const candidatesJSX = _.map(candidates, ({ element }, i) => {
			const style = { marginRight: 4 };

			if (i === 0) {
				style.fontSize = '1.4rem';
				style.fontWeight = 'bold';
			}

			return <span style={style}>{element}</span>;
		});

		this.parsed = parsed;
		this.candidates = candidates;

		return (
			<div>
				<div className='wnwn' style={{ position: 'relative' }}>
					<div style={{
						position: 'absolute',
						width: '90%',
						left: '5%',
						bottom: 20,
						backgroundColor: 'rgb(242, 242, 242)',
						borderRadius: 4,
						padding: '6px 12px'
					}}>
						{candidatesJSX}
						{candidates.length > 0 ? <div>{_.template(candidates[0].description)({ querys })}</div> : null}
						<Textarea onBlur={this.onBlur} onChange={this.onChange} onKeyDown={this.onKeyDown} value={value} />
					</div>
				</div>
			</div>
		);
	}

	onBlur() {
		ipcRenderer.send('blur');
	}

	/**
	 * @param {Event} e
	 */
	onChange(e) {
		this.setState({ value: e.currentTarget.value });
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	onKeyDown(e) {
		if (e.keyCode !== 13) { return; }
		const {
			candidates, parsed,
			state: { value }
		} = this;
		const { _: [command, ...querys] } = parsed;
		const selected = candidates[0];
		if (!selected) { return; }
		const { text } = selected;
		if (text === command) {
			delete parsed._;
			ipcRenderer.send('exec', {
				func: text,
				querys: querys,
				options: parsed
			});
		} else {
			const i = _.get(value.match(/\s/), ['index'], value.length);

			this.setState({
				value: `${text} ${value.slice(i)}`
			});
		}
	}
}

ReactDOM.render(<App />, document.querySelector('main'));