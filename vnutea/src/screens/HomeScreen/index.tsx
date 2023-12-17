import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  RefreshControl,
  LogBox,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/types/routing';
import { IDepartmentName, IOutstanding, ITeacher } from '@/types';
import Icon from 'react-native-vector-icons/Feather';
import Outstanding from './components/Oustanding';
import Trending from './components/Trending';
import axios from '@/service/axios';
import fetch from '@/service/fetching';

type TProps = NativeStackScreenProps<StudentStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: TProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [outstanding, setOutstanding] = useState<IOutstanding[]>([]);
  const [departments, setDepartments] = useState<IDepartmentName[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  async function getDepartments() {
    fetch<{ departments: IDepartmentName[] }>(
      () => axios.get("/department/name"),
      async (data) => {
        setDepartments(data.departments);
      })
  }

  async function getTeacher() {
    fetch<{ teacher: ITeacher[] }>(
      () => axios.get("/teacher"),
      async (data) => {
        setTeachers(data.teacher);
      })
  }

  async function getOuts() {
    fetch<{ outstanding: IOutstanding[] }>(
      () => axios.get("/outstanding"),
      async (data) => {
        setOutstanding(data.outstanding);
      })
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])


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
                uri: 'https://e-space.vn/avatar/student/42674.jpg',
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
        <Text className="font-montserrat text-primary text-lg font-semibold ml-5">Cá nhân và đơn vị nổi bật</Text>
        <Outstanding outstanding={outstanding} />

        <Text className="font-montserrat text-primary text-lg font-semibold ml-5 mt-7">Giảng viên VNU</Text>
        <Trending
          departments={departments}
          teachers={teachers} />
      </ScrollView>
    </View>
  );
}