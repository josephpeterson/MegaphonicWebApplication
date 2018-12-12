// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import { Configuration } from '../config';
import $ from 'jquery';
class mApi {
	get(service, req) {
		var url = Configuration.services[service] + "/" + req;
		return $.ajax({
			url: url,
			type: 'GET',
			beforeSend: this.prepare
		});
	}
	post(service, req,data) {
		var url = Configuration.services[service] + "/" + req;
		return $.ajax({
			url: url,
			type: 'POST',
			beforeSend: this.prepare,
			data: data
		});
	}
	prepare(xhr) {
		xhr.setRequestHeader("Authorization", "BEARER " + localStorage.getItem("jwtToken"));
	}
}
export default new mApi();