export const NOTIFICATION_RECIEVED = 'NOTIFICATION_RECIEVED';
export const NOTIFICATION_CLEARED = 'NOTIFICATION_CLEARED';
export const DEVICE_TOKEN = 'DEVICE_TOKEN';
export const notificationrecieving = () => {
	return {
		type: NOTIFICATION_RECIEVED,
	};
};

export const notificationclearing = () => {
	return {
		type: NOTIFICATION_CLEARED,
	};
};
export const deviceTokenSet = (deviceToken) => {
	return {
		type: DEVICE_TOKEN,
		deviceToken
	};
};

