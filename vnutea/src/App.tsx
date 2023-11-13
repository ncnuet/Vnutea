import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackNavigator } from "./ContactStackNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import StudentScreen from "./StudentHome/StudentScreen";

const Tab = createMaterialBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Settings" component={StudentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
