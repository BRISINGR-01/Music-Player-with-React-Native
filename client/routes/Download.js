import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Animated } from "react-native";
import SharedUtilities from '../SharedUtilities';
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;
import { url } from "../../server/config.json";

function Loader() {
    const animation = {
        borderLeftColor: 'transparent'
    }

    let optionsAnim = new Animated.Value(0);
    Animated.timing(
      optionsAnim,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }
    ).start();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            paddingTop: '10%',
    
            display: 'flex',
            alignItems: 'center'
        },
        circle1: {
            borderColor: white,
            borderBottomLeftRadius: 'transparent',
            borderBottomRightRadius: 'transparent',
            borderTopLeftRadius: 'transparent',
        },
        circle2: {
            borderColor: white,
            borderBottomLeftRadius: 'transparent',
            borderBottomRightRadius: 'transparent',
            borderTopLeftRadius: 'transparent',
        },
        circle3: {
            borderColor: white,
            borderBottomLeftRadius: 'transparent',
            borderBottomRightRadius: 'transparent',
            borderTopLeftRadius: 'transparent',
        },
    });
    
    return ( 
        <View style={styles.container}>
        </View>
    )
}

export default function Download() {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function select(value) {
        setOptions([]);
        setIsLoading(true);
        fetch(`${url}/download/${value}`)
        .then(res => res.json()).then(res => {
            setIsLoading(false);
            if (res.error) throw new Error('A problem occured. The song file might be damaged!');
        })
        .catch(console.log);
    }

    function search({target: {value}}) {
        value = value.trim();
        if (!value) return;
        if (value.startsWith('https://www.youtube.com/watch?v=')) return fetch(`${url}/download/${value}`);

        setIsLoading(true);
        fetch(`${url}/search/${value}`).then(result => result.json()).then(res => {
            setOptions(res.map(el => {return {...el, title: decodeURI(el.title)}}));// sometimes the title might have %20 instead of a ' ' (space)
            setIsLoading(false);
        })
        .catch(console.error);
    }

    const styles = StyleSheet.create({
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
    
            paddingLeft: '1em',
            paddingRight: '1em',
            paddingTop: '0.5em',
            paddingBottom: '0.5em',
        },
    });

    return (
        <View style={styles.container}>
            <TextInput 
                onSubmitEditing={search} 
                autoFocus={true}
                placeholder="Insert a YT search or a link" 
                style={styles.input}
            />
            <View style={styles.optionsContainer}>
                {options.length !== 0 && options.map((el, i) => 
                    <Pressable key={i} onPress={() => select(el.url)}>
                        <View style={styles.option}>
                            <Text style={{color:white}} children={el.title}></Text>
                        </View>
                    </Pressable>
                )}
            </View>  
            {
                isLoading && <Loader/>
            }
        </View>
    );    
}
