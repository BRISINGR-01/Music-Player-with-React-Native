import React from 'react';
import { Text, View, Image, StyleSheet, Animated, Pressable, Dimensions } from 'react-native'
import SharedUtilities from "./SharedUtilities";
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;





function Icon({ setOpen, unit }) {
  const style = StyleSheet.create({
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
      backgroundColor: blue,
      width: unit,
      height: unit / 2,
      borderTopLeftRadius: '100%',
    },
    SideMenuIconDown: {
      position: 'absolute',
      top: unit,
      backgroundColor: darkgray,
      width: unit / 2,
      height: unit,
      borderBottomRightRadius: '100%',
    },
    SideMenuIconDownCover: {
      position: 'absolute',
      top: unit,
      backgroundColor: blue,
      width: unit / 2,
      height: unit,
      borderTopLeftRadius: '100%',
      borderBottomRightRadius: '90%',
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
    <Pressable onPress={() => setOpen(true)} style={style.SideMenuIconCenter}>
      <Image style={style.image} source={require('F:\\ALEX\\VSC\\Music Player\\MusicPlayerMobile\\music logo.jpg')}/>
      <View style={style.SideMenuIconDown}></View>
      <View style={style.SideMenuIconLeft}></View>
    </Pressable>
      <View style={style.SideMenuIconDownCover}></View>
      <View style={style.SideMenuIconLeftCover}></View>
  </>
  );// outside so that it doesn't activate the touch
}

function SideBar({ setOpen, setCurrentPage, unit }) {
  unit = unit / 2;
  const style = StyleSheet.create({
    container: {
      backgroundColor: gray,
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
    curve: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      backgroundColor: blue,
    },

    CurveLeft: {
      height: 2 * unit,
      width:'50%',
      backgroundColor: darkgray,
    },
    CurveLeftCover: {
      height: unit,
      width: '50%',
      marginTop: - unit,
      backgroundColor: blue,
      borderTopLeftRadius: '100%',
    },
    CurveRight: {
      height: unit,
      width: '50%',
      backgroundColor: darkgray,
      borderBottomRightRadius: '100%'
    },
    CurveRightCover: {
      height: unit,
      width: '50%',
      zIndex: 20,
      backgroundColor: blue,
      borderBottomRightRadius: '100%'
    },
  });
  function OptionsText({children, route}) {
      return (
          <Pressable onPress={() => {setOpen(false);setCurrentPage(route);}} style={style.buttonContainer}>
            <View style={style.begin}/>
            <Text style={style.buttonText}>
              {children}
            </Text>
          </Pressable>
      )
  }


  return (
    <View style={style.container}>
        <OptionsText route={'Home'}>Home</OptionsText>
        <OptionsText route={'Playlists'}>Playlists</OptionsText>
        <OptionsText route={'Artists'}>Artists</OptionsText>
        <OptionsText route={'Download'}>Add song</OptionsText>
        <OptionsText route={'Settings'}>Settings</OptionsText>
        <View style={style.curve}>
          <View style={style.CurveLeft}/>
          <View style={style.CurveRight}/>
          <View style={style.CurveLeftCover}/>
        </View>
    </View>
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
        duration: 500,
        useNativeDriver: false
      }
    ).start();    
    Animated.timing(
      optionsAnim,
      {
        toValue: 2 * unit,
        delay: 250,
        duration: 400,
        useNativeDriver: false
      }
    ).start();
  } else if (open === false) {
    iconAnim = new Animated.Value(-2 * unit);
    optionsAnim = new Animated.Value(2 * unit);
    Animated.timing(
      optionsAnim,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }
    ).start();
    Animated.timing(
      iconAnim,
      {
        toValue: 0,
        delay: 100,
        duration: 500,
        useNativeDriver: false
      }
    ).start()
  } else {
    iconAnim = 0;
    optionsAnim = 0;
  }
  return (<>
    <Animated.View style={{width: optionsAnim}}>
      <SideBar unit={unit} setOpen={setOpen} setCurrentPage={setCurrentPage}/>
    </Animated.View>
    <Animated.View style={{top: iconAnim, left: iconAnim}}>
      <Icon unit={unit} setOpen={setOpen}/>
    </Animated.View>
  </>)
}