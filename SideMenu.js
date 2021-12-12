import React from 'react';
import { Text, View, Image, StyleSheet, Animated, Pressable, Dimensions } from 'react-native'
import SharedUtilities from "./SharedUtilities";
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;



const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    height: '100vh',
  },  
  options: {
      borderColor: black,
      borderRightWidth: 4,

      backgroundColor: darkgray,

      width: '20%',
      height: '10vh'
  },
  buttonContainer: {
    width: '100%',
    maxHeight: 30,
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'row',

    borderColor: black,
    borderBottomWidth: 2,
    backgroundColor: gray,
  },
  buttonText: {
    color: blue,
    padding: 4,
    paddingLeft: 8,
    maxHeight: 30,
  },
  begin: {
    width: '2.5%',
    height: '100%',
    backgroundColor: blue
  },
  
});

function Icon({ setOpen, unit }) {
  const iconStyle = StyleSheet.create({
    SideMenuIconCenter: {
      position: 'absolute',
      backgroundColor: darkgray,
      width: unit,
      height: unit,
      borderBottomRightRadius: '50%'
    },
    SideMenuIconLeft: {
      position: 'absolute',
      left: unit,
      backgroundColor: darkgray,
      width: unit,
      height: unit / 2,
    },
    SideMenuIconLeftCover: {
      position: 'absolute',
      left: unit,
      backgroundColor: black,
      width: unit,
      height: unit / 2,
      borderTopLeftRadius: '100%'
    },
    SideMenuIconDown: {
      position: 'absolute',
      top: unit,
      backgroundColor: darkgray,
      width: unit / 2,
      height: unit,
    },
    SideMenuIconDownCover: {
      position: 'absolute',
      top: unit,
      backgroundColor: black,
      width: unit / 2,
      height: unit,
      borderTopLeftRadius: '100%',
    },
    image: {
      position: 'absolute',
      top: - unit / 6,
      left: - unit / 6,
      width: unit,
      height: unit,
      borderRadius: 70,
    },
  })
  return (
  <>
    <Pressable onPress={() => setOpen(true)} style={iconStyle.SideMenuIconCenter}>
      <Image style={iconStyle.image} source={require('F:\\ALEX\\VSC\\Music Player\\MusicPlayerMobile\\music logo.jpg')}/>
      <View style={iconStyle.SideMenuIconDown}></View>
      <View style={iconStyle.SideMenuIconLeft}></View>
    </Pressable>
      <View style={iconStyle.SideMenuIconDownCover}></View>
      <View style={iconStyle.SideMenuIconLeftCover}></View>
  </>
  );// outside so that it doesn't activate the touch
}


function OptionsText({children, onPress, setOpen}) {
    function press() {
      setOpen(false);
      onPress();
    } 
    return (
        <Pressable onPress={press} style={style.buttonContainer}>
          <View style={style.begin}/>
          <Text style={style.buttonText}>
            {children}
          </Text>
        </Pressable>
    )
}



export default function SideMenu({ open, setOpen, setCurrentPage, unit }) {
  let iconAnim, optionsAnim;
  
  if (open === true) {
    iconAnim = new Animated.Value(0);
    optionsAnim = new Animated.Value(0);
    Animated.timing(
      iconAnim,
      {
        toValue: - 2 * unit,
        duration: 1000,
        useNativeDriver: false
      }
    ).start(() =>
      Animated.timing(
        optionsAnim,
        {
         toValue: 2 * unit,
          duration: 500,
          useNativeDriver: false
        }
      ).start()
    );    
  } else if (open === false) {
    iconAnim = new Animated.Value(-2 * unit);
    optionsAnim = new Animated.Value(2 * unit);
    Animated.timing(
      optionsAnim,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }
    ).start(() =>
      Animated.timing(
        iconAnim,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }
      ).start()
    );
  } else {
    iconAnim = 0;
    optionsAnim = 0;
  }
  return (<>
    <Animated.View style={{width: optionsAnim}}>
      <View style={style.container}>
        <OptionsText setOpen={setOpen} onPress={() => setCurrentPage('Home')}>Home</OptionsText>
        <OptionsText setOpen={setOpen} onPress={() => setCurrentPage('Playlists')}>Playlists</OptionsText>
        <OptionsText setOpen={setOpen} onPress={() => setCurrentPage('Artists')}>Artists</OptionsText>
        <OptionsText setOpen={setOpen} onPress={() => setCurrentPage('Download')}>Add song</OptionsText>
        <OptionsText setOpen={setOpen} onPress={() => setCurrentPage('Settings')}>Settings</OptionsText>
      </View>
      <Curve></Curve>
    </Animated.View>
    <Animated.View style={{top: iconAnim, left: iconAnim}}>
      <Icon unit={unit} setOpen={setOpen}/>
    </Animated.View>
  </>)
}
