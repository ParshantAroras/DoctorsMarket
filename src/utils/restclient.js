/*
 * @file: RestClient.js
 * @description: Rest Client
 * @date: 06.07.2017
 * @author: Manish Budhiraja
 * */

'use strict';

import Connection from '../config/connection';
import querystring from 'querystring';
import { NetInfo, Alert, Platform } from 'react-native';

let logintoken = '';

class RestClient {
	static isConnected() {
		let context = this;
		return new Promise(function(fulfill, reject) {
			NetInfo.isConnected.fetch().then(isConnected => {
				console.log(isConnected);
				if (isConnected) {
					//   alert(isConnected)
					// console.log(isConnected)
					fulfill(isConnected);
				} else {
					reject(isConnected);
				}
			});
			fulfill(true);
		});
	}

	static post(url, params, body) {
		let context = this;
		let settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			timeout: 1000 * 1 * 60,
		};

		if (params.id) {
			settings.headers.id = params.id;
		}

		if (params.token) {
			settings.headers.token = params.token;
		}

		if (body) {
			settings.body = JSON.stringify(body);
		}
		console.log(Connection.getBaseUrl() + url, settings);
		return new Promise(function(fulfill, reject) {
			fetch(Connection.getBaseUrl() + url, settings)
				.then(response => {
					console.log(response);
					return response.text();
				})
				.then(responseText => {
					fulfill(JSON.parse(responseText));
				})
				.catch(error => {
					fulfill({
						message: 'Please check your internet connectivity',
						status: 400,
					});
					console.warn('eroro', error);
				});
		});
	}

	static get(url, params, token = '', userId = '') {
		let context = this;
		return new Promise(function(fulfill, reject) {
			context
				.isConnected()
				.then(() => {
					// console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
					let query = querystring.stringify(params);
					fetch(Connection.getResturl() + url + '?' + query, {
						method: 'GET',
						timeout: 1000 * 1 * 60,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							'x-auth-token': token,
							'x-user-id': userId,
						},
					})
						.then(response => {
							return response.text();
						})
						.then(responseText => {
							//console.log('responseText*****',responseText);
							fulfill(JSON.parse(responseText));
						})
						.catch(error => {
							console.warn(error);
							fulfill({
								message: 'Please check your internet connectivity or our server is not responding.',
								status: 400,
							});
						});
				})
				.catch(error => {
					fulfill({
						message: 'Please check your internet connectivity or our server is not responding.',
						status: 400,
					});
				});
		});
	}

	static imageUpload(url, params, body) {
		let context = this;
		let settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data;',
			},
			timeout: 1000 * 1 * 10,
		};

		if (params.id) {
			settings.headers.id = params.id;
		}

		if (params.token) {
			settings.headers.token = params.token;
		}

		if (body) {
			settings.body = body;
		}
		console.log(settings, Connection.getBaseUrl() + url);
		return new Promise(function(fulfill, reject) {
			//console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
			fetch(Connection.getBaseUrl() + url, settings)
				.then(response => {
					console.log("responseee",response)
					return response.text();
				})
				.then(responseText => {
					console.log('response ******** ',responseText)
					fulfill(JSON.parse(responseText));
				})
				.catch(error => {
					console.warn(error);
					fulfill({
						message: 'Please check your internet connectivity or our server is not responding.',
						status: 400,
					});
				});
		});
	}
}

export default RestClient;
