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

import {styles} from './ClassListcss.js';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 28;
const mySpecBlue = '#19253D';

export default function ClassList({navigation}) {
  //   Ket hop ca ten mon hoc va ma mon hoc
  const mergeNameCode = (name, code) => {
    let res = name + '  '+ code;
    return adjustString(res);
  };

//   Chinh do dai cua xau khong vuot qua myMaxLength
  const adjustString = (name) => {
    if (name.length >= myMaxLength) {
        let res = name.substr(0,myMaxLength - 3);
        res = res + '...';
        return res;
    }

    return name;
  }

  //Xu ly Like/ Unlike
  const handleHeartBtn = itemId => {
    //Call API

    setLikeList(prevLikeList => {
      return prevLikeList.map((like, index) =>
        index === itemId ? (like === 'true' ? 'false' : 'true') : like,
      );
    });
  };

  //TUrn back button
  const handleReturnOnPress = () => {
    navigation.pop();
  };

  //render tag giang vien
  const renderTagItem = ({item}) => (
    <Text style={[styles.searchTagText, {backgroundColor: item.tagColor}]}>
      {item.tagText}
    </Text>
  );

  //Render danh sach lop hoc
  const renderClassList = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          //Xu ly truy cap lap tuc
        }}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/science.png')}
            style={styles.logoImg}></Image>
        </View>

        <View style={styles.itemDesWrapper}>
          <View style={styles.itemDesTopWrapper}>
            <View style={styles.itemNameWrapper}>
              <Text style={styles.itemNameText}>{mergeNameCode(item.name,item.code)}</Text>
            </View>

          </View>

          <View style={styles.itemDesMidWrapper}>
            <View style={styles.itemDesRateWrapper}>
              <View style={styles.itemDesIconWrapper}>
                <Image
                  source={require('../assets/flag.png')}
                  style={styles.itemDesIcon}></Image>
              </View>

              <View style={styles.itemDesValueWrapper}>
                <Text style={styles.itemDesValue}>{item.rate1}</Text>
              </View>
            </View>

            <View style={styles.itemDesRateWrapper}>
              <View style={styles.itemDesIconWrapper}>
                <Image
                  source={require('../assets/hat2.png')}
                  style={styles.itemDesIcon}></Image>
              </View>

              <View style={styles.itemDesValueWrapper}>
                <Text style={styles.itemDesValue}>{item.rate2}</Text>
              </View>
            </View>

            <View style={styles.itemDesRateWrapper}>
              <View style={styles.itemDesIconWrapper}>
                <Image
                  source={require('../assets/emo4ticked.png')}
                  style={styles.itemDesIcon}></Image>
              </View>

              <View style={styles.itemDesValueWrapper}>
                <Text style={styles.itemDesValue}>{item.rate3}</Text>
              </View>
            </View>
          </View>

          {
            item.status == 'pass' &&
            <View style={styles.itemDesBotWrapper}>
              <Text style={styles.itemDesBotText}>
                Đã tốt nghiệp
              </Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector2.png')}></Image>

        <View style={styles.topWrapper}>
          {/* Nut turn back */}
          <TouchableOpacity style={styles.topBtn}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}
              onPress={handleReturnOnPress}></IconAntDesign>
          </TouchableOpacity>

          <View style={styles.topTextWrapper}>
            <Text style={styles.topText}>Danh sách lớp học hiện tại</Text>
          </View>
        </View>
      </View>

      <View style={styles.topSearchsListWrapper}>
        <FlatList
          data={fakeDataClassList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderClassList}
        />
        <View style={styles.paddingBottomItem}></View>
      </View>
    </View>
  );
}

//Fake du lieu top tim kiem
const fakeDataClassList = [
  {
    id: 0,
    name: 'Xác suất thống kê',
    code: 'MAT1042',
    rate1: 4.8,
    rate2: 4.8,
    rate3: 5,
    status: 'failed',
  },
  {
    id: 1,
    name: 'Xác suất thống kê',
    code: 'MAT1042',
    rate1: 4.8,
    rate2: 4.8,
    rate3: 5,
    status: 'pass',
  },
  {
    id: 2,
    name: 'Xác suất thống kê',
    code: 'MAT1042',
    rate1: 4.8,
    rate2: 4.8,
    rate3: 5,
    status: 'pass',
  },
];
