
import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Platform, ActivityIndicator,ScrollView,Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderTitle } from '../components/HeaderTitle';

import { Card, CardItem, Text, Icon, Right, Content } from 'native-base';
import { scale, verticalScale, fonts, moderateScale } from '../config';
import { normalize } from 'react-native-elements';

import EIcon from 'react-native-vector-icons/EvilIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import { JobRequest, acceptInvite, rejectInvite } from '../actions/JobRequestActions';
import { connect } from 'react-redux';
import idx from '../utils/Idx';
import Modal from 'react-native-modalbox';
import Button from '../components/button';
import { capitalizeFirstLetter, leftPad } from '../utils';
import Connection from '../config/connection';


let DaysArray = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

class JobRequestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.jobRequestData,
            isOpen: false,
            modalData: {},
        };
        this.acceptInviteFromHospitlal = this.acceptInviteFromHospitlal.bind(this);
        this.rejectInviteFromHospitlal = this.rejectInviteFromHospitlal.bind(this);
        this.declineConfimr = this.declineConfimr.bind(this);

    }
    componentDidMount() {
        console.log('this.propopopopopo', this.props)
    }

    iconname = status => {
        switch (status) {
            case 'sent':
                return 'exclamation';
            case 'interested':
                return 'check';
            case 'accepted':
                return 'check';
            case 'rejected':
                return 'circle-with-cross';
            default:
                return null;
        }
    };

	/*
	accept the invite from hopital
	*/
    acceptInviteFromHospitlal() {
        let context = this;
        let { invite_key, emergency_job_id } = this.props.navigation.state.params.item;

        const { navigation, token, userid } = this.props;
        let body = {
            user_id: userid,
            api_token: token,
            job_id: emergency_job_id,
            invite_key
        };
        console.log("body", body)
        this.props.acceptInvite(body, () => {
            navigation.goBack();
        });
    }

    /***
    confirmation delete
    */

    declineConfimr(){
        let context = this;
        Alert.alert(
                'Decline Confirmation',
                'Are You sure To Decline Request',
                [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => {context.rejectInviteFromHospitlal()}},
                ],
                { cancelable: false }
         )
    }
	/*
	reject the invite from hospital
	*/

    rejectInviteFromHospitlal() {
        let context = this;
        const { navigation, token, userid } = this.props;
        let { invite_key, emergency_job_id } = this.props.navigation.state.params.item;
        let body = {
            user_id: userid,
            api_token: token,
            job_id: emergency_job_id,
            invite_key
        };
        console.log("body2", body)
        this.props.rejectInvite(body, () => {
            navigation.goBack();
        });
    }

    renderAvatar = (user_id,profile_pic) => {
		console.log(profile_pic, 'profile_pic');
		if (profile_pic) {
			return (
				<Image
                    source={{ uri: Connection.getMedia(user_id,profile_pic)  }}
                    // width: moderateScale(100), height: moderateScale(100)
					style={{borderRadius: width*.12,  width: width*.24, height: width*.24 }}
					resizeMode="cover"
					resizeMethod='resize'
				/>
			);
		} else {
			return (
				<Image
					source={require('../images/hospital4.png')}
					style={{borderRadius: width*.12,  width: width*.24, height: width*.24 }}
                    resizeMode="contain"
                    resizeMethod='resize'
				/>
			);
		}
	};

    render() {
        let { user: { first_name, last_name, phone, email }, id,user_id, start_date, end_date, start_time, end_time, address: { address_text, city, country, state, zip_code }, which_days } = this.props.navigation.state.params.JobData
        let { invite_key, invite_status, candidate_id, emergency_job_id, emergency_job : {user: {profile_pic}} } = this.props.navigation.state.params.item;
        let which_daysArray = which_days.split(",");
        return (<View style={{flex: 1 ,backgroundColor :'#ffffff'}}>
           <View
                    style={{
                        height: verticalScale(55),
                        width,
                        paddingLeft: scale(15),
                        paddingTop: verticalScale(8),
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            color: '#000000',
                            opacity: 0.84,
                            fontFamily: fonts.fontPrimaryLight,
                            fontSize: normalize(36),
                        }}
                    >
                        Job Request Detail
					</Text>
                </View>
            <ScrollView style={{flex: invite_status === 'sent' ? 0.8 : 1}}>
            <View style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                }}
            >
             
                <View>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: verticalScale(10),

                    }}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center', marginLeft: moderateScale(10) }}>
                        {this.renderAvatar(user_id,profile_pic)}
                            {/* <Image source={require('../images/hospital4.png')} style={{ width: moderateScale(100), height: moderateScale(100) }} /> */}
                        </View>
                        <View style={{ flex: 0.6 }} >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginRight: 5,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(17),
                                    marginVertical: verticalScale(5),
                                    paddingTop: moderateScale(12)
                                }}
                            >
                                {capitalizeFirstLetter(first_name) + ' ' + capitalizeFirstLetter(last_name)}
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginRight: 5,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                Job ID # {id}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: moderateScale(40),marginTop: moderateScale(5) }}>


                        <View style={{
                            height: moderateScale(30),
                            flexDirection: 'row',
                            justifyContent : 'flex-end'

                        }}>
                            <Text
                                style={{
                                    flex : 1,
                                    justifyContent : 'flex-end',
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                    paddingTop: moderateScale(3)
                                }}
                            >
                                Working Period :
					</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    justifyContent : 'flex-end',
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                    paddingTop: moderateScale(3)
                                }}
                            >
                                Working Hours :
						</Text>
                        </View>
                        <View style={{
                         
                            height: verticalScale(30),
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginBottom: moderateScale(2)
                        }}>
                            <Text
                                style={{   
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    marginRight: 5,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                    paddingBottom: moderateScale(2)
                                }}
                            >
                                {moment(end_date.start_date).format("Do MMM ") + ' ' + moment(end_date).format("Do MMM ")}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    marginRight: 5,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                    paddingBottom: moderateScale(2)

                                }}
                            >
                                {moment(start_time).utc().format("h:mm a") + ' ' + moment(end_time).utc().format("h:mm a")}
                            </Text>
                        </View>
                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-end',

                        }}>
                            <Text
                                style={{
                                 
                                    marginRight: moderateScale(10),
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                Location :
						</Text>

                        </View>

                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-start',

                        }}>
                            <Text
                                style={{
                                    marginRight: moderateScale(10),
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                {address_text + ' ' + city + ' ' + country + '' + state + ' ' + zip_code}
                            </Text>

                        </View>


                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-end',
                            alignItems: 'flex-start'
                        }}>
                            <Text
                                style={{
                                    marginRight: 0,
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                Email :
						</Text>

                        </View>

                        <View style={{
                            height: verticalScale(40),
                            flexDirection: 'row',
                            justifyContent : 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Text
                                style={{
                                    marginRight: 0,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                {email}
                            </Text>

                        </View>

                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-end',
                        }}>
                            <Text
                                style={{
                                    marginRight: 0,
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                Phone :
						</Text>
                        </View>
                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-start',
                        }}>
                            <Text
                                style={{
                                    marginRight: 0,
                                    fontFamily: fonts.fontPrimaryLight,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                {phone}
                            </Text>
                        </View>
                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-end',
                        }}>
                            <Text
                                style={{
                                    marginRight: 0,
                                    fontFamily: fonts.fontPrimaryBold,
                                    fontSize: normalize(12),
                                    marginVertical: verticalScale(5),
                                }}
                            >
                                Working Weekdays :
						</Text>
                        </View>
                        <View style={{
                            height: verticalScale(40),
                            justifyContent : 'flex-start',
                            flexDirection: 'row'
                        }}>

                            {which_daysArray.length > 0 && which_daysArray.map((days, i ) => {
                                return (<View key={i} style={{ height: moderateScale(30), width: moderateScale(30), backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center',marginRight : moderateScale(5) }}>
                                    <Text style={{ color: '#ffffff', fontSize: normalize(10), textAlign: 'center' }}>{DaysArray[days - 1]}</Text>
                                </View>)
                            })}
                        </View>
                        </View>
                        </View>
                       
                </View>
                {this.props.loader && (
                    <View
                        style={{
                            flex: 1,
                            zIndex: 100,
                            position: 'absolute',
                            top: scale(220),
                            right: scale(150),
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ActivityIndicator color={'#02B2FE'} size={'large'} />

                        <Text style={{ color: '#02B2FE' }}>loading....</Text>
                    </View>
                )}
            </View>
            </ScrollView>
           { invite_status === 'sent' &&   <View style={{flex: 0.12,flexDirection :'row',justifyContent:'flex-start'}}>
           <View style={{flex: 1}}>
                             <Button
                            label={'INTERESTED'}
                            disabled={false}
                            onPress={() => this.acceptInviteFromHospitlal()}
                            linearGradientStyle={{width: width *.50,
                                borderRadius: 0}}
                            styles={{
                                button: {
                                    height: verticalScale(50),
                                    width: width*.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    borderRadius: 100,
                                    marginVertical: verticalScale(10),
                                },

                                label: [
                                    {
                                        fontSize: Platform.OS == 'ios' ?  moderateScale(14) : moderateScale(16),
                                        color: '#FFFFFF',
                                        letterSpacing: 5,
                                    },
                                ],
                            }}
                        />
                        </View>
                        <View style={{flex: 1}}>
                        <Button
                            label={'REJECT'}
                            disabled={false}
                            onPress={() => this.declineConfimr()}
                            linearGradientStyle={{width: width *.50,
                                borderRadius: 0}}
                            styles={{
                                button: {
                                    height: verticalScale(50),
                                    width: width*.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    borderRadius: 100,
                                    elevation: 3,
                                    marginVertical: verticalScale(10),
                                },

                                label: [
                                    {
                                        fontSize: Platform.OS == 'ios' ?  moderateScale(14) : moderateScale(16),
                                        color: '#FFFFFF',
                                        letterSpacing: 5,
                                    },
                                ],
                            }}
                        />
                        </View>
                        </View>}
            </View>
        );
    }
}
const mapStateToProps = ({ JobRequestReducer, Loginreducer }) => {
    console.log('Loginreducer', JobRequestReducer)
    const { jobRequestData, loader } = JobRequestReducer;
    const { token, userid } = Loginreducer;
    return {
        token,
        userid,
        jobRequestData,
        loader
    };
};

export default connect(
    mapStateToProps,
    { JobRequest, acceptInvite, rejectInvite, JobRequestDetail }
)(JobRequestDetail);


