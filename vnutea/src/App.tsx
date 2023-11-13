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

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

function App(): JSX.Element {
  // const [isAppFirstLaunched, setAppFirstLaunched] = React.useState<boolean | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     // await AsyncStorage.removeItem('isAppFirstLaunched');
  //     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
  //     console.log(appData);

  //     if (appData) {
  //       // TODO: change this to false
  //       setAppFirstLaunched(true);
  //     } else {
  //       setAppFirstLaunched(true);
  //       AsyncStorage.setItem('isAppFirstLaunched', 'marked')
  //     }
  //   })();
  // }, []);

  return (
    // isAppFirstLaunched !== null
    //   ? <NavigationContainer>
    //     <RootStack.Navigator screenOptions={{ headerShown: false }}>
    //       {/* Show onboarding screen in the first time */}
    //       {isAppFirstLaunched &&
    //         (<RootStack.Screen name='OnBoarding' component={Onboarding} />)}
    //       {/* Home Screen */}
    //       <RootStack.Screen name="StartScreen" component={ } />
    //     </RootStack.Navigator>
    //   </NavigationContainer>
    //   : <></>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Settings" component={StudentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
