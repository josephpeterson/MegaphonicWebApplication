import React, { Component } from 'react';
import imgNoMusic from './no_music.png';

class TabMusic extends Component {
	render() {
		return (<div className="mt-3 contain-fluid card">
		<div className="card-body">
			<h3>No Music Uploaded</h3>
			<img className="m-5" src={imgNoMusic} height="128px" width="128px"/>
		</div>
		</div>)
	}
}
export default TabMusic;