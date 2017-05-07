const React = require('react');
const ReactDOM = require('react-dom');
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
		const { props: { onBlur, onChange } } = this;

		return (
			<input onBlur={onBlur} onChange={onChange} style={{
				position: 'absolute',
				display: 'block',
				boxSizing: 'border-box',
				width: '90%',
				left: '5%',
				bottom: 20,
				fontSize: '2rem',
				resize: 'none',
				backgroundColor: 'rgb(242, 242, 242)',
				outline: 'none',
				border: 'none',
				padding: 12,
				borderRadius: 4
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

		this.state = { value: '' };
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return (
			<div>
				<div className='wnwn' style={{ position: 'relative' }}>
					<Textarea onBlur={this.onBlur} onChange={this.onChange} />
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
}

ReactDOM.render(<App />, document.querySelector('main'));