import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import OutstandingLecturer from './components/lecturerOuts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/types/routing';
import TrendingSection from './components/trending';
import { Department, Outstanding, Teacher } from '@/types';
import axios from '@/service/axios';

type TProps = NativeStackScreenProps<StudentStackParamList, 'HomeScreen'>;
const defaultDep = { name: "All", id: "0" }

export default function HomeScreen({ navigation }: TProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [outstanding, setOutstanding] = useState<Outstanding[]>([]);
  const [departments, setDepartments] = useState<Department[]>([defaultDep]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  async function getDepartments() {
    try {
      const response = await axios.get("/department/name");
      if (response.status === 200) {
        console.log(response.data.data.departments);
        setDepartments([{ name: "All", id: "0" }, ...response.data.data.departments]);
      } else {
        Alert.alert("Lỗi");
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Lỗi")
    }
  }

  async function getTeacher() {
    try {
      const response = await axios.get("/teacher");
      if (response.status === 200) {
        console.log(response.data.data.teacher);
        setTeachers(response.data.data.teacher);
      } else {
        Alert.alert("Lỗi");
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Lỗi")
    }
  }

  async function getOuts() {
    try {
      const response = await axios.get("/outstanding");
      if (response.status === 200) {
        console.log(response.data.data.outstanding);
        setOutstanding(response.data.data.outstanding);
      } else {
        Alert.alert("Lỗi")
      }
    } catch (error) {
      Alert.alert("Lỗi")
    }
  }

  useEffect(() => {
    getOuts();
    getDepartments();
    getTeacher();
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise
      .all([getOuts(), getDepartments(), getTeacher()])
      .finally(() => setRefreshing(false))
  }, []);


  return (
    <View className='h-full bg-secondary pt-10'>
      <StatusBar animated translucent backgroundColor={'transparent'} />
      <View className="px-5 flex flex-row items-center justify-between pb-3">
        <View className="mx-2 flex flex-row items-center font-lato">
          <Icon name="coffee" color="#19253D" size={32} />
          <Text className="ml-3 text-primary text-lg font-semibold font-montserrat">
            VNUTea
          </Text>
        </View>

        <View className="flex flex-row gap-4">
          <TouchableOpacity className="h-12 w-12 rounded-full">
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 40 }}
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }
      >
        <Text className="font-montserrat text-primary text-lg font-semibold ml-5">Giảng viên nổi bật</Text>
        <OutstandingLecturer outstanding={outstanding} />
        <TrendingSection departments={departments} teachers={teachers} />
      </ScrollView>
    </View>
  );
}