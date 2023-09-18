import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  });

  return (
    <SafeAreaView>
      <StatusBar />
    </SafeAreaView>
  );
}

export default App;
