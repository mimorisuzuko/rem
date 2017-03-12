const React = require('react');
const { Component } = React;

class Rem extends Component {
	render() {
		const { props: { mode } } = this;

		return (
			<div className={mode} />
		);
	}
}

module.exports = { Rem };