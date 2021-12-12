import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import routes from './routes/index.js';
import SideMenu from './SideMenu.js';
import SharedUtilities from './SharedUtilities.js';
const { black, blue } = SharedUtilities.style;




export default function App() {
  const [open, setOpen] = useState(2);// to show it hasn't been opened yet
  const [currentPage, setCurrentPage] = useState('Home');// to show it hasn't been opened yet

  const [windowW, setW] = useState(Dimensions.get('window').width);
  const [windowH, setH] = useState(Dimensions.get('window').height);
  let unit = (windowH + windowW) / 20;


  Dimensions.addEventListener('change', (change) => {
    setW(change.window.width);
    setH(change.window.height);
  })

  const Body = routes[currentPage];

  return (
    <View style={style.app}>
        <SideMenu unit={unit} open={open} setOpen={setOpen} setCurrentPage={setCurrentPage}/>
        <TouchableWithoutFeedback onPress={() => open !== 2 && setOpen(false)}>
            <View style={style.body}>
              <Body/>
            </View>
        </TouchableWithoutFeedback>
    </View>
  );
}


const style = StyleSheet.create({
  app: {
    display: 'flexbox',
    flexDirection: 'row',
  },
  body: { 
    position: 'absolute',
    width:'100vw', 
    height:'100vh', 
    backgroundColor: blue,
    zIndex: -1,
  }
})