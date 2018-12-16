// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import Calendar from '../../components/calendar';
import $ from 'jquery';

class MyCalendar extends Component {
	render() {
		return (
			<div className="container p-5">
			<Calendar />
 			
			</div>
		);
	}
}
export default MyCalendar;