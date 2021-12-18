import React from 'react'
import { StyleSheet, View } from 'react-native'

import Visualizer from './Visualizer';
import Carousel from './Carousel';
import Bar from './Bar';

export default function Player() {
    return (
        <View style={styles.container}>
            <Carousel/>
            <Visualizer/>
            <Bar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});