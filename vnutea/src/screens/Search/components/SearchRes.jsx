import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIonIcons from 'react-native-vector-icons/Ionicons';

import {ItemLecturer} from '@/components/ItemLecturer';

import {styles} from './Searchcss.js';
import axios from '@/service/axios';
import fetch from '@/service/fetching';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const mySpecBlue = '#19253D';
const myMaxLength = 40;

const default_val = {
  teachers: [],
  labs: [],
  departments: [],
  classes: [],
};

export default function Search({route, navigation}) {
  const [result, setResult] = useState(default_val);
  const {searchValue, typeSearchValue} = route.params;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  async function getData() {
    fetch(
      () => axios.get('/search', {params: {query: searchValue}}),
      async data => {
        setResult(data);
        console.log(data);
      },
    );
  }

  useEffect(() => {
    getData();
  }, []);

  const [typeSearch, setTypeSearch] = useState(typeSearchValue);
  const [mySearch, setMySearch] = useState('');

  const [likeList, setLikeList] = useState([
    'true',
    'true',
    'false',
    'false',
    'false',
  ]);

  //Xu ly tim kiem
  const handleSearchOnPress = () => {
    if (mySearch != '') {
      navigation.replace('SearchResScreen', {
        searchValue: mySearch,
        typeSearchValue: typeSearch,
      });
    }
  };

  //Xu ly cac chuc nang
  const handleTeachersOnPress = () => {
    setTypeSearch('Teachers');
  };

  const handleLabOnPress = () => {
    setTypeSearch('Lab');
  };

  const handleClassOnPress = () => {
    setTypeSearch('Class');
  };

  const handleFacilityOnPress = () => {
    setTypeSearch('Facility');
  };

  const btnOptionsStyle = useMemo(
    () => ({
      width: 0.18 * windowWidth,
      height: 0.18 * windowWidth,
      borderRadius: 100,
      backgroundColor: myGray,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const btnOptionsSelectedStyle = useMemo(
    () => ({
      width: 0.18 * windowWidth,
      height: 0.18 * windowWidth,
      borderRadius: 100,
      backgroundColor: myBlue,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const textOptionsStyle = useMemo(
    () => ({
      fontSize: 0.01 * windowWidth + 0.01 * windowHeight,
      color: mySpecBlue,
      fontFamily: 'Montserrat',
    }),
    [],
  );

  const textOptionsSelectedStyle = useMemo(
    () => ({
      fontSize: 0.01 * windowWidth + 0.01 * windowHeight,
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      color: mySpecBlue,
    }),
    [typeSearch],
  );

  //Xu ly Like/ Unlike
  const handleHeartBtn = itemId => {
    //Call API

    setLikeList(prevLikeList => {
      return prevLikeList.map((like, index) =>
        index === itemId ? (like === 'true' ? 'false' : 'true') : like,
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.emptyTop} />
      <View>
        <ScrollView style={[styles.allWrapper]}>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>Tìm kiếm</Text>
          </View>
          {/* Input Search */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputAndBtnWrapper}>
              <TouchableOpacity
                style={styles.btnSearch}
                onPress={handleSearchOnPress}>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={'#000'} size={0.028 * windowHeight} /> */}
                <IconIonIcons name="search-outline" size={26} color="#000" />
              </TouchableOpacity>
              <View style={styles.inputSearch}>
                <TextInput
                  placeholder="Nhập từ khóa tìm kiếm"
                  placeholderTextColor="gray"
                  style={styles.inputSearchText}
                  maxLength={40}
                  value={mySearch}
                  onSubmitEditing={handleSearchOnPress}
                  onChangeText={text => {
                    setMySearch(text);
                  }}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnMic}
              onPress={() => {
                /* Xu ly tim kiem bang giong noi */
              }}>
              {/* <FontAwesomeIcon icon={faMicrophone} size={0.028 * windowHeight} color={"white"} /> */}
              <Icon
                name="microphone"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.fourOptionsWrapper}>
            {/* Nut Teachers */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Teachers' && btnOptionsSelectedStyle,
                ]}
                onPress={handleTeachersOnPress}>
                <IconIonIcons
                  name="person"
                  size={32}
                  color={typeSearch === 'Teachers' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Teachers */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Teachers' && textOptionsSelectedStyle,
                ]}>
                Teachers
              </Text>
            </View>

            {/* Nut Lab */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Lab' && btnOptionsSelectedStyle,
                ]}
                onPress={handleLabOnPress}>
                <IconIonIcons
                  name="hardware-chip"
                  size={32}
                  color={typeSearch === 'Lab' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Lab */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Lab' && textOptionsSelectedStyle,
                ]}>
                Lab
              </Text>
            </View>

            {/* Nut Class */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Class' && btnOptionsSelectedStyle,
                ]}
                onPress={handleClassOnPress}>
                <IconIonIcons
                  name="school"
                  size={32}
                  color={typeSearch === 'Class' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Class */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Class' && textOptionsSelectedStyle,
                ]}>
                Class
              </Text>
            </View>

            {/* Facility */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Facility' && btnOptionsSelectedStyle,
                ]}
                onPress={handleFacilityOnPress}>
                <IconIonIcons
                  name="business"
                  size={32}
                  color={typeSearch === 'Facility' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Facility */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Facility' && textOptionsSelectedStyle,
                ]}>
                Facility
              </Text>
            </View>
          </View>

          {/* Ket qua tim kiem */}
          <View style={[styles.searchResWrapper]}>
            {/* Text Tim kiem gan day */}
            <Text style={styles.recentSearchText}>
              {`Results for '${searchValue}'`}
            </Text>

            {/* Render ket qua tim kiem o day */}
            <View className="bg-slate-200 w-full p-3 rounded-xl mt-5">
              {result.teachers.map(item => (
                <ItemLecturer
                  id={item.id}
                  name={item.name}
                  department={item.department.name}
                  image={
                    item.image
                      ? item.image
                      : 'https://bizweb.dktcdn.net/100/354/778/files/ky-thuat-chup-anh-chan-dung-dep-nhat-1.jpg?v=1619759659660'
                  }
                  like={item.liked}
                  key={item.id}
                  awards={item.awards}
                />
              ))}
            </View>

            <View className="h-36"></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
