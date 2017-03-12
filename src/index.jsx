const React = require('react');
const ReactDOM = require('react-dom');
const { Rem } = require('./components/rem');
const { Component } = React;

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Rem mode='mjmj' />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('main'));