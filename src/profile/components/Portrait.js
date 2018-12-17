import React, { Component } from 'react';
import PhotoIcon from '../photo.png';

class Portrait extends Component {
	render() {
		var src = this.props.ProfileUser.ProfilePicture;

		var editable;

		if(this.props.ProfileUser.AccountId == this.props.MegaUser.AccountId)
		{
			editable = (<div className="profilePictureChange">
				<img src={PhotoIcon} />
				<label>Change...</label>
			</div>);
		}

		if (!src)
			src = "/img/profile_default.jpg";
		return (<div className='profilePortrait' style={{
			backgroundImage: "url(" + src + ")"
		}}>
		{editable}
		</div>);
	}
}
export default Portrait;