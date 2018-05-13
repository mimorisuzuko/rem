import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { ipcRenderer, remote } from 'electron';
import autobind from 'autobind-decorator';
import './index.scss';

const yargsParser = remote.require('yargs-parser');

class Textarea extends Component {
	constructor(props) {
		super(props);

		ipcRenderer.on('focus', this.onFocus);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	@autobind
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
				height: 40,
				lineHeight: '40px',
				fontSize: '2rem',
				outline: 'none',
				border: 'none',
				backgroundColor: 'transparent'
			}}
			/>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);

		this.config = _.toPairs(ipcRenderer.sendSync('setup'));
		this.state = { value: '', mode: 'wnwn' };
		this.parsed = {};
		this.candidates = [];

		ipcRenderer.on('mode', this.onMode);
	}

	/**
	 * @param {Electron.IpcRendererEvent} e
	 * @param {{mode: string}} args
	 */
	@autobind
	onMode(e, args) {
		this.setState({ mode: args.mode });
	}

	@autobind
	onBlur() {
		ipcRenderer.send('blur');
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onChange(e) {
		this.setState({ value: e.currentTarget.value });
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	@autobind
	onKeyDown(e) {
		if (e.keyCode !== 13) { return; }
		const {
			candidates, parsed,
			state: { value }
		} = this;
		const { _: [command, ...querys] } = parsed;
		const selected = candidates[0];
		if (!selected) { return; }
		const { text, minQuerysLength } = selected;

		if (querys.length >= minQuerysLength) {
			const options = {};

			_.forEach(_.toPairs(parsed), ([k, v]) => {
				if (k === '_') { return; }

				options[k] = v;
			});

			ipcRenderer.send('exec', {
				func: text,
				querys: querys,
				options
			});
			this.setState({ value: '' });
		} else if (text !== command) {
			const i = _.get(value.match(/\s/), ['index'], value.length);

			this.setState({
				value: `${text} ${value.slice(i)}`
			});
		}
	}

	render() {
		const {
			config,
			state: { value, mode }
		} = this;
		const parsed = yargsParser(_.trim(value));
		const { _: [command, ...querys] } = parsed;
		const { length } = command || '';
		const candidates = [];

		_.forEach(config, ([key, { description, minQuerysLength }]) => {
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
					element,
					minQuerysLength
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
				<div className={mode} style={{ position: 'relative' }}>
					<div style={{
						position: 'absolute',
						width: '90%',
						left: '5%',
						bottom: 20,
						backgroundColor: 'rgb(242, 242, 242)',
						borderRadius: 4,
						padding: '6px 12px'
					}}
					>
						{candidatesJSX}
						{candidates.length > 0 ? (
							<div style={{ height: 24, lineHeight: '24px' }}>
								{_.template(candidates[0].description)({ querys })}
							</div>
						) : null}
						<Textarea onBlur={this.onBlur} onChange={this.onChange} onKeyDown={this.onKeyDown} value={value} />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('main'));
