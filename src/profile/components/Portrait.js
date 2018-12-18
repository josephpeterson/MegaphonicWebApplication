import React, { Component } from 'react';
import PhotoIcon from '../photo.png';

class Portrait extends Component {
	render() {
		const { src, Editable } = this.props;
		return (<div className='profilePortrait' style={{
			backgroundImage: "url(" + src + ")"
		}}>
			{Editable && (<div className="profilePictureChange">
				<img src={PhotoIcon} />
				<label>Change...</label>
			</div>)
			}
		</div>);
	}
}
export default Portrait;