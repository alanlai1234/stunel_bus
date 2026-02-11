import React, { useState, useRef } from 'react';
import {Animated, View, StyleSheet, TextInput, Text, Keyboard, Button, TouchableOpacity} from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import styles from './styles.js'

const Search = (props) => {
	const [searchText, setSearchText] = useState("");
	const {options} = props;
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [open, setOpen] = useState(0);
	const filterOptions = (text) => {
		setSearchText(text);
		setFilteredOptions(options.filter((option) => option.toLowerCase().includes(text.toLowerCase())));
	};
	const onOptionPress = (option) => {
		setSearchText(option);
		Keyboard.dismiss();
	};
	const animList = useRef(new Animated.Value(0)).current;
	const close = () => {
		Animated.timing(animList, {
		  toValue: 0,
		  duration: 100,
		  useNativeDriver: true,
		}).start();
		setOpen(0);
	}
	const openList = () => {
		setOpen(1);
		Animated.timing(animList, {
		  toValue: 1,
		  duration: 150,
		  useNativeDriver: true,
		}).start();
	}
	const pressSearch = () =>{
		props.setSearchStop(searchText);
		props.setDoSearch(true);
	}

	return (
		<>
		<View style={styles.input}>
			<TextInput
			onFocus={openList}
			value={searchText}
			onChangeText={filterOptions}
			onBlur={close}
			blurOnSubmit={true}
			style={{flex: 1, color: 'white'}}/>
			<TouchableOpacity onPress={pressSearch} style={styles.searchbtn}>
				<Fontisto name="search" size={24} color="grey" />
			</TouchableOpacity>
		</View>
		{!!open && (
		<View style={styles.dropdownList}>
			<Animated.ScrollView
			style={[{opacity: animList}]}
			borderColor= "000000"
			borderWidth= '0'
			backgroundColor= "#494961"
			keyboardShouldPersistTaps='handled'
			alwaysBounceHorizontal={false}
			>
			{filteredOptions.map((item) => {
				return(
					<TouchableOpacity key={item} onPress={() => onOptionPress(item)}>
						<Text style={styles.dropdownItem}>{item}</Text>
					</TouchableOpacity>
				);
			})}
			</Animated.ScrollView>
		</View>
		)}
		</>
	);
}

export default Search;
