const React = require('react');
const ReactDOM = require('react-dom');
const minimist = require('minimist');
const _ = require('lodash');
const { ipcRenderer } = require('electron');
const { Component } = React;

_.templateSettings.interpolate = /\${([\s\S]+?)}/g;

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
		const { props: { commands: [command], args, onChange, onChangeRemMode } } = this;
		const { keyCode } = e;

		if (keyCode !== 13 || !command) { return; }
		const { name, query } = command;
		const { _: [head] } = args;

		if (name === head) {
			if (head === 'mjmj' || head === 'wnwn') {
				onChangeRemMode(head);
				onChange('');
			} else {
				ipcRenderer.send(`__${head}__`, { args, query });
				onChange('');
				ReactDOM.findDOMNode(this).blur();
			}
		} else {
			onChange(`${name} `);
		}
	}

	onBlur() {
		ipcRenderer.sendSync('blur');
	}
}

class Commandarea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			keys: _.keys(defaultCommands),
			commands: defaultCommands
		};
		this.onChangeValue = this.onChangeValue.bind(this);
		ipcRenderer.on('setup-user-commands', this.onSetupUserCommands.bind(this));
	}

	/**
	 * @param {Electron.IpcRendererEvent} e
	 * @param {Object} args
	 */
	onSetupUserCommands(e, args) {
		const { state: { commands: _commands } } = this;
		const commands = _.assign({}, _commands, args);

		this.setState({ commands, keys: _.keys(commands) });
	}

	render() {
		const delta = 10;
		const {
			state: { value, keys: _keys, commands: _commands },
			props: { onChangeRemMode }
		} = this;
		const values = _.split(value, ' ');
		const args = minimist(values);
		const [head] = values;
		const { length } = head;
		const commands = [];

		_.forEach(_keys, (key) => {
			let i = 0;
			const element = [];
			const matchedAll = _.every(head, (v) => {
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
				const { description, query } = _commands[key];

				commands.push({
					text: _.concat(element, key.substring(element.length)),
					name: key,
					description,
					query: query ? ipcRenderer.sendSync(`__${key}-query__`, args) : null
				});
			}
		});

		const [command] = commands;

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
						{command ? _.template(command.description)({ query: command.query }) : null}
					</div>
				</div>
				<div style={{
					padding: 4
				}}>
					<Input value={value} onChange={this.onChangeValue} commands={commands} args={args} onChangeRemMode={onChangeRemMode} />
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