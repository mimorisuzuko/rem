const React = require('react');
const ReactDOM = require('react-dom');
const { Rem } = require('./components/rem');
const { Commandarea } = require('./components/commandarea');
const { Component } = React;

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				position: 'relative'
			}}>
				<Rem mode='mjmj' />
				<Commandarea />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('main'));