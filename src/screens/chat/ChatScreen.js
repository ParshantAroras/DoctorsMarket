import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	TouchableHighlight,
	Keyboard,
	Dimensions,
	RefreshControl,
	AppState
	
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import { resetNavigationTo } from '../../utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { HeaderTitle } from '../../components/HeaderTitle';
import { toast } from '../../components/toast';
import { reset } from '../../actions/Loginactions';

import Spinner from '../../components/spinner';
const { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import RestClient from '../../utils/restclient';
import { verticalScale, moderateScale } from '../../config';
//used to make random-sized messages
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.item.full_name}`,
		tabBarVisible: false,
		headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
		headerStyle: {
			backgroundColor: 'white',
		},
	});

	constructor(props) {
		super(props);

		var loremIpsum =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac orci augue. Sed fringilla nec magna id hendrerit. Proin posuere, tortor ut dignissim consequat, ante nibh ultrices tellus, in facilisis nunc nibh rutrum nibh.';

		//create a set number of texts with random lengths. Also randomly put them on the right (user) or left (other person).
		var numberOfMessages = 20;

		var messages = [];
		/*
		for (var i = 0; i < numberOfMessages; i++) {
			var messageLength = getRandomInt(10, 120);

			var direction = getRandomInt(1, 2) === 1 ? 'right' : 'left';

			message = loremIpsum.substring(0, messageLength);

			messages.push({
				direction: direction,
				text: message,
			});
		}

*/
		this.state = {
			messages: messages,
			inputBarText: '',
			refreshing: false,
			pageNo: 1,
		};

		console.log(this.state.messages);
		//debugger;
	}

	//fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
	componentWillMount() {
		let context = this;
		this.fetchMessage(this.state.pageNo);
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
		this._interval = setInterval(() => {
			//alert('koo');
			if (context.state.pageNo === 1) {
				context.fetchMessage(1);
			}
		}, 6000);

		AppState.addEventListener('change', this._handleAppStateChange);
	}

	fetchMessage = pageNo => {
		const { item } = this.props.navigation.state.params;
		const { userid } = this.props;
		this.setState({ refreshing: false });
		//console.log({ user_id: this.props.userid, api_token: this.props.token, parent_id: item.parent_id, page: 1 });
		//	debugger;
		//alert("ko")
		RestClient.post(
			'/apis/getConversation',
			{},
			{
				user_id: this.props.userid,
				api_token: this.props.token,
				parent_id: item.parent_id,
				page: pageNo,
			}
		).then(response => {
			if (response.status === 200) {
				if (response.chatData && response.chatData.conversations.length > 0) {
					console.log(response.chatData.conversations);
					response.chatData.conversations.reverse();
					let data = [];
					response.chatData.conversations.map(item => {
						if (item.sender_user.id === this.props.userid) {
							data.push({
								direction: 'right',
								text: item.message,
								modified: item.modified,
								data: item,
							});
							//this.state.messages.reverse();
						} else {
							data.push({
								direction: 'left',
								text: item.message,
								modified: item.modified,
								data: item,
							});
							//this.state.messages.reverse();
						}
					});
					this.setState({
						messages: pageNo === 1 ? data : [...data, ...this.state.messages],
					});
				}
			}
		});
	};
	_handleAppStateChange = nextAppState => {
		if (nextAppState === 'inactive' || 'background') {
			clearInterval(this._interval);
			//alert('lop');
		}
	};
	componentWillUnmount() {
		//alert('lo');
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
		AppState.removeEventListener('change', this._handleAppStateChange);
		clearInterval(this._interval);
	}

	//When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
	//Without this, whatever message is the keyboard's height from the bottom will look like the last message.
	keyboardDidShow(e) {
		this.scrollView.scrollToEnd();
	}

	//When the keyboard dissapears, this gets the ScrollView to move the last message back down.
	keyboardDidHide(e) {
		this.scrollView.scrollToEnd();
	}

	//scroll to bottom when first showing the view
	componentDidMount() {
		setTimeout(
			function() {
				this.scrollView.scrollToEnd();
			}.bind(this)
		);
	}

	//this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
	//the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
	componentDidUpdate() {
		setTimeout(
			function() {
				this.scrollView.scrollToEnd();
			}.bind(this)
		);
	}

	_sendMessage() {
		Keyboard.dismiss();
		const { item } = this.props.navigation.state.params;
		const { userid } = this.props;

		console.log(item, userid);
		//debugger;
		this.state.messages.push({ direction: 'right', text: this.state.inputBarText, modified: new Date(), data: {} });

		this.setState({
			messages: this.state.messages,
			inputBarText: '',
		});

		RestClient.post(
			'/apis/sendMessage',
			{},
			{
				parent_id: item.parent_id,
				message: this.state.inputBarText,
				receiver: item.sender,
				sender: this.props.userid,
				api_token: this.props.token,
			}
		).then(response => {
			console.log(response);
		});
	}

	_onChangeInputBarText(text) {
		this.setState({
			inputBarText: text,
		});
	}

	//This event fires way too often.
	//We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
	//We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
	//The real solution here is probably a fork of AutogrowInput that can provide this information.
	_onInputSizeChange() {
		setTimeout(
			function() {
				this.scrollView.scrollToEnd({ animated: false });
			}.bind(this)
		);
	}
	_onRefresh = () => {
		//	this.setState({ refreshing: true });
		//const { babyId } = this.props;
		this.setState(
			{
				pageNo: this.state.pageNo + 1,
				refreshing: true,
			},
			() => {
				// alert("koo");
				this.fetchMessage(this.state.pageNo);
				// alert("after");
			}
		);
	};
	render() {
		var messages = [];

		this.state.messages.forEach(function(message, index) {
			messages.push(
				<MessageBubble key={index} direction={message.direction} text={message.text} data={message.data} />
			);
		});

		return (
			<View style={styles.outer}>
				<ScrollView
					ref={ref => {
						this.scrollView = ref;
					}}
					style={styles.messages}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
				>
					{messages}
				</ScrollView>
				<InputBar
					onSendPressed={() => this._sendMessage()}
					onSizeChange={() => this._onInputSizeChange()}
					onChangeText={text => this._onChangeInputBarText(text)}
					text={this.state.inputBarText}
				/>
				<KeyboardSpacer />
			</View>
		);
	}
}

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
	render() {
		const { data } = this.props;
		console.log(data.expand_url);
		//console.log(this.props, 'asdas');
		//These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
		var leftSpacer = this.props.direction === 'left' ? null : <View style={{ width: 70 }} />;
		var rightSpacer = this.props.direction === 'left' ? <View style={{ width: 70 }} /> : null;

		var bubbleStyles =
			this.props.direction === 'left'
				? [styles.messageBubble, styles.messageBubbleLeft]
				: [styles.messageBubble, styles.messageBubbleRight];

		var bubbleTextStyle =
			this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

		return (
			<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
				{leftSpacer}
				<TouchableHighlight
					style={bubbleStyles}
					onPress={() => alert('ko')}
					disabled={data.expand_url === null}
				>
					<View style={{ flex: 1 }}>
						<Text style={bubbleTextStyle}>{this.props.text}</Text>
						{data.expand_url !== null ? (
							<Text style={[bubbleTextStyle, { color: 'white' }]}>{data.expand_url}</Text>
						) : (
							<View />
						)}
					</View>
				</TouchableHighlight>

				{rightSpacer}
			</View>
		);
	}
}

//The bar at the bottom with a textbox and a send button.
class InputBar extends Component {
	//AutogrowInput doesn't change its size when the text is changed from the outside.
	//Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
	//Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
	//was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
	//of the InputBar's text to be set from the outside.
	componentWillReceiveProps(nextProps) {
		if (nextProps.text === '') {
			// this.autogrowInput.resetInputText();
		}
	}

	render() {
		return (
			<View style={styles.inputBar}>
				<AutogrowInput
					style={styles.textBox}
					ref={ref => {
						this.autogrowInput = ref;
					}}
					underlineColorAndroid="transparent"
					multiline={true}
					defaultHeight={moderateScale(33)}
					onChangeText={text => this.props.onChangeText(text)}
					onContentSizeChange={this.props.onSizeChange}
					value={this.props.text}
				/>
				<TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
					<Text style={{ color: 'white' }}>Send</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

//TODO: separate these out. This is what happens when you're in a hurry!
const styles = StyleSheet.create({
	//ChatView

	outer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},

	messages: {
		flex: 1,
		marginBottom: 10,
	},

	//InputBar

	inputBar: {
		flexDirection: 'row',
		alignItems : 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		paddingVertical: 8,
		marginBottom: isIphoneX() ? 20 : 8,
	},

	textBox: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'gray',
		flex: 1,
		fontSize: 16,
		height: moderateScale(33),
		paddingHorizontal: 10,
	},

	sendButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 15,
		marginLeft: 5,
		paddingRight: 15,
		borderRadius: 5,
		height: verticalScale(33),
		backgroundColor: '#02B2FE',
	},

	//MessageBubble

	messageBubble: {
		borderRadius: 5,
		marginTop: 8,
		marginRight: 10,
		marginLeft: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		flex: 1,
	},

	messageBubbleLeft: {
		backgroundColor: '#d5d8d4',
	},

	messageBubbleTextLeft: {
		color: 'black',
	},

	messageBubbleRight: {
		backgroundColor: '#02B2FE',
	},

	messageBubbleTextRight: {
		color: 'white',
	},
});

const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	return {
		userid,
		token,
		userdata,
	};
};
export default connect(
	mapStateToProps,
	{ reset }
)(ChatScreen);
