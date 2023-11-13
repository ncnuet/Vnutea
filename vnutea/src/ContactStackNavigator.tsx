import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentScreen from './StudentHome/StudentScreen';
import HomeScreen from './StudentHome/HomeScreen';
import chat from './StudentHome/chat/chat';
import messanger from "./StudentHome/chat/messanger";
import Lecturer from "./StudentHome/Lecturer/Lecturer";
import ContactLecturer from "./StudentHome/Lecturer/ContactLecturer";
import Comment from "./StudentHome/Lecturer/Comment";
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#77C9A3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{title: '',}}/>
      <Stack.Screen name="Chat" component={chat} />
      <Stack.Screen name="Messanger" component={messanger} />
      <Stack.Screen name="Lecturer" component={Lecturer} />
      <Stack.Screen name="ContactLecturer" component={ContactLecturer} />
      <Stack.Screen name="Comment" component={Comment} />
    </Stack.Navigator>
  );
}

const StudentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Student" component={StudentScreen} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, StudentStackNavigator };