const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');
const { Component } = React;

class Input extends Component {
	constructor(props) {
		super(props);

		this.onBlur = this.onBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		ipcRenderer.on('focus', this.onFocus.bind(this));
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	onFocus() {
		ReactDOM.findDOMNode(this).focus();
	}

	render() {
		return (
			<input onBlur={this.onBlur} onKeyDown={this.onKeyDown} type='text' style={{
				width: '100%',
				boxSizing: 'border-box',
				fontSize: 20
			}} />
		);
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	onKeyDown(e) {
		const { keyCode } = e;

		if (keyCode !== 13) { return; }
		const self = ReactDOM.findDOMNode(this);
		
		self.blur();
	}

	onBlur() {
		ipcRenderer.sendSync('blur');
	}
}

class Commandarea extends Component {
	render() {
		const delta = 10;

		return (
			<div style={{
				position: 'absolute',
				bottom: delta,
				left: delta,
				backgroundColor: 'gray',
				padding: delta,
				width: `calc(100% - ${delta * 2}px)`
			}}>
				<Input />
			</div>
		);
	}
}

module.exports = { Commandarea };