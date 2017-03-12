const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');
const { Component } = React;
const _ = require('lodash');

const defaultCommands = {
	mjmj: {
		description: 'Rem gets mjmj'
	},
	wnwn: {
		description: 'Rem gets wnwn'
	}
};

class Input extends Component {
	constructor(props) {
		super(props);

		this.onBlur = this.onBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		ipcRenderer.on('focus', this.onFocus.bind(this));
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	onFocus() {
		ReactDOM.findDOMNode(this).focus();
	}

	render() {
		const { props: { value } } = this;

		return (
			<input onBlur={this.onBlur} onChange={this.onChange} value={value} onKeyDown={this.onKeyDown} type='text' style={{
				width: '100%',
				boxSizing: 'border-box',
				fontSize: 24,
				outline: 'none'
			}} />
		);
	}

	/**
	 * @param {Event} e
	 */
	onChange(e) {
		const { props: { onChange } } = this;

		onChange(e.currentTarget.value);
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	onKeyDown(e) {
		const { props: { commands: [command], onChange, onChangeRemMode } } = this;
		const { keyCode, currentTarget: { value } } = e;

		if (keyCode !== 13 || !command) { return; }
		const { name } = command;

		if (name === value) {
			if (name === 'mjmj' || name === 'wnwn') {
				onChangeRemMode(name);
				onChange('');
			} else {
				command.f();
				onChange('');
				ReactDOM.findDOMNode(this).blur();
			}
		} else {
			onChange(name);
		}
	}

	onBlur() {
		ipcRenderer.sendSync('blur');
	}
}

class Commandarea extends Component {
	constructor(props) {
		super(props);

		this.keys = _.keys(defaultCommands);
		this.commands = defaultCommands;
		this.state = {
			value: ''
		};
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	render() {
		const delta = 10;
		const {
			state: { value },
			props: { onChangeRemMode },
			keys: _keys, commands: _commands
		} = this;
		const { length } = value;
		const commands = [];

		_.forEach(_keys, (key) => {
			let i = 0;
			const element = [];
			const matchedAll = _.every(value, (v) => {
				let matched = false;

				while (!matched && i < length + 1) {
					const k = key.charAt(i);

					if (k === v) {
						matched = true;
						element.push(<span style={{ textDecoration: 'underline' }}>{k}</span>);
					} else {
						element.push(k);
					}

					i += 1;
				}

				return matched;
			});

			if (matchedAll) {
				const { description, f } = _commands[key];

				commands.push({
					text: _.concat(element, key.substring(element.length)),
					name: key,
					description,
					f
				});
			}
		});

		return (
			<div style={{
				position: 'absolute',
				bottom: delta,
				left: delta,
				backgroundColor: 'rgb(30, 136, 229)',
				boxSizing: 'border-box',
				borderRadius: 4,
				width: `calc(100% - ${delta * 2}px)`
			}}>
				<div style={{
					fontFamily: 'Menlo, Monaco, "Courier New", monospace',
					padding: 4,
					color: 'white'
				}}>
					<div>
						{_.map(commands, ({ text }, i) => (
							<span style={{
								display: 'inline-block',
								marginRight: 4,
								fontSize: i === 0 ? 20 : 16
							}}>
								{text}
							</span>
						)
						)}
					</div>
					<div style={{
						fontSize: 14
					}}>
						{commands.length === 0 ? null : commands[0].description}
					</div>
				</div>
				<div style={{
					padding: 4
				}}>
					<Input value={value} onChange={this.onChangeValue} commands={commands} onChangeRemMode={onChangeRemMode} />
				</div>
			</div>
		);
	}

	/**
	 * @param {string} value
	 */
	onChangeValue(value) {
		this.setState({ value });
	}
}

module.exports = { Commandarea };