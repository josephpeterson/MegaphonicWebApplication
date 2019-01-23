// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Route, Router, Switch, Redirect } from 'react-router-dom';
import "./main.css";

class BasicModal extends Component {
	constructor(props) {
		super(props);
		this.modal = document.createElement("div");
		this.root = props.Root ? props.Root:document.getElementById("modalRoot");
		this.state = {
			title: props.Title,
			body: props.Body
		}
	}
	componentDidMount() {
		this.root
		.appendChild(this.modal);
	}
	componentWillUnmount() {
		this.root
		.removeChild(this.modal);
	}
	CloseModal(event)
	{
		this.props.onClose(event);
	}
	render() {

		const {title, body } = this.state;

		var close = this.CloseModal.bind(this);
		return ReactDOM.createPortal(
			<div className="modal fade in show pt-5" style={{ display: "block" }} id="megaModal" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>{body}</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-info" data-dismiss="modal" onClick={close}>Close</button>
						</div>
					</div>

				</div>
			</div>, this.modal);
	}
}
export default BasicModal;