import React, { useState, useRef } from 'react';
import {View, Text, Animated, Pressable} from 'react-native';
import styles from './styles.js'
import Fontisto from '@expo/vector-icons/Fontisto';

const Navbar = (props) => {
	const animBtn = useRef(new Animated.Value(1)).current;
	const release = () => {
		props.not();
		Animated.timing(animBtn, {
		  toValue: 1,
		  duration: 150,
		  useNativeDriver: true,
		}).start();
	}
	const press = () => {
		Animated.timing(animBtn, {
		  toValue: 0.9,
		  duration: 150,
		  useNativeDriver: true,
		}).start();
	}
	return (
		<View style={styles.navbar}>
			<View style={styles.navbarItem}></View>
			<View style={styles.navbarItem}>
				<Pressable onPressIn={press} onPressOut={release}>
					<Animated.View
					style={[styles.addbtn, {transform: [{scale: animBtn}]}]}>
						<Fontisto name="plus-a" size={24} color="white" />
					</Animated.View>
				</Pressable>
			</View>
			<View style={styles.navbarItem}></View>
		</View>
	);
}

export default Navbar;
