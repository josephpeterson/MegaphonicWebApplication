import React, { Component } from 'react';
import imgNoMusic from './no_music.png';
 
class TabEvents extends Component {
	render() {
		return (<div className="mt-3 contain-fluid text-center">
			<h3>No Events Booked</h3>
			<img className="m-5" src={imgNoMusic} height="128px" width="128px"/>
		</div>)
	}
}
export default TabEvents;