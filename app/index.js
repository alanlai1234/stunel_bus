import React, { useState, useEffect } from 'react';
import {Modal, View, TextInput, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import Search from './search.js'
import styles from './styles.js'
import Bus from './bus.js'
import data from './busInfo.json';
import Navbar from './navbar.js';

const Home = () => {
	const [searchStop, setSearchStop] = useState("");
	const [doSearch, setDoSearch] = useState(false);
	let stops = {};
	let options = [];
	let routesInStop = {};
	const [stops1, setStops1] = useState();
	const [options1, setOptions1] = useState();
	const [routesInStop1, setRoutesInStop1] = useState();
	useEffect(() => {
		for(const key in data.stops){
			stops[data.stops[key].name] = key;
			options.push(data.stops[key].name);
		}
		for(const stop in stops)
			routesInStop[stops[stop]] = [];
		for(const key in data.routes){
			for(let i = 3;i < data.routes[key].length; ++i){
				if(data.routes[key][i][1] in routesInStop)
					routesInStop[data.routes[key][i][1]].push([key, data.routes[key][i][0]]);
			}
		}
		setRoutesInStop1(routesInStop);
		setStops1(stops);
		setOptions1(options);

		const configureNotificationsAsync = async () => {
		const { granted } = await Notifications.requestPermissionsAsync();
		if (!granted) {
			return console.warn("Notification Permissions not granted!");
		}
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldPlaySound: true,
				shouldShowAlert: true,
				shouldSetBadge: false,
			}),
			});
		};
		configureNotificationsAsync();
	}, []);

	const sendNot = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: "Test Notification!",
				body: "This is a test.",
			},
			trigger: {
				type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: 1,
			},
		});
	};

	const [visible, setVisible] = useState(false); 
	return (
		<SafeAreaProvider>
			<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
				<SafeAreaView style={styles.main}>
					<Modal transparent={true} animationType="fade" visible={visible} onRequestClose={() => (setVisible(0))}>
					  <View style={styles.centeredView}>
						  <Text style={styles.modalText}>恭喜獲得以下獎品！</Text>
						<View style={styles.modalItem}>
							<Text style={styles.modalText2}>早餐兌換券</Text>
							<TouchableOpacity><Text style={styles.modalbtn}>取得</Text></TouchableOpacity>
						</View>
					  </View>
					</Modal>
					<Search options={options1} setSearchStop={setSearchStop} setDoSearch={setDoSearch}/>
					<Bus stops={stops1} routesInStop={routesInStop1} setVisible={setVisible}
						searchStop={searchStop} setDoSearch={setDoSearch} doSearch={doSearch}/>
					<Navbar not={sendNot}/>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</SafeAreaProvider>
	);
}

export default Home;
