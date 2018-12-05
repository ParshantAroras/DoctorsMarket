import React, { Component } from 'react';
import { StatusBar, Image, Text } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux';
import Events from '../utils/Events';
class CustomHeader2 extends Component {
    constructor(props){
        super(props)
      this.state = {edit: true};
    }
	componentWillMount() {
		StatusBar.setHidden(true);
    }
    backButtonEvent(){
        Events.emit('backButtonPage', { data:  true  });
    }
    editButtonEvent(){
        Events.emit('editButtonPage', { data:  true  });
    }

	render() {
        let {edit} = this.state;
		const {
            navigation: { navigate },
            title
		} = this.props;
		return (
			<Header style={{ backgroundColor: '#FFFFFF' }} androidStatusBarColor={'#FFFFFF'}>
				<Left>
					<Button onPress={() => {this.backButtonEvent();}} transparent>
                    <Icon
							size={18}
							style={{ fontSize: 35, 	color: '#02B2FE', opacity: 0.9, paddingBottom: 3 }}
							name="arrow-back"
						/>
					</Button>
				</Left>
                <Body >
                <Title style={{color: '#02B2FE'}}>{edit ? 'View '+ title : 'Edit '+ title }  </Title>
              </Body>
				<Right>
                {edit&&<Button onPress={() => {this.setState({edit :false});this.editButtonEvent()}} transparent>
						<Text style={{fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(13),
										color: '#02B2FE',
										opacity: 1.1}}>EDIT</Text>
					</Button>}
				</Right>
			</Header>
		);
	}
}

const mapStateToProps = ({ Notireducer }) => {
	const { noticlear } = Notireducer;
	return {
		noticlear,
	};
};

export default connect(
	mapStateToProps,
	null
)(CustomHeader2);
