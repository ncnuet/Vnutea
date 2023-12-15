import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  LogBox,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import LecturerFavorite from './HomeScreen/lecturerFavorite';
import TaskLecturer from './HomeScreen/TaskLecturer';
import ListDepartment from './HomeScreen/ListDepartment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/types/routing';
import TrendingSection from './HomeScreen/trending';

type TProps = NativeStackScreenProps<StudentStackParamList, 'HomeScreen'>;
export default function HomeScreen({ navigation }: TProps) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

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
          <TouchableOpacity className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
            <Icon name="message-square" color="#19253D" size={24} />
          </TouchableOpacity>

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

      <ScrollView nestedScrollEnabled>
        <Text className="font-montserrat text-primary text-lg font-semibold ml-5">Giảng viên nổi bật</Text>
        <LecturerFavorite />
        <TrendingSection />
      </ScrollView>
    </View>
  );
}