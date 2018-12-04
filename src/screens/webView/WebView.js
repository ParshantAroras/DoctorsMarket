import React, { Component } from 'react';
import {View ,WebView } from 'react-native';
import DocumentUploader from '../../components/documentuploader';
import Connection from '../../config/connection';
import RestClient from '../../utils/restclient';
export default class Webview extends Component {
	render() {
    let {uri} = this.props.navigation.state.params;
    console.log('Connection.getBaseUrl()+uri}',this.props.navigation.state.params)
    
		return (
            <View style={{flex: 1}}>
            <WebView
            source={{uri:Connection.getBaseUrl()+uri}}
          />
          </View>
		);
	}
}

