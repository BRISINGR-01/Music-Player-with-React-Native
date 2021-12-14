import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import SharedUtilities from '../../SharedUtilities';
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;
import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';

export default function Download() {
    function select(url) { 
        ytdl(url, { filter: 'audioonly' }).pipe()
    }
    function search(input) {
        if (input.startsWith('http')) {
            setOptions(input);
        } else {
            setOptions(ytSearch(input));
        }
    }
    const [options, setOptions] = useState([]);
    const options = [].map(el => {return () => (
        <Pressable onPress={() => select(el.url)}>
            <View style={style.option}>
                <Text>el.title</Text>
            </View>
        </Pressable>
    )});

    return (
        <View style={style.container}>
            <TextInput onTextInput={search} style={style.input}></TextInput>
            <View style={style.optionsContainer}>
                {options.map(el => 
                    <Pressable onPress={() => select(el.url)}>
                        <View style={style.option}>
                            <Text>el.title</Text>
                        </View>
                    </Pressable>
                )}
            </View>
        </View>
    );    
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        top: '10vh',
        width: '80%'
    },
    input: {
        width: '100%',
        borderColor: white,
        borderWidth: 2,

        backgroundColor: gray,
    },
    optionsContainer: {
        width: '100%',
    },
    option: {
        borderColor: white,
        borderWidth: 2,
        backgroundColor: gray,
    },
});