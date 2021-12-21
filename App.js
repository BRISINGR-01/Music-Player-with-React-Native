import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import routes from './client/routes/index.js';
import SideMenu from './client/SideMenu.js';
import settings from './server/settings.json';
import { url } from './server/config.json';
import messages from './client/userMessages/messages.json'
import SharedUtilities from './client/SharedUtilities.js';
import UserMessage from './client/userMessages/UserMessage.js';
const { black, blue } = SharedUtilities.style;
import { AsyncStorage } from 'react-native';
    
const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}



export default function App() {
  const [open, setOpen] = useState(2);// '2' -> in order to show it hasn't been opened yet
  const [currentPage, setCurrentPage] = useState('Download');
  const [userMessage, setUserMessage] = useState({text: false});

  const [windowW, setW] = useState(Dimensions.get('window').width);
  const [windowH, setH] = useState(Dimensions.get('window').height);
  let unit = (windowH + windowW) / 20;

  Dimensions.addEventListener('change', (change) => {
    setW(change.window.width);
    setH(change.window.height);
  });

  if (settings.promptUserToDownloadSongs) {
    fetch(`${url}/promptToDownload`).then(res => res.json()).then(async res => {
      console.log(res);
      if (res.length) {
        // prompt user
        setUserMessage({
          text: messages.promptToDownload,
          arr: res.map(el => '· ' + el.title),
          type: ['yes', 'no']
        });
        return;
        return new Promise((resolve, reject) => {













        }).then(flag => {
          if (!flag) return;
          
          res = JSON.stringify(res.map(el => el.url));
          fetch(`${url}/downloadAll`, {
            method: 'POST',
            body: res
          })
          .catch(console.log);
        })
        //prompt user to download all songs which aren't downloaded on the current device, but are in the database
      }
    })
    .catch(console.log)
  }
  const Body = routes[currentPage];

  return (
    <View style={style.app}>
        <SideMenu unit={unit} open={open} setOpen={setOpen} setCurrentPage={setCurrentPage}/>
        {userMessage.text && <UserMessage body={userMessage}/>}
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