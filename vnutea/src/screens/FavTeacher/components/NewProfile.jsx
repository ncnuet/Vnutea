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
} from 'react';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';

import {styles} from './NewProfilecss.js';

import {Svg, Path} from 'react-native-svg';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function NewProfile({navigation}) {
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
    navigation.replace('Login');
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector2.png')}></Image>

        <View style={styles.headerBoxWrapper}>
          <View style={styles.headerLogoWrapper}>
            <Image
              source={require('../assets/Logo2x.png')}
              style={styles.headerLogo}></Image>

            <View style={styles.headerLogoTextWrapper}>
              <Text style={styles.headerLogoText}>VNUTEA</Text>
            </View>
          </View>

          <View style={styles.headerInfoWrapper}>
            <View style={styles.headerInfoTextWrapper}>
              {/* Name */}
              <View style={styles.headerInfoNameWrapper}>
                <Text style={styles.headerInfoNameText}>Đỗ Tuấn Nghĩa</Text>
              </View>

              <View style={styles.headerInfoIdWrapper}>
                <Text style={styles.headerInfoIdText}>21020023</Text>
              </View>
            </View>

            <View style={styles.headerAvtWrapper}>
              <Image
                style={styles.headerAvt}
                source={require('../assets/avtlpd.png')}></Image>
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
            <IconFontAwesome6
              name="crown"
              color={mySpecBlue}
              size={
                0.02 * windowHeight + 0.02 * windowWidth
              }></IconFontAwesome6>
          </View>
          <Text style={styles.midBtnText}>Đánh giá môn học</Text>
        </TouchableOpacity>

        {/* Lop hoc cua toi */}
        <TouchableOpacity
          style={styles.midBtnWrapper}
          onPress={handleClassListOnPress}>
          <View style={styles.midBtnIcon}>
            <IconMCI
              name="bag-personal"
              color={mySpecBlue}
              size={0.024 * windowHeight + 0.024 * windowWidth}></IconMCI>
          </View>
          <Text style={styles.midBtnText}>Lớp học của tôi</Text>
        </TouchableOpacity>

        {/* Giang vien yeu thich */}
        <TouchableOpacity
          style={styles.midBtnWrapper}
          onPress={handleFavTeacherOnPress}>
          <View style={styles.midBtnIcon}>
            <IconAntDesign
              name="heart"
              color={mySpecBlue}
              size={0.02 * windowHeight + 0.02 * windowWidth}></IconAntDesign>
          </View>
          <Text style={styles.midBtnText}>Giảng viên yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Nut logout */}
      <TouchableOpacity
        style={styles.logoutBtnWrapper}
        onPress={handleLogoutOnPress}>
        <View style={styles.midBtnIcon}>
          <IconMCI
            name="exit-to-app"
            color={'#FF7070'}
            size={0.024 * windowHeight + 0.024 * windowWidth}></IconMCI>
        </View>
        <Text style={[styles.midBtnText, {color: '#FF7070'}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
