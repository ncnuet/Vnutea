import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homepage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/onboarding';
import { RootStackParamList } from './types/routing';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [isAppFirstLaunched, setAppFirstLaunched] = React.useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('isAppFirstLaunched');
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      console.log(appData);

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
          {isAppFirstLaunched && (<RootStack.Screen
            name='OnBoarding'
            component={Onboarding}
          />)}
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
      : <></>
  )
}

export default App;
