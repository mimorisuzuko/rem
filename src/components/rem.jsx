const React = require('react');
const { Component } = React;

class Rem extends Component {
	render() {
		const { props: { mode } } = this;
		const { src } = Rem.MODEL[mode];

		return (
			<div className={mode} />
		);
	}

	static get MODEL() {
		return {
			mjmj: {
				src: '../../images/mjmj.png'
			}
		};
	}
}

module.exports = { Rem };