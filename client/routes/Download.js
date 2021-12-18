import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import SharedUtilities from '../SharedUtilities';
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;


export default function Download() {
    function select(url) { 
    }
    function search(input) {
        if (input.startsWith('http')) {
            setOptions(input);
        } else {
            setOptions((input));
        }
    }
    const [options, setOptions] = useState([{title:'hi'}]);

    return (
        <View style={style.container}>
            <TextInput onTextInput={search} style={style.input}></TextInput>
            <View style={style.optionsContainer}>
                {options.length !== 0 && options.map(el => 
                    <Pressable onPress={() => select(el.url)}>
                        <View style={style.option}>
                            <Text style={{color:white}} children={el.title}></Text>
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