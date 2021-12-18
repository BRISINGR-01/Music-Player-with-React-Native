import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import SharedUtilities from '../SharedUtilities';
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;
import { url } from "../../config.json";


export default function Download() {
    const [options, setOptions] = useState([]);

    function select(value) {
        setOptions([]);
        fetch(`${url}/download/${value}`)
        .then(res => res.json()).then(res => {
            if (res.error) throw new Error('A problem occured. The song file might be damaged!');
        })
        .catch(console.log);
    }

    function search({target: {value}}) {
        value = value.trim();
        if (!value) return;
        if (value.startsWith('https://www.youtube.com/watch?v=')) return fetch(`${url}/download/${value}`);

        fetch(`${url}/search/${value}`).then(result => result.json()).then(res => {
            setOptions(res.map(el => {return {...el, title: decodeURI(el.title)}}));// sometimes the title might have %20 instead of a ' ' (space)
        })
        .catch(console.error);
    }

    return (
        <View style={style.container}>
            <TextInput 
                onSubmitEditing={search} 
                autoFocus={true}
                placeholder="Insert a YT search or a link" 
                style={style.input}
            />
            <View style={style.optionsContainer}>
                {options.length !== 0 && options.map((el, i) => 
                    <Pressable key={i} onPress={() => select(el.url)}>
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

        width: '80%'
    },
    input: {
        width: '100%',
        borderColor: white,
        borderRadius: 10,
        borderWidth: 2,
        
        marginTop: '10vh',
        marginBottom: '1vh',
        paddingLeft: '1vh',
        paddingRight: '1vh',
        paddingTop: '0.5vh',
        paddingBottom: '0.5vh',
        

        color: white,
        backgroundColor: gray,
    },
    optionsContainer: {
        width: '100%',
        borderColor: white,
        borderWidth: 1,
        backgroundColor: lightgray,
    },
    option: {
        borderColor: white,
        borderWidth: 1,
        backgroundColor: lightgray,

        paddingLeft: '1vh',
        paddingRight: '1vh',
        paddingTop: '0.5vh',
        paddingBottom: '0.5vh',
    },
});