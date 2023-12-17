import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {Animated, StyleSheet, Button, SafeAreaView} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  useMemo,
  useContext,
} from 'react';
import {Dimensions} from 'react-native';

import {styles} from './NewProfilecss.js';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonIcons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '@/hooks/user.context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function NewProfile({navigation}) {
  const {user, setUser} = useContext(UserContext);

  // Chuyen sang screen giang vien
  const handleFavTeacherOnPress = () => {
    navigation.navigate('FavTeacherScreen');
  };

  // Chuyen sang screen danh gia mon hoc
  const handleRateClassOnPress = () => {
    navigation.navigate('RateClassListScreen');
  };

  // Chuyen sang screen danh sach lop hoc
  const handleClassListOnPress = () => {
    navigation.navigate('ClassListScreen');
  };

  // Logout
  const handleLogoutOnPress = () => {
    navigation.replace('Login', {isLogout: true});
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector2.png')}></Image>

        <View className="flex flex-row justify-between items-center p-10 pt-16">
          {/* <View className="w-10 flex-none">
            <IconFeather name="coffee" color="#19253D" size={32} />
            <View style={styles.headerLogoTextWrapper}>
              <Text className='text-xl font-montserrat font-semibold text-primary'>VNUTEA</Text>
            </View>
          </View> */}

          <View className="flex flex-row flex-1 justify-end">
            <View className="mr-3">
              {/* Name */}
              <Text className="text-primary font-montserrat font-semibold text-xl">
                {user.name}
              </Text>
              <Text className="text-primary font-lato text-right font-bold">
                {user.username}
              </Text>
            </View>

            <View className="h-16 w-16">
              <Image
                style={styles.headerAvt}
                source={require('../assets/avtstu.jpg')}
              />
            </View>
          </View>
        </View>
      </View>

      {/* 3 nut danh gia */}
      <View style={styles.threeBtnWrapper}>
        {/* Danh gia mon hoc */}
        <TouchableOpacity
          style={styles.midBtnWrapper}
          onPress={handleRateClassOnPress}>
          <View style={styles.midBtnIcon}>
            <IconIonIcons
              name="shield-checkmark-outline"
              size={28}
              color={mySpecBlue}
            />
          </View>
          <Text className="text-lg" style={styles.midBtnText}>
            Đánh giá môn học
          </Text>
        </TouchableOpacity>

        {/* Lop hoc cua toi */}
        <TouchableOpacity
          style={styles.midBtnWrapper}
          onPress={handleClassListOnPress}>
          <View style={styles.midBtnIcon}>
            <IconIonIcons name="school-outline" size={28} color={mySpecBlue} />
          </View>
          <Text className="text-lg" style={styles.midBtnText}>
            Lớp học của tôi
          </Text>
        </TouchableOpacity>

        {/* Giang vien yeu thich */}
        <TouchableOpacity
          style={styles.midBtnWrapper}
          onPress={handleFavTeacherOnPress}>
          <View style={styles.midBtnIcon}>
            <IconIonIcons name="heart-outline" size={28} color={mySpecBlue} />
          </View>
          <Text className="text-lg" style={styles.midBtnText}>
            Giảng viên yêu thích
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nut logout */}
      <TouchableOpacity
        style={styles.logoutBtnWrapper}
        onPress={handleLogoutOnPress}>
        <View style={styles.midBtnIcon}>
          <IconIonIcons name="log-out-outline" size={28} color="#FF7070" />
        </View>
        <Text
          className="text-lg"
          style={[styles.midBtnText, {color: '#FF7070'}]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
