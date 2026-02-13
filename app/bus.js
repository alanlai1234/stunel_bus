import React, { useState, useEffect, useRef } from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import * as Notifications from "expo-notifications";
import styles from './styles.js'
import tracking from './passiogo.js';
import data from './busInfo.json';

const track = new tracking();

function cmp(a, b){
	if(a[1] == b[1]) return 0;
	if(a[1] == 'arriving') return -1;
	if(b[1] == 'arriving') return 1;
	if(a[1] == 'less than 1 min') return -1;
	if(b[1] == 'less than 1 min') return 1;
	let aa = a[1].match(/^[^\d]*(\d+)/)[0];
	let bb = b[1].match(/^[^\d]*(\d+)/)[0];
	//console.log(aa, bb, a[1], b[1]);
	return Number(aa) - Number(bb);
}

const Bus = (props) => {
	const {stops, routesInStop} = props;
	const actionSheetRef = useRef(null);
	const [buses, setBuses] = useState(() => []);
	const [sheetList, setSheetList] = useState(() => []);
	const [sheetBusPos, setSheetBusPos] = useState(0);
	useEffect(() => {
		if(props.doSearch == false || props.searchStop !="84 Prospect Ave") return;
		const fetch = async() => {
			let tmp = [["Route 27", "arriving", "#ff00ff", "1010"]];
			setBuses(tmp);
			props.setDoSearch(false);
		}
		fetch();
	}, [props.doSearch])

	const BusItem = (props) => {
		return(
			<TouchableOpacity onPress={() => {props.setVisible(true)}}>
				<View style={styles.busitem}>
					<View style={[styles.busbar, {backgroundColor: props.color}]}></View>
					<View style={{flex: 20}}>
						<Text style={{color: 'white'}}>{props.line}</Text>
						<Text style={{color: 'white'}}>{props.id}</Text>
					</View>
					<Text style={{color: 'white', alignSelf: 'flex-end'}}>{props.time}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<>
		<View style={{flex: 1, paddingTop: 8}}>
			<ScrollView style = {{flexGrow: 1}}>
				{buses.map((item, index) => {

					if(item[1] !== "no vehicles")
						return <BusItem key={item[3]} line={item[0]} color={item[2]} time={item[1]} id={item[3]} setVisible={props.setVisible}/>
				})}
			</ScrollView>
		</View>
		</>
	);
}

export default Bus;
