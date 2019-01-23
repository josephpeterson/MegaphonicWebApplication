import React, { Component } from 'react';
import ConfirmModal from '../../Modal/Confirm';

class RemovePostModal extends Component {
	render() {
		var accept = this.props.onAccept;
		var decline = this.props.onDecline;
		var title = "Remove Post";
		var body = "Are you sure you want to remove this post? Once removed, this post will be gone forever. We cannot undo this action.";

		return (<ConfirmModal onAccept={accept} onDecline={decline} Title={title} Body={body} />);
	}
}
export default RemovePostModal;






//Remove post modal
