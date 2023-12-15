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
  useEffect,
} from 'react';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './ChatListcss.js';
import axios from 'axios';
import {BASE_URL} from '@/context/config.js';
import CookieManager from '@react-native-cookies/cookies';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

const maxMessLength = 30;

const fakeDataChatList = [
  {
    id: 0,
    name: 'Lê Phê Đô',
    avt: require('../assets/avtlpd.png'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 4,
    time: '1m',
  },
  {
    id: 1,
    name: 'Đỗ Đức Đông',
    avt: require('../assets/avtdtn.jpg'),
    mess: 'Thầy cho em A+, em đéo cần học làm gì cho mệt :D',
    newMess: 4,
    time: '51m',
  },
  {
    id: 2,
    name: 'Hồ Đắc Phương',
    avt: require('../assets/avtphm.jpeg'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 10,
    time: '1h',
  },
  {
    id: 3,
    name: 'Phạm Hồng Minh',
    avt: require('../assets/avtlmh.jpg'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 4,
    time: '2d',
  },
  {
    id: 4,
    name: 'Đỗ Tuấn Nghĩa',
    avt: require('../assets/avtlpd.png'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 100,
    time: '1m',
  },
  {
    id: 5,
    name: 'Bàn Văn Hiếu',
    avt: require('../assets/avtlpd.png'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 4,
    time: '1m',
  },
  {
    id: 6,
    name: 'Đỗ Minh Đức',
    avt: require('../assets/avtlpd.png'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 10000,
    time: '1m',
  },
];

export default function ChatList({navigation}) {
  const [dataChatList, setDataChatList] = useState(fakeDataChatList);

  useEffect(() => {
    async function getData() {
      try {
        // const a = await CookieManager.get("http://192.168.43.213");
        // console.log('cookies: ',a);
        const response = await axios.get(BASE_URL + '/chat/', {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log('success: ',response.data.data);
          const tmp = response.data.data.map(item => ({
            id: item._id,
            name: item.name,
            avt: require('../assets/avtlpd.png'),
            mess: 'okey, Đừng đến trễ nhé',
            newMess: 10000,
            time: new Date(item.updatedAt).getHours(),
          }));
          setDataChatList(tmp);
        }
      } catch (error) {
        console.log('BigError: ',error.message);
      }
    }

    getData();
  },[]);

  //Fake data
  const [isDated, setIsDated] = useState(true);
  const nameTeacherDate = ['Lê', 'Phê', 'Đô'];

  //Xu ly nhan tin voi mot nguoi cu the
  const handleChatPressed = item => {
    navigation.navigate('ChatScreen', {
      name: item.name,
      avt: item.avt,
      roomId: item.id,
    });
  };

  //Rut gon new
  const adjustNew = newMess => {
    if (newMess <= 99) return newMess;
    return 99;
  };

  //Rut gon mess
  const adjustMess = mess => {
    if (mess.length > maxMessLength) {
      let newMess = mess.substr(0, maxMessLength - 4);
      newMess = newMess + '...';
      return newMess;
    }
    return mess;
  };

  //RenderChatList
  const renderChatList = ({item}) => (
    <TouchableOpacity
      style={styles.chatItemWrapper}
      onPress={() => handleChatPressed(item)}>
      {/* Avt */}
      <View style={styles.chatAvtWrapper}>
        <Image source={item.avt} style={styles.chatAvt}></Image>
      </View>

      <View style={styles.chatDesWrapper}>
        {/* Name va chat */}
        <View style={styles.chatDesLeftWrapper}>
          {/* Name */}
          <View style={styles.chatNameWrapper}>
            <Text style={styles.chatNameText}>{item.name}</Text>
          </View>

          {/* mess */}
          <View style={styles.chatMessWrapper}>
            <Text style={styles.chatMessText}>{adjustMess(item.mess)}</Text>
          </View>
        </View>

        <View style={styles.chatDesRightWrapper}>
          {/* time */}
          <View style={styles.chatTimeWrapper}>
            <Text style={styles.chatTimeText}>{item.time}</Text>
          </View>

          {/* New mess count */}
          <View style={styles.chatNewMessWrapper}>
            <Text style={styles.chatNewMessText}>
              {adjustNew(item.newMess)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.allWrapper}>
      {/* Header  */}
      <View style={styles.headerBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector.png')}></Image>

        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              navigation.goBack(null);
            }}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}></IconAntDesign>
          </TouchableOpacity>

          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Chat</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <TouchableOpacity style={styles.searchBtn}>
            <IconAntDesign
              name="search1"
              size={0.024 * windowHeight + 0.024 * windowWidth}
              color={mySpecBlue}></IconAntDesign>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInputWrapper}
            placeholder="Search"></TextInput>
        </View>

        {/* Khung hien thi cuoc hen */}
        {isDated == true && (
          <View style={styles.dateWrapper}>
            <View style={styles.avtDateWrapper}>
              <Image
                style={styles.avtDate}
                source={require('../assets/avtlpd.png')}></Image>
            </View>

            <View style={styles.labelDateWrapper}>
              <View style={styles.textDateWrapper}>
                <Text style={styles.textDate}>Bạn đang đặt lịch gặp thầy</Text>

                {nameTeacherDate.map((name, index) => (
                  <Text key={index} style={styles.nameDate}>
                    {' '}
                    {name}
                  </Text>
                ))}

                <Text style={styles.textDate}>, hãy nhắn tin cho thầy nhé</Text>
              </View>

              <TouchableOpacity style={styles.btnDateWrapper}>
                <Text style={styles.textBtn}>Nhắn tin cho thầy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Danh sach chat Label*/}
        <View style={styles.chatListLabel}>
          <Text style={styles.chatListTextLabel}>Chat</Text>
        </View>

        {/* Danh sach chat */}
        <View style={styles.chatListWrapper}>
          <FlatList
            data={dataChatList}
            keyExtractor={item => item.id.toString()}
            renderItem={renderChatList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
