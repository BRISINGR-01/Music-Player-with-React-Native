import React, { useState } from 'react'
import { Pressable, StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { Audio } from 'expo-av';
import { url } from '../../server/config.json'
import { palette, messages } from '../SharedUtilities';
const { blue, darkgray, gray } = palette;

Audio.setAudioModeAsync({
    staysActiveInBackground: true,
}).catch(console.log);



function PlayBtn({ sound, unit, setIsPaused, isPaused }) {
    const styles = StyleSheet.create({
        container: {
            width: unit,
            height: unit,
            borderRadius: '50%',
            backgroundColor: darkgray,

            display: 'flex',
            flexDirection: 'row',
            gap: 8.5,   
            alignItems: 'center',
            justifyContent: 'center',
        },
        arrow: {
            width: 0,
            height: 0,
            transform: [{translateX: '10%'}, {scale: '70%'}],

            borderBottomWidth: unit / 3,
            borderTopWidth: unit / 3,
            borderLeftWidth: unit * 2 / 3,

            borderColor: 'transparent',
            borderLeftColor: blue,
        },
        rectangle: {
            height: '40%',
            width: '12%',
            backgroundColor: blue,

        }
    });
    async function onPress() {
        setIsPaused(!isPaused);
        
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
            sound.pauseAsync();
        } else {
            sound.playAsync();
        }
    }
    
    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>{
                isPaused ? 
                    <View style={styles.arrow}/> :
                    <>
                        <View style={styles.rectangle}/>
                        <View style={styles.rectangle}/>
                    </>
            }</View>
        </Pressable>
    )
}


function NextSong({ unit, next }) {
    const styles = StyleSheet.create({
        container: {
            width: unit,
            height: unit,
            borderRadius: '50%',
            backgroundColor: gray,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        front: {
            zIndex: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{translateX: '45%'}],
        },
        back: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{translateX: '-50%'}],
        },
        arrowFront1: {
            width: 0,
            height: 0,
            transform: [{translateX: '20%'}, {scale: '70%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderLeftWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderLeftColor: blue,
        },
        arrowFront2: {
            width: 0,
            height: 0,
            transform: [{translateX: '-30%'}, {scale: '70%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderLeftWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderLeftColor: blue,
        },
        arrowBack1: {
            width: 0,
            height: 0,
            transform: [{translateX: '20%'}, {scale: '150%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderLeftWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderLeftColor: darkgray,
        },
        arrowBack2: {
            width: 0,
            height: 0,
            transform: [{translateX: '-30%'}, {scale: '150%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderLeftWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderLeftColor: darkgray,
        }
    });
    return (
        <Pressable onPress={next} style={styles.container}>
            <View style={styles.front}>
                <View style={styles.arrowFront1}/>
                <View style={styles.arrowFront2}/>
            </View>
            <View style={styles.back}>
                <View style={styles.arrowBack1}/>
                <View style={styles.arrowBack2}/>
            </View>
        </Pressable>
    )
}
function PreviousSong({ unit, prev }) {
    const styles = StyleSheet.create({
        container: {
            width: unit,
            height: unit,
            borderRadius: '50%',
            backgroundColor: gray,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        front: {
            zIndex: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{translateX: '55%'}],
        },
        back: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{translateX: '-50%'}],
        },
        arrowFront1: {
            width: 0,
            height: 0,
            transform: [{translateX: '20%'}, {scale: '70%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderRightWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderRightColor: blue,
        },
        arrowFront2: {
            width: 0,
            height: 0,
            transform: [{translateX: '-30%'}, {scale: '70%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderRightWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderRightColor: blue,
        },
        arrowBack1: {
            width: 0,
            height: 0,
            transform: [{translateX: '20%'}, {scale: '150%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderRightWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderRightColor: darkgray,
        },
        arrowBack2: {
            width: 0,
            height: 0,
            transform: [{translateX: '-30%'}, {scale: '150%'}],

            borderBottomWidth: unit / 5,
            borderTopWidth: unit / 5,
            borderRightWidth: unit * 2 / 5,

            borderColor: 'transparent',
            borderRightColor: darkgray,
        }
    });
    return (
        <Pressable onPress={prev} style={styles.container}>
            <View style={styles.front}>
                <View style={styles.arrowFront1}/>
                <View style={styles.arrowFront2}/>
            </View>
            <View style={styles.back}>
                <View style={styles.arrowBack1}/>
                <View style={styles.arrowBack2}/>
            </View>
        </Pressable>
    )
}

function Edit({ unit }) {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: unit / 10,
            height: '100%',
        },
        img: {
            width: unit,
            height: unit,
        }
    });

    function onPress() {
        
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.img} source={require('../../assets/gear-1.1s-200px.svg')}/>
        </Pressable>
    )
}

function Loop({ unit, sound, isLooping, setIsLooping }) {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'flex-end',
            height: '100%',
            paddingBottom: unit / 5
        },
        selected: {
            borderRadius: '50%',
            backgroundColor: isLooping ? darkgray : 'transparent'
        },
        img: {
            width: unit / 1.5,
            height: unit / 1.5,
        }
    })
    async function onPress() {
        await sound?.setIsLoopingAsync(!isLooping);
        setIsLooping(!isLooping);
    }   
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.selected}>
                <Image style={styles.img} source={require('../../assets/arrow.svg')}/>
            </View>
        </Pressable>
    )
}



function Length({ setProgress, progress, sound, isPaused, windowW, currnetSec, totalSec }) {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '8px',
            borderColor: darkgray,
            borderTopWidth: 2,
            borderBott0mWidth: 2,
            backgroundColor: darkgray,
        },
        progress: {
            width: (progress || 0) + '%',
            height: '100%',
            backgroundColor: blue,
        },
        numbersContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1,
            paddingLeft: 8,
            paddingRight: 8
        },
        text: {
            color: blue,
        }
    });
   

    async function onPress(e) {
        progress = 100 * e.touchHistory.touchBank[0].currentPageX / windowW
        setProgress(progress);
        if (!sound) return;
        
        let { durationMillis } = await sound.getStatusAsync();
        await sound.setPositionAsync(
            durationMillis * progress / 100
        );
    }
    function formatMillisec(ms) {
        let s = Math.floor((ms || 0) / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        
        s = s % 59;
        s = s < 10 ? `0${s}` : s;
        m = m % 59
        m = m < 10 ? `0${m}` : m;
        h = h < 10 ? `0${h}` : h;

        if (h === '00') return `${m}:${s}`;
        return `${h}:${m}:${s}`;
    }

    return (
        <View onStartShouldSetResponder={(e) => {
                sound?.pauseAsync();// *
                onPress(e);
                return true; // this is required so that it becomes a responder in order for the onResponderMove to work
            }} 
            onResponderRelease={() => !isPaused && sound?.playAsync()}// * these two are so that the music stops during sliding
            onResponderMove={onPress}>

            <View style={styles.container}>
                <View style={styles.progress}/>
            </View>
            <View style={styles.numbersContainer}>
                <Text style={styles.text}>{formatMillisec(currnetSec)}</Text>
                <Text style={styles.text}>{formatMillisec(totalSec)}</Text>
            </View>
        </View>
    )
}

export default function Bar({ Playlist, setUserMessage }) {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            backgroundColor: gray,
            alignSelf: 'flex-end'
        },
        buttonsContainer: {
            width: '100%',
            height: '100%',
            
            // backgroundColor: white,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 20,
        }
    });

    const [windowW, setW] = useState(Dimensions.get('window').width);
    const [windowH, setH] = useState(Dimensions.get('window').height);
    Dimensions.addEventListener('change', change => {
        setW(change.window.width);
        setH(change.window.height);
    });
    const [progress, setProgress] = useState(0);
    const [sound, setSound] = useState();
    const [isLooping, setIsLooping] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [currnetSec, setCurrentSec] = useState('');
    const [totalSec, setTotalSec] = useState(0);
    const [currentSong, setCurrentSong] = useState(Playlist.content[0]);


    let unit = windowW / 5
    if (windowW > windowH) unit = windowH / 8;
    if (windowW < windowH) unit = windowW / 5;

    if (unit > windowH / 8) unit = windowH / 8    

    
    async function play(song) {
        async function warn() {
            sound.setOnPlaybackStatusUpdate(() => {});// when the .mp3 is broken, this loops non-stop even when a new song is loaded and played
            return new Promise((resolve, reject) => {

                // ask to delete invalid file
                setUserMessage({
                    ...messages.invalidFile,
                    callback: ans => {
                        setUserMessage(null);
                        setCurrentSong(Playlist.next());
                        resolve(ans);
                    }
                });
        
            }).then(ans => {
                if (ans === 'Yes') 
                    fetch(`${url}/delete/${song}`, {
                        method: 'DELETE',
                    });
            });
        }
        
        const { sound } = await new Audio.Sound.createAsync(
            require(`../../music/${song}.mp3`),
            { shouldPlay: !isPaused },
            status => {
                if (status.error) return warn();
                if (status.positionMillis) setCurrentSec(status.positionMillis);
                if (status.durationMillis) setProgress(100 * status.positionMillis / status.durationMillis);
                if (status.didJustFinish) setCurrentSong(Playlist.next());
            }// it triggers everytime the status is changed
        );
        setSound(sound);    
    }


 
    React.useEffect(() => {
        return sound 
        ?  () => {
                sound.unloadAsync();
            }
        : undefined;
    }, [sound]);

    React.useEffect(() => {
        play(currentSong);// runs by first render => the first song is loaded
    }, [currentSong])
    
    

    return (
        <View style={styles.container}>
            <Length 
                sound={sound}
                windowW={windowW}
                isPaused={isPaused} 
                progress={progress} 
                setProgress={setProgress}
                currnetSec={currnetSec}
                totalSec={totalSec}
            />
            <View style={styles.buttonsContainer}>
                <Loop 
                    sound={sound}
                    unit={unit}
                    isLooping={isLooping}
                    setIsLooping={setIsLooping}
                />
                <PreviousSong unit={unit} prev={() => {
                    setIsLooping(false);
                    setCurrentSong(Playlist.prev());
                }}/>
                <PlayBtn 
                    sound={sound}
                    unit={unit} 
                    setIsPaused={setIsPaused} 
                    isPaused={isPaused}
                />
                <NextSong unit={unit} next={() => {
                    setIsLooping(false);
                    setCurrentSong(Playlist.next());
                }}/>
                <Edit unit={unit}/>
            </View>
        </View>
    )
}
