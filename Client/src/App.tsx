import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Chat from "./chat/chat"

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Chat />
    </SafeAreaView>
  );
}

export default App;
