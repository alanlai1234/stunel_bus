import data from './busInfo.json';
import {useEffect} from 'react'

// data initialize
let stops = {};
let options = [];
for(const key in data.stops){
	stops[data.stops[key].name] = key;
	options.push(data.stops[key].name);
}
let routesInStop = {};
for(const stop in stops)
	routesInStop[stops[stop]] = [];
for(const key in data.routes){
	for(let i = 3;i < data.routes[key].length; ++i){
		if(data.routes[key][i][1] in routesInStop)
			routesInStop[data.routes[key][i][1]].push([key, data.routes[key][i][0]]);
	}
}

export {stops, options, routesInStop}
