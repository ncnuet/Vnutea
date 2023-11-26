import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from './screens/homepage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/Onboarding';
import { RootStackParamList } from './types/routing';
import { HomeStackNavigator } from './ContactStackNavigator';
import StudentScreen from './screens/StudentHome/StudentScreen';
import SplashScreen from 'react-native-splash-screen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabApp = createMaterialBottomTabNavigator();

function MainRootApp() {
  return (
    <TabApp.Navigator>
      <TabApp.Screen name="Homess" component={HomeStackNavigator} />
      <TabApp.Screen name="Settings" component={StudentScreen} />
    </TabApp.Navigator>
  )
}

function App(): JSX.Element {
  const [isAppFirstLaunched, setAppFirstLaunched] = React.useState<boolean | null>(null);

  useEffect(() => {
    SplashScreen.hide();
  })

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('isAppFirstLaunched');
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');

      if (appData) {
        // TODO: change this to false
        setAppFirstLaunched(true);
      } else {
        setAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'marked')
      }
    })();
  }, []);

  return (
    isAppFirstLaunched !== null
      ? <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunched &&
            (<RootStack.Screen name='OnBoarding' component={Onboarding} />)}
          <RootStack.Screen name="MainRootApp" component={MainRootApp} />
        </RootStack.Navigator>
      </NavigationContainer>
      : <></>
  )
}

export default App;
