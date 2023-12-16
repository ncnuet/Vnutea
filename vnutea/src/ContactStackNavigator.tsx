import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import Lecturer from '@/screens/Lecturer/Lecturer';
import ContactLecturer from '@/screens/Lecturer/ContactLecturer';
import Class from "@/screens/Class/Class"
import { StudentStackParamList } from './types/routing';

const StackHome = createNativeStackNavigator<StudentStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="HomeScreen" component={HomeScreen} />
      <StackHome.Screen name='LecturerScreen' component={Lecturer} initialParams={{ id: "0" }} />
      <StackHome.Screen name='ContactScreen' component={ContactLecturer} />
      <StackHome.Screen name='ClassScreen' component={Class} />
    </StackHome.Navigator>
  );
}
