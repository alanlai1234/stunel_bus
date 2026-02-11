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
		if(props.doSearch == false) return;
		const fetch = async() => {
			let tmp = []
			let ids = new Set();
			if(props.searchStop in stops){
				for(const route of routesInStop[stops[props.searchStop]]){
					const ret = await track.getStop(stops[props.searchStop], route[0], route[1]);
					const delay = (ms) => new Promise((res) => setTimeout(res, ms));
					for(const val of Object.values(ret)[0]){
						if(val.eta !== "no vehicles" && !ids.has(val.busName)){
							tmp.push([data.routes[route[0]][0], val.eta, data.routes[route[0]][1], val.busName]);
							ids.add(val.busName);
						}
					}
					await delay(200);
				}
			}
			try{
				tmp.sort(cmp);
			}
			catch(err){
				console.log(err);
			}
			//console.log(tmp);
			setBuses(tmp);
			props.setDoSearch(false);
		}
		fetch();
	}, [props.doSearch])

	const BusItem = (props) => {
		return(
			<TouchableOpacity>
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
						return <BusItem key={item[3]} line={item[0]} color={item[2]} time={item[1]} id={item[3]}/>
				})}
			</ScrollView>
		</View>
		</>
	);
}

export default Bus;
