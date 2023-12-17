import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  LogBox,
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
import {socket} from '@/service/socket';

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
  // {
  //   id: 0,
  //   name: 'Lê Phê Đô',
  //   avt: require('../assets/avtlpd.png'),
  //   mess: 'okey, Đừng đến trễ nhé',
  //   newMess: 4,
  //   time: '1m',
  // },
];

const addfakeDataChatList = [
  {
    id: 100,
    name: 'Lê Phê Đô',
    avt: require('../assets/avtlpd.png'),
    mess: 'okey, Đừng đến trễ nhé',
    newMess: 2,
    time: '11m',
    status: 'offline',
  },
  {
    id: 101,
    name: 'Đỗ Đức Đông',
    avt: require('../assets/avtddd.jpg'),
    mess: 'Em làm nốt các bài tập từ chương 3 đến chương 5 để hoàn thiện nốt nhé',
    newMess: 4,
    time: '2h',
    status: 'offline',
  },
  {
    id: 102,
    name: 'Lê Minh Hoàng',
    avt: require('../assets/avtphm.jpeg'),
    mess: 'Tuần này thầy rất bận, có lẽ phải để tuần sau em nhé',
    newMess: 1,
    time: '2h',
    status: 'online',
  },
  {
    id: 103,
    name: 'Phạm Hồng Minh',
    avt: require('../assets/avtdtn.jpg'),
    mess: 'Làm nốt phần 11 nhé',
    newMess: 8,
    time: '12m',
    status: 'offline',
  },
];

export default function ChatList({navigation}) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const handelConnect = async () => {
    console.log('Lo');

    socket.connect();
    socket.on('connection', () => {
      console.log('Hello');
    });

    socket.on('connect_error', err => {
      console.log('Connection error', err);
      Alert.alert('Lỗi');
    });

    // socket.on("chat", ())
  };

  // Lay du lieu chat cuoi cung
  async function getDataChat(roomId) {
    var resVal;
    try {
      const res = await axios.get(BASE_URL + '/chat/' + roomId, {
        withCredentials: true,
      });

      if (res.status === 200) {
        resVal = res.data.data.messages[0].message;
      }
    } catch (error) {
      console.log('error: ', error.message);
      resVal = 'error';
    }
    return resVal;
  }

  const initChatItem = async item => {
    try {
      const lastMess = await getDataChat(item._id);

      return {
        id: item._id,
        name: item.name,
        avt: require('../assets/fakeavt.png'),
        mess: lastMess,
        newMess: 1,
        time: '1m',
        status: 'online',
      };
    } catch (error) {
      console.error('Error in initChatItem:', error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  async function getData() {
    try {
      const response = await axios.get(BASE_URL + '/chat/', {
        withCredentials: true,
      });
      if (response.status === 200) {
        let tmp = await Promise.all(
          response.data.data.map(item => initChatItem(item)),
        );

        if (tmp.length > 0) {
          tmp[tmp.length - 1].status = 'offline';
          tmp[tmp.length - 1].avt = require('../assets/fakeavt3.png');
        }

        tmp = [...tmp, ...addfakeDataChatList];
        console.log(tmp);

        setDataChatList(tmp);
      }
    } catch (error) {
      console.log('BigError: ', error.message);
    }
  }

  const [dataChatList, setDataChatList] = useState(fakeDataChatList);

  useEffect(() => {
    handelConnect();
    getData();
  }, []);

  //Fake data
  const [isDated, setIsDated] = useState(true);
  const nameTeacherDate = ['Lê', 'Phê', 'Đô'];

  //Xu ly nhan tin voi mot nguoi cu the
  const handleChatPressed = item => {
    socket.emit('join', item.id);
    navigation.navigate('ChatScreen', {
      name: item.name,
      avt: item.avt,
      roomId: item.id,
      statusOnl: item.status,
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

        {/* Dot online status */}
        {item.status == 'online' && <View style={styles.dotOnline}></View>}
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
            <Text style={styles.headerText}>Danh sách trò chuyện</Text>
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
            placeholder="Nhập từ khóa tìm kiếm"
            placeholderTextColor="gray"></TextInput>
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

                <Text style={styles.textDate}>
                  , hãy nhắn tin cho thầy nhé!
                </Text>
              </View>

              <TouchableOpacity style={styles.btnDateWrapper}>
                <Text style={styles.textBtn}>Nhắn tin cho thầy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Danh sach chat Label*/}
        <View style={styles.chatListLabel}>
          <Text style={styles.chatListTextLabel}>Tin nhắn</Text>
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
