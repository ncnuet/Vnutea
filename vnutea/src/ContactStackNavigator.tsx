import React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import Lecturer from '@/screens/Lecturer/Lecturer';
import ContactLecturer from '@/screens/Lecturer/ContactLecturer';
import Class from "@/screens/Class/Class"
import { StudentStackParamList } from './types/routing';
import Lab from './screens/Lab/Lab';
import ListTeacher from './components/ListTeacher';
import DepartmentScreen from './screens/Department/Department';
import { NavigationProp } from '@react-navigation/native';

const StackHome = createNativeStackNavigator<StudentStackParamList>();
export type StackHomeProp<T extends keyof StudentStackParamList> = NativeStackScreenProps<StudentStackParamList, T>
export type NavHomeProp = NavigationProp<StudentStackParamList>;

export const HomeStackNavigator = () => {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="HomeScreen" component={HomeScreen} />
      <StackHome.Screen name='LecturerScreen' component={Lecturer} initialParams={{ id: "0" }} />
      <StackHome.Screen name='DepartmentScreen' component={DepartmentScreen} initialParams={{ id: "0" }} />
      <StackHome.Screen name='ClassScreen' component={Class} />
      <StackHome.Screen name='LabScreen' component={Lab} />
      <StackHome.Screen name='ContactScreen' component={ContactLecturer} />
      <StackHome.Screen name='TeacherList' component={ListTeacher} />

    </StackHome.Navigator>
  );
}
