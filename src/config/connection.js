'use strict';
/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 20.06.2017
 * @author: Manish Budhiraja
 * */
//ankush = "192.168.0.24:3000",
//sheenam = "192.168.0.174:3000",
const localhost = '172.24.2.236',
	sivali = '192.168.0.88:3000',
	staging = '34.211.31.84:8048',
	live = 'doctorsmarket.co.uk';

const running_url = localhost,
	http_url = `http://${running_url}`,
	socket_url = `ws://${running_url}/websocket`,
	apiBase_url = `http://${running_url}/rest/v1/`,
	staticPagesUrl = `http://${running_url}/`,
	mediaBase_url = `http://${running_url}/img/frontend/Users/`;
	// mediaBase_url = `https://${running_url}/doctor-market/img/frontend/Users/`;


export default class Connection {
	static getResturl() {
		return apiBase_url + '/locummedical/';
	}

	static getSocketResturl() {
		return socket_url;
	}

	static getBaseUrl() {
		let local = http_url + '/doctor-market';
		return local;
	}

	static getMedia(_id,image) {
		return mediaBase_url + _id + '/' + image;
	}

	static getStaticPage(url) {
		return staticPagesUrl + url;
	}
}
