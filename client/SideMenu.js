import React from 'react';
import { Text, View, Image, StyleSheet, Animated, Pressable, Dimensions } from 'react-native'
import SharedUtilities from "./SharedUtilities";
const { black, white, blue, gray, lightgray, darkgray } = SharedUtilities.style;

function Icon({ setOpen, unit }) {
  const styles = StyleSheet.create({
    SideMenuIconCenter: {
      position: 'absolute',
      backgroundColor: darkgray,
      width: unit,
      height: unit,
      borderBottomRightRadius: '50%'
    },
    SideMenuIconRight: {
      position: 'absolute',
      left: unit,
      backgroundColor: darkgray,
      width: unit,
      height: unit / 2,
      borderBottomRightRadius: '100%',
    },
    SideMenuIconRightCover: {
      position: 'absolute',
      left: unit,
      backgroundColor: black,
      width: unit,
      height: unit / 2,
      borderTopLeftRadius: '100%',
      borderBottomRightRadius: '90%',
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
      backgroundColor: black,
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
    <Pressable onPress={() => setOpen(true)} style={styles.SideMenuIconCenter}>
      <Image style={styles.image} source={require('../assets/music logo.jpg')}/>
      <View style={styles.SideMenuIconDown}></View>
      <View style={styles.SideMenuIconRight}></View>
    </Pressable>
      <View style={styles.SideMenuIconDownCover}></View>
      <View style={styles.SideMenuIconRightCover}></View>
  </>
  );// the last 2 Views are outside of the Pressable, so that they don't activate the touch
}

function SideBar({ setOpen, setCurrentPage, unit }) {
  unit = unit / 2;
  const styles = StyleSheet.create({
    container: {
      zIndex: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: white,
      width: '150%',
      height: '150%',
    },
    optionsContainer: {
      zIndex: 1,
      width: '75%',
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
    CurveBottomContainer: {
      marginTop: '-100%'
    },
    CurveLeftBottom: {
      height: 2 * unit,
      width:'50%',
      backgroundColor: darkgray,
    },
    CurveLeftCoverBottom: {
      height: unit,
      width: '50%',
      marginTop: - unit,
      backgroundColor: black,
      borderTopLeftRadius: '100%',
    },
    CurveRightBottom: {
      height: unit,
      width: '50%',
      backgroundColor: darkgray,
      borderBottomRightRadius: '100%'
    },
    
    CurveRightContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      // marginLeft: 4 * unit,
      // marginTop: -6 * unit,
    },
    CurveTopRight: {
      height: '50%',
      width: '100%',
      backgroundColor: darkgray,
    },
    CurveTopRightCover: {
      height: '50%',
      width: '50%',
      marginTop: -2 * unit,
      marginleft: -2 * unit,
      backgroundColor: black,
      borderTopLeftRadius: '100%',
    },
    CurveBottomRight: {
      // marginLeft: unit,
      height: '50%',
      width: '50%',
      backgroundColor: darkgray,
      borderBottomRightRadius: '100%'
    },
  });
  function OptionsText({children, route}) {
      return (
          <Pressable onPress={() => {setOpen(false);setCurrentPage(route);}} style={styles.buttonContainer}>
            <View style={styles.begin}/>
            <Text style={styles.buttonText}>
              {children}
            </Text>
          </Pressable>
      )
  }


  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>  
        <OptionsText route={'Home'}>Home</OptionsText>
        <OptionsText route={'Playlists'}>Playlists</OptionsText>
        <OptionsText route={'Artists'}>Artists</OptionsText>
        <OptionsText route={'Download'}>Add song</OptionsText>
        <OptionsText route={'Tags'}>Tags</OptionsText>
        <OptionsText route={'Settings'}>Settings</OptionsText>
      </View>
      <View style={styles.CurveBottomContainer}>
        <View style={styles.CurveLeftBottom}/>
        <View style={styles.CurveRightBottom}/>
        <View style={styles.CurveLeftCoverBottom}/>
      </View>
      <View style={styles.CurveContainer}>
        <View style={styles.CurveLeftBottom}/>
        <View style={styles.CurveRightBottom}/>
        <View style={styles.CurveLeftCoverBottom}/>
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