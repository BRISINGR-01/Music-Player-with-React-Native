import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import routes from './client/routes/index.js';
import SideMenu from './client/SideMenu.js';
import settings from './settings.json';
import { url } from './config.json';
import SharedUtilities from './client/SharedUtilities.js';
const { black, blue } = SharedUtilities.style;




export default function App() {
  const [open, setOpen] = useState(2);// '2' -> in order to show it hasn't been opened yet
  const [currentPage, setCurrentPage] = useState('Download');

  const [windowW, setW] = useState(Dimensions.get('window').width);
  const [windowH, setH] = useState(Dimensions.get('window').height);
  let unit = (windowH + windowW) / 20;

  Dimensions.addEventListener('change', (change) => {
    setW(change.window.width);
    setH(change.window.height);
  });

  if (settings.promptUserToDownloadSongs)
    fetch(`${url}/promptToDownload`).then(res => res.json()).then(res => {
      if (res.length) {
        // prompt user

        res = JSON.stringify(res.map(el => el.url));
        fetch(`${url}/downloadAll`, {
          method: 'POST',
          body: res
        })
        .catch(console.log)
        //prompt user to download all songs which aren't downloaded on the current device, but are in the database
      }
    })
    .catch(console.log)
  
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
    display: 'flex',
    alignItems: 'center',
    backgroundColor: blue,
    zIndex: -1,
  }
})