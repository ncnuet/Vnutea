import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  LogBox,
} from 'react-native';

import React, {useState, useEffect, useContext} from 'react';
import {Dimensions} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import {styles} from './ChatListcss.js';
import {UserContext} from '@/hooks/user.context';

import {socket} from '@/service/socket';
import fetch from '@/service/fetching';
import axios from '@/service/axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function Chat({route, navigation}) {
  const {user} = useContext(UserContext);

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

  const [dataChat, setDataChat] = useState([]);

  const initMess = (item, currId) => {
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

  async function getData() {
    fetch(
      () => axios.get('/chat/' + roomId),
      async data => {
        const tmp = data.messages.map(item => initMess(item, user.uid));
        console.log(tmp);
        setDataChat(tmp.reverse());
      },
    );
  }

  useEffect(() => {
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

    const newId = dataChat.length;
    const newSender = 1;
    const newType = 'text';
    const newMess = messText;

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

              <View style={styles.headerPaddingWrapper}></View>
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
                placeholderTextColor="gray"
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
