import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
const { height, width } = Dimensions.get('window');
export default class Accordion extends Component {
	constructor(props) {
		super(props);
		this.icons = {
			open: 'plus',
			close: 'minus',
		};

		this.state = { expanded: true };
	}

	toggle() {
		this.setState({
			expanded: !this.state.expanded,
		});
	}
	render() {
		let icon = this.icons['open'];
		if (this.state.expanded) {
			icon = this.icons['close'];
		}
		return (
			<TouchableHighlight
				disabled
				style={styles.container}
				onPress={this.toggle.bind(this)}
				underlayColor="#f1f1f1"
			>
				<View style={{ flex: 1 }}>
					<View style={styles.titleContainer}>
						<Text style={styles.Header}>{this.props.Header}</Text>
						<TouchableHighlight style={styles.button}>
							<Icon style={styles.FAIcon} name={icon} />
						</TouchableHighlight>
					</View>

					{this.state.expanded && <View style={styles.body}>{this.props.children}</View>}
				</View>
			</TouchableHighlight>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		marginTop: 10,
		height: 300,
		width,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	Header: {
		flex: 1,
		opacity: 0.7,
		fontFamily: fonts.fontPrimaryLight,
		fontSize: 16,
	},
	FAIcon: {
		height: 30,
		color: 'white',
		marginRight: 5,
	},
	body: {
		padding: 10,
		paddingTop: 0,
	},
});
