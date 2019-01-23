import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../../services/MegaphonicAPI';
import BasicModal from '../../../components/Modal/Basic';

class ModalTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	componentDidMount() {
	}
	OpenModal() {
		this.setState({
			show: true
		});
	}
	CloseModal()
	{
		this.setState({
			show: false
		});
	}
	render() {
		const { show } = this.state;

		var title = "BasicModal Test Modal";
		var body = "This is a BasicalModal. This was rendered using the example ModalTest component.";

		return (
			<>
				{show && <BasicModal onClose={this.CloseModal.bind(this)} Title={title} Body={body}/>}
				<button className='btn btn-info' onClick={this.OpenModal.bind(this)}>Modal Test</button>
			</>
		);
	}
}
export default ModalTest;