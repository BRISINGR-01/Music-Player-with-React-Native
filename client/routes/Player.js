import React from 'react'
import { StyleSheet, View } from 'react-native'

import Visualizer from '../player/Visualizer';
import Carousel from '../player/Carousel';
import Bar from '../player/Bar';

export default function Player({ Playlist, setUserMessage }) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.Vc}>
                    <Visualizer/>
                    <Carousel Playlist={Playlist}/>
                </View>
                <Bar Playlist={Playlist} setUserMessage={setUserMessage}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    Vc: {
        width: '100%',
        flexGrow: 1,
    }
});