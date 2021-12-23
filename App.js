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

export default function App() {
  const [open, setOpen] = useState(2);// '2' -> in order to show it hasn't been opened yet
  const [currentPage, setCurrentPage] = useState('Download');
  const [userMessage, setUserMessage] = useState(null);
  const [firstOpen, setFirstOpen] = useState(true);

  const [windowW, setW] = useState(Dimensions.get('window').width);
  const [windowH, setH] = useState(Dimensions.get('window').height);
  let unit = (windowH + windowW) / 20;

  Dimensions.addEventListener('change', (change) => {
    setW(change.window.width);
    setH(change.window.height);
  });
  if (firstOpen && settings.promptUserToDownloadSongs) {
    setFirstOpen(false);// tell that the app is already opened once
    fetch(`${url}/promptToDownload`).then(res => res.json()).then(async res => {
      console.log(res);
      if (res.length) {// res contains the songs as an array of [{title:..., url:...},...]
        return new Promise((resolve, reject) => {
          setUserMessage({// open user prompt
            text: messages.promptToDownload,
            arr: res.map(el => '· ' + el.title),
            btns: ['Yes', 'No'],
            callback: ans => {
              setUserMessage(null);// close user prompt
              if (ans === 'Yes') return resolve();
              reject();
            }
          });
        }).then(() => {
          res = JSON.stringify(res);
          fetch(`${url}/downloadAll`, {
            method: 'POST',
            body: res
          }).catch(console.log);
        });
        //prompt user to download all songs which aren't downloaded on the current device, but are in the database
      }
    }).catch(() => {});
  }
  const Body = routes[currentPage];

  return (
    <View style={style.app}>
        <SideMenu unit={unit} open={open} setOpen={setOpen} setCurrentPage={setCurrentPage}/>
        {userMessage && <UserMessage body={userMessage}/>}
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
    overflow: 'hidden',
    position: 'absolute',
    width:'100vw', 
    height:'100vh', 
    display: 'flex',
    alignItems: 'center',
    backgroundColor: black,
    zIndex: -1,
  }
})