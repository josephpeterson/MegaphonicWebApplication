// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import "./main.css";

class BasicModal extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			title: props.title,
			body: props.body,
			show: props.show
		}
	}
	render() {

		const {show, title, body} = this.state;

		var close = function() {
			this.setState({
				show: false
			});
		}.bind(this);

		if(!show)
			return <></>;

		return (
			<div className="modal fade in show pt-5" style={{ display: show ? "block" : "none" }} id="megaModal" role="dialog">
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
			</div>
		)
	}
}
export default BasicModal;