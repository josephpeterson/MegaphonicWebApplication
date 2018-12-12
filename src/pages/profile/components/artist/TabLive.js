import React, { Component } from 'react';
import imgNoVideo from './no_video.png';

class TabLive extends Component {
	render() {
		return (<div className="mt-3 contain-fluid text-center">
			<h3>No Livestreams Uploaded</h3>
			<img className="m-5" src={imgNoVideo} height="128px" width="128px"/>
		</div>)
	}
}
export default TabLive;