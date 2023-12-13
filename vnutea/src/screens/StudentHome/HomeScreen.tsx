import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LecturerFavorite from './ComponentHomeScreen/lecturerFavorite';
import TaskLecturer from './ComponentHomeScreen/TaskLecturer';
import ListDepartment from './ComponentHomeScreen/ListDepartment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StudentStackParamList} from '@/types/routing';

type TProps = NativeStackScreenProps<StudentStackParamList, 'HomeScreen'>;
export default function HomeScreen({navigation}: TProps) {
  return (
    <View>
      <StatusBar animated translucent backgroundColor={'transparent'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="font-lato bg-secondary pt-14 ">
        <View className="px-5 flex flex-row items-center justify-between pb-3">
          <View className="mx-2 flex flex-row items-center font-lato">
            <Icon name="coffee" color="#19253D" size={32} />
            <Text className="ml-3 text-primary text-lg font-semibold">
              VNUTea
            </Text>
          </View>

          <View className="flex flex-row gap-4">
            {/* <TouchableOpacity
              className='h-12 w-12 rounded-full bg-white flex justify-center items-center'
              onPress={() => navigation.navigate("ChatScreen")}>
              <Icon name='sms' color="#19253D" size={24} />
            </TouchableOpacity> */}
            <TouchableOpacity className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
              <Icon name="notifications" color="#19253D" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 rounded-full">
              <Image
                style={{width: '100%', height: '100%', borderRadius: 40}}
                source={{
                  uri: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.textGv}>Giảng viên nổi bật</Text>
          <LecturerFavorite></LecturerFavorite>
          <ListDepartment></ListDepartment>
          <Text style={styles.textGv}>Danh sách giảng viên</Text>
          <TaskLecturer></TaskLecturer>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imagecontainerTop: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  textvnu: {
    position: 'absolute',
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
    marginLeft: 45,
  },
  textGv: {
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 10,
  },
});
