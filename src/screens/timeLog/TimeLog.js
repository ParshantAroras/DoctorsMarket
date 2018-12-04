import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Modal,ActivityIndicator } from 'react-native';
import { HeaderTitle } from '../../components/HeaderTitle';
import { SlideButton, SlideDirection } from 'react-native-slide-button';
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import LogHours from './LogHours';
import AddHoursModal from './AddHoursModal';
import MultiSwitch from 'rn-slider-switch';
import { connect } from 'react-redux';
import { viewAllNextSchedules } from '../../actions/TimeLogsActions';

class TimeLog extends Component {
	static navigationOptions = {
		headerMode: 'none',
	};
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			logHoursData : []
		}
		this.navigateTO = this.navigateTO.bind(this);
	}
	componentDidMount = () => {
		let context = this;
		console.log('this.props', this.props);
		const { token, userid,navigation } = this.props;
		console.log('this.propsssss', this.props)
		let body = {
		  user_id: userid,
		  api_token: token
		};
		this.props.viewAllNextSchedules({ body },navigation, (data)=>{
			console.log('datattataatatattata',data)
			data.sort(function(a, b){
				var dateA=new Date(a.start_date), dateB=new Date(b.start_date)
				return dateA-dateB //sort by date ascending
			})
			console.log('datattataatatattataafter',data)
            context.setState({logHoursData : data})
		});
	  };

	onSlide() {
	this.setState({openModal : true})
	}
	navigateTO(){
		
		this.props.navigation.navigate('TimeLogs');
		this.setState({ openModal: false});
	}
	render() {
		let {logHoursData} = this.state;
		console.log('logHoursData',logHoursData)
		return (
			<View
				style={{
					flex: 1,

					backgroundColor: '#FFFFFF',
				}}
			>
			<HeaderTitle title="DoctorsMarket" />
				<View style={{ justifyContent: 'center', alignItems: 'center',marginTop: verticalScale(20) }}>
					<View style={{ backgroundColor: 'white', height: 56, width: SCREEN_WIDTH * .85, borderRadius: 50, borderWidth: 1, borderColor: 'gray' }}>
						<SlideButton
							onSlideSuccess={this.onSlide.bind(this)}
							slideDirection={SlideDirection.RIGHT}
							style={{flex: 1}}
							width={200}
							height={200}>
							{/* <View style={{ height: 60, width: 60, backgroundColor: 'blue',borderRadius : 20 }}>
							<Text style={styles.button}>Slide Button</Text>
						</View> */}
							<Image source={require('../../images/Rectangle1.png')} style={{ width: 55, height: 55 }} />
						</SlideButton>
						<View style={{ position: 'absolute', right: moderateScale(115), top: verticalScale(15) }}>
							<Text style={{ fontFamily: fonts.fontPrimaryBold, fontSize: 15 }}>Log Hours</Text>
						</View>
				</View>
				{/* <MultiSwitch
                    currentStatus={'Open'}
                    disableScroll={value => {
                        console.log('scrollEnabled', value);
                        // this.scrollView.setNativeProps({
                        //     scrollEnabled: value
                        // });
                    }}
                    isParentScrollEnabled={false}
                    onStatusChanged={text => {
                        console.log('Change Status ', text);
                    }}/> */}
				</View>
				<View style={{justifyContent : 'center',alignItems : 'center',marginTop: verticalScale(5)}}>
					<Text style={{color : 'grey'}}>Swipe to log hours</Text>
				</View>	
				<View style={{justifyContent : 'center',alignItems : 'flex-start',marginTop: verticalScale(5),marginLeft: moderateScale(13), }}>
					<Text style={{fontFamily: fonts.fontPrimaryRegular, fontSize: 17,color : '#000000' }}>Next Shift</Text>
				</View>	
				{ logHoursData.length == 0 && <View style={{height : SCREEN_HEIGHT*0.50,justifyContent : 'center',alignItems: 'center'}}>
				<Text> No Schedule </Text>
				</View>}	
				<LogHours logHoursData={logHoursData}/>
				
				{this.state.openModal && <Modal
				        // animationType={'slide'}
						backdrop={false}
						isOpen={this.state.openModal}
						onClosed={() => this.setState({ openModal: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					>
	                  <AddHoursModal onClosed={() => this.setState({ openModal: false })} navigateTo={()=>this.navigateTO()}/>
					</Modal>}
					{this.props.loader&& (
						<View
							style={{
								flex: 1,
								zIndex:100,
								position : 'absolute',
								top : verticalScale(280),
								right : moderateScale(150),
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
		);
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17,
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30,
	},
});

const mapStateToProps = ({ TimeLogReducer, Loginreducer }) => {
	console.log('Loginreduce222222r', TimeLogReducer)
	const { timeLogData, loader } = TimeLogReducer
	const { token, userid } = Loginreducer;
	return {
	  token,
	  userid,
	  timeLogData,
	  loader
	};
  };

export default connect(
	mapStateToProps,
	{viewAllNextSchedules }
  )(TimeLog);
  

