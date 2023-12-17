import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
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
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import {styles} from './ChatListcss.js';
import axios from 'axios';
import {BASE_URL} from '@/context/config.js';
import CookieManager from '@react-native-cookies/cookies';
import {socket} from '@/service/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function Chat({route, navigation}) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {name, avt, roomId, statusOnl} = route.params;
  const [messText, setMessText] = useState('');
  const [status, setStatus] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  socket.on('chat', msg => {
    console.log(msg, msg.message, msg.type);

    const newId = dataChat.length;
    const newSender = 0;
    const newType = 'text';
    const newMess = msg.content.message;
    // const newTime = ...;

    const newChat = {
      id: newId,
      sender: newSender,
      mess: newMess,
      type: newType,
      time: '00000',
    };

    const newDataChat = [...dataChat, newChat];
    setDataChat(newDataChat);
    setMessText('');
  });

  //Fake data
  const [dataChat, setDataChat] = useState([
    // {
    //   id: 0,
    //   sender: 0,
    //   mess: 'Ok hay gap mat nhe!',
    //   type: 'text',
    //   time: '10:21',
    // },
    // {
    //   id: 1,
    //   sender: 1,
    //   mess: 'Ok hay gap mat nhe! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ',
    //   type: 'text',
    //   time: '11:22',
    // },
    // {
    //   id: 2,
    //   sender: 0,
    //   mess: 'Ok hay gap mat nhe! 2',
    //   type: 'text',
    //   time: '12:13',
    // },
    // {
    //   id: 3,
    //   sender: 0,
    //   mess: 'Ok hay gap mat nhe! 3',
    //   type: 'text',
    //   time: '12:15',
    // },
    // {
    //   id: 4,
    //   sender: 1,
    //   mess: 'Ok hay gap mat nhe! 4',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 5,
    //   sender: 0,
    //   mess: 'Dit me may cho bo may xin cai dia chi! Dit me may noi it thoi',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 6,
    //   sender: 0,
    //   mess: 'Dit me may cho bo may xin cai dia chi! Dit me may noi it thoi',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 7,
    //   sender: 1,
    //   mess: 'An noi kieu gi mat day the?',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 8,
    //   sender: 1,
    //   mess: 'Mo coi bo me deo duoc day do tu te a?',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 9,
    //   sender: 0,
    //   mess: 'Dit con me may!',
    //   type: 'text',
    //   time: '12:30',
    // },
    // {
    //   id: 10,
    //   sender: 1,
    //   mess: 'Bo dit ca nha may luon day con lon!',
    //   type: 'text',
    //   time: '12:30',
    // },
  ]);

  const initMess = (item, currId) => {
    // console.log(item.creator, ' ', currId);
    if (item.creator === currId) {
      return {
        id: item._id,
        sender: 1,
        mess: item.message,
      };
    } else
      return {
        id: item._id,
        sender: 0,
        mess: item.message,
      };
  };

  // Call API
  useEffect(() => {
    async function getData() {
      const myCC = await AsyncStorage.getItem('user');
      const currId = JSON.parse(myCC).uid;

      try {
        const res = await axios.get(BASE_URL + '/chat/' + roomId, {
          withCredentials: true,
        });

        if (res.status === 200) {
          const tmp = res.data.data.messages.map(item => {
            return initMess(item, currId);
          });
          console.log(tmp);
          setDataChat(tmp.reverse());
        }
      } catch (error) {
        console.log('error: ', error.message);
      }
    }

    getData();
  }, [roomId]);

  const renderMessageItem = ({item}) => {
    switch (item.sender) {
      case 0:
        return (
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTextLeft}>{item.mess}</Text>
          </View>
        );
      case 1:
        return (
          <View style={[styles.itemWrapper, styles.itemRight]}>
            <Text style={styles.itemTextRight}>{item.mess}</Text>
          </View>
        );
    }
  };

  const handleOnChangeText = text => {
    setMessText(text);
  };

  const handleOnSubmitText = () => {
    if (!messText) {
      return;
    }

    //Call API
    const newId = dataChat.length;
    const newSender = 1;
    const newType = 'text';
    const newMess = messText;
    // const newTime = ...;
    socket.emit('chat', {
      content: {
        message: messText,
        type: 'text',
      },
      to: roomId,
    });
    const newChat = {
      id: newId,
      sender: newSender,
      mess: newMess,
      type: newType,
      time: '00000',
    };

    const newDataChat = [...dataChat, newChat];
    setDataChat(newDataChat);
    setMessText('');
  };

  return (
    <View style={[styles.allWrapper, styles.allChatWrapper]}>
      {/* Header  */}
      <View style={styles.headerChatBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector.png')}></Image>

        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              navigation.pop();
            }}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}></IconAntDesign>
          </TouchableOpacity>

          {/* info */}
          <View style={styles.headerInfoWrapper}>
            <View style={styles.headerAvtWrapper}>
              <Image style={styles.headerAvt} source={avt}></Image>

              {statusOnl == 'online' && (
                <View style={styles.headerStatusWrapper}>
                  <View style={styles.headerStatus}></View>
                </View>
              )}
            </View>

            <View style={styles.headerDesWrapper}>
              <View style={styles.headerNameWrapper}>
                <Text style={styles.headerNameText}>{name}</Text>
              </View>

              {statusOnl == 'online' && (
                <View style={styles.headerTimeWrapper}>
                  <Text style={styles.headerTimeText}>Online now</Text>
                </View>
              )}

              <View style={styles.headerPaddingWrapper}>

              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Het header */}

      {/* Khung chat */}
      <View style={styles.chatAllWrapper}>
        {/* Danh sach hien thi cac tin nhan */}
        <View style={styles.chatMessListWrapper}>
          <FlatList
            data={dataChat}
            renderItem={({item}) => renderMessageItem({item})}
            inverted={true}
            contentContainerStyle={{
              flexDirection: 'column-reverse',
            }}></FlatList>
        </View>
        {/* Khung nhac nguoi khac dang go */}
        {isTyping == true && (
          <View style={styles.chatTypingWrapper}>
            <View style={styles.chatTypingAvtWrapper}>
              <Image style={styles.chatTypingAvt} source={avt}></Image>
            </View>
            <View style={styles.chatTypingTextWrapper}>
              <Text style={styles.chatTypingText}>
                {name} đang nhập tin nhắn ...
              </Text>
            </View>
          </View>
        )}
        {/* Chat input */}
        <View style={styles.chatBoxWrapper}>
          <View style={styles.chatInputWrapper}>
            {/* <TouchableOpacity style={styles.chatAddBtnWrapper}>
              <IconAntDesign
                name="plus"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color="#fff"></IconAntDesign>
            </TouchableOpacity> */}

            <View style={styles.chatInputTextWrapper}>
              <TextInput
                style={styles.chatInputText}
                placeholder="Nhập văn bản"
                value={messText}
                onChangeText={text => handleOnChangeText(text)}
                onSubmitEditing={handleOnSubmitText}></TextInput>

              <TouchableOpacity style={styles.chatEmojiWrapper}>
                <IconMC
                  name="emoticon-happy"
                  size={0.024 * windowHeight + 0.024 * windowWidth}></IconMC>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.chatAddBtnWrapper}
              onPress={handleOnSubmitText}>
              <IconIonicons
                name="send"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color={mySpecBlue}></IconIonicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
