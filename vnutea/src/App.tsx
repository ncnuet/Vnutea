import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, StudentTabParamList } from './types/routing';
import { HomeStackNavigator } from './ContactStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchStackNavigator } from './screens/Search';
import { ChatStackNavigator } from './screens/NewChat';
import { UserProvider } from './hooks/user.context';
import { ProfileNavigator } from './screens/NewProfile';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabApp = createMaterialBottomTabNavigator<StudentTabParamList>();

function MainRootApp() {
  return (
    <TabApp.Navigator>
      <TabApp.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => <Icon name="home-outline" size={24} color="#19253D" />,
        }}
      />

      <TabApp.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="search-outline" size={24} color="#19253D" />
          )
        }}
      />

      <TabApp.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="chatbox-ellipses-outline" size={28} color="#19253D" />
          ),
        }}
      />

      <TabApp.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="person-circle-outline" size={28} color="#19253D" />
          ),
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
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');

      if (appData) {
        setFirstLaunched(false);
      } else {
        setFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'marked');
      }
    })();
  }, []);

  return isFirstLaunched !== null ? (
    <UserProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunched && (
            <RootStack.Screen name="OnBoarding" component={Onboarding} />
          )}
          <RootStack.Screen name="Login" component={Login} initialParams={{ isLogout: false }} />
          <RootStack.Screen name="MainRootApp" component={MainRootApp} />
        </RootStack.Navigator>
      </NavigationContainer>
    </UserProvider>
  ) : (
    <></>
  );
}

export default App;
