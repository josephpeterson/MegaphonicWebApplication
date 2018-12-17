import React, { Component } from 'react';

class EmptyTab extends Component {
	render() {
		return (<div className="mt-3 contain-fluid text-center">
		<h3>{this.props.children}</h3>
		<img className="m-5" src={this.props.src} height="128px" width="128px"/>
	</div>)
	}
}
export default EmptyTab;
