import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import StudentScreen from '@/screens/StudentHome/HomeScreen';
import HomeScreen from '@/screens/StudentHome/HomeScreen';
import ChatScreen from '@/screens/StudentHome/chat/chat';

import messanger from '@/screens/StudentHome/chat/messanger';
import Lecturer from '@/screens/StudentHome/Lecturer/Lecturer';
import ContactLecturer from '@/screens/StudentHome/Lecturer/ContactLecturer';
import Comment from '@/screens/StudentHome/Lecturer/Comment';
import {MyStackParamList, StudentStackParamList} from './types/routing';

const StackHome = createNativeStackNavigator<StudentStackParamList>();
const StackMe = createNativeStackNavigator<MyStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <StackHome.Navigator screenOptions={{headerShown: false}}>
      <StackHome.Screen name="HomeScreen" component={HomeScreen} />
      <StackHome.Screen name="ChatScreen" component={ChatScreen} />
      <StackHome.Screen name="Lecturer" component={Lecturer} />
      <StackHome.Screen name="ContactLecturer" component={ContactLecturer} />
      <StackHome.Screen name="Comment" component={Comment} />
      <StackHome.Screen name="Messanger" component={messanger} />
    </StackHome.Navigator>
  );
};

// export const StudentStackNavigator = () => {
//     return (
//         <StackMe.Navigator screenOptions={{ headerShown: false }}>
//             <StackMe.Screen name="Student" component={StudentScreen} />
//         </StackMe.Navigator>
//     );
// }
