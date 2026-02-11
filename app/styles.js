import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: '#565f6e',
	},
	input: {
		height: 50,
		marginLeft: 12,
		marginRight: 12,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		color: 'white',
		backgroundColor: '#464e5e',
		flexDirection:'row',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
	},
	bus: {
		flex: 1,
	},
	navbar: {
		color: 'white',
		height: 60,
		backgroundColor: '#464e5e',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	navbarItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dropdownList:{
		position: 'absolute',
		borderRadius: 8,
		maxHeight: 310,
		marginTop: 117,
		marginLeft: 12,
		width: '94%',
		zIndex: 1,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	dropdownItem:{
		color: 'white',
		height: 45,
		padding: 11,
	},
	searchbtn:{
		paddingLeft: 10,
		justifyContent: 'center'
	},
	addbtn:{
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8098c4',
		padding: 10,
		color: 'white',
		width: 70,
		borderRadius: 40,
		shadowColor: 'black',
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	busitem: {
		backgroundColor: '#464e5e',
		height: 70,
		margin: 12,
		marginBottom: 6,
		shadowOffset: { width: 0, height: 1.5 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 5,
		flexDirection: 'row',
		alignItems: 'center',
		color: 'white',
		padding: 8,
	},
	busbar:{
		flex: 1,
		height: 45,
		marginRight: 10,
		borderRadius: 5,
	}
});

export default styles;
