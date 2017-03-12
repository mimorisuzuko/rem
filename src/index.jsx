const React = require('react');
const ReactDOM = require('react-dom');
const { Rem } = require('./components/rem');
const { Commandarea } = require('./components/commandarea');
const { Component } = React;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: 'mjmj'
		};
		this.onChangeRemMode = this.onChangeRemMode.bind(this);
	}

	render() {
		const { state: { mode } } = this;

		return (
			<div style={{
				position: 'relative'
			}}>
				<Rem mode={mode} />
				<Commandarea onChangeRemMode={this.onChangeRemMode} />
			</div>
		);
	}

	/**
	 * @param {string} mode
	 */
	onChangeRemMode(mode) {
		this.setState({ mode });
	}
}

ReactDOM.render(<App />, document.querySelector('main'));