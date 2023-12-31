import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList, StudentTabParamList} from './types/routing';
import {HomeStackNavigator} from './ContactStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Icon from 'react-native-vector-icons/Octicons';
import {SearchStackNavigator} from './screens/Search';
import {ChatStackNavigator} from './screens/NewChat';
import Profile from './screens/Profile';
import Settings from './screens/Settings';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabApp = createMaterialBottomTabNavigator<StudentTabParamList>();

function MainRootApp() {
  return (
    <TabApp.Navigator>
      <TabApp.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => <Icon name="home" size={16} color="#19253D" />,
        }}
      />

      <TabApp.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: () => <Icon name="search" size={16} color="#19253D" />,
        }}
      />

      <TabApp.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Icon name="rocket" size={16} color="#19253D" />,
        }}
      />

      <TabApp.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: () => <Icon name="chat" size={16} color="#19253D" />,
        }}
      />

      <TabApp.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarIcon: () => <Icon name="settings" size={16} color="#19253D" />,
        }}
      />
    </TabApp.Navigator>
  );
}

function App(): JSX.Element {
  const [isFirstLaunched, setFirstLaunched] = React.useState<boolean | null>(
    null,
  );

  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('isAppFirstLaunched');
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');

      if (appData) {
        // TODO: change this to false
        setFirstLaunched(true);
      } else {
        setFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'marked');
      }
    })();
  }, []);

  return isFirstLaunched !== null ? (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isFirstLaunched && (
          <RootStack.Screen name="OnBoarding" component={Onboarding} />
        )}
        <RootStack.Screen name="Login" component={Login}></RootStack.Screen>
        <RootStack.Screen name="MainRootApp" component={MainRootApp} />
      </RootStack.Navigator>
    </NavigationContainer>
  ) : (
    <></>
  );
}

export default App;
