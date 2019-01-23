// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Route, Router, Switch, Redirect } from 'react-router-dom';
import "./main.css";
import Modal from "./Basic";

class ConfirmModal extends Modal {
	AcceptModal(event)
	{
		this.props.onAccept(event);
	}
	DeclineModal(event)
	{
		this.props.onDecline(event);
	}
	render() {

		const {title, body } = this.state;

		var accept = this.AcceptModal.bind(this);
		var decline = this.DeclineModal.bind(this);
		return ReactDOM.createPortal(
			<div className="modal fade in show pt-5" style={{ display: "block" }} id="megaModal" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
						</div>
						<div className="modal-body">
							<p>{body}</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={decline}>Cancel</button>
							<button type="button" className="btn btn-success" data-dismiss="modal" onClick={accept}>Confirm</button>
						</div>
					</div>

				</div>
			</div>, this.modal);
	}
}
export default ConfirmModal;