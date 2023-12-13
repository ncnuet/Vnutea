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

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './ChatListcss.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function Chat({route, navigation}) {
  const {name} = route.params;
  const [status, setStatus] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  //Fake data
  const [dataChat, setDataChat] = useState([
    {
      id: 0,
      sender: 0,
      mess: 'Ok hay gap mat nhe!',
      type: 'text',
      time: '10:21',
    },
    {
      id: 1,
      sender: 1,
      mess: 'Ok hay gap mat nhe! 111111111111111111111111111111111111111',
      type: 'text',
      time: '11:22',
    },
    {
      id: 2,
      sender: 0,
      mess: 'Ok hay gap mat nhe! 2',
      type: 'text',
      time: '12:13',
    },
    {
      id: 3,
      sender: 0,
      mess: 'Ok hay gap mat nhe! 3',
      type: 'text',
      time: '12:15',
    },
    {
      id: 4,
      sender: 1,
      mess: 'Ok hay gap mat nhe! 4',
      type: 'text',
      time: '12:30',
    },
  ]);

  const renderMessageItem = ({item}) => (
    <View style={styles.messageItemWrapper}>

      <View style={styles.messageItem}>
        <Text style={styles.messageText}>{item.mess}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.allWrapper, styles.allChatWrapper]}>
      {/* Header  */}
      <View style={styles.headerChatBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector.png')}></Image>

        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerBtn}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}></IconAntDesign>
          </TouchableOpacity>

          {/* info */}
          <View style={styles.headerInfoWrapper}>
            <View style={styles.headerAvtWrapper}>
              <Image
                style={styles.headerAvt}
                source={require('../assets/avtlpd.png')}></Image>

              {status == true && (
                <View style={styles.headerStatusWrapper}>
                  <View style={styles.headerStatus}></View>
                </View>
              )}
            </View>

            <View style={styles.headerDesWrapper}>
              <View style={styles.headerNameWrapper}>
                <Text style={styles.headerNameText}>{name}</Text>
              </View>

              <View style={styles.headerTimeWrapper}>
                <Text style={styles.headerTimeText}>Online now</Text>
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
            keyExtractor={item => item.id.toString()}
            renderItem={renderMessageItem}
          />
        </View>
        {/* Khung nhac nguoi khac dang go */}
        {isTyping == true && (
          <View style={styles.chatTypingWrapper}>
            <View style={styles.chatTypingAvtWrapper}>
              <Image
                style={styles.chatTypingAvt}
                source={require('../assets/avtlpd.png')}></Image>
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
            <TouchableOpacity style={styles.chatAddBtnWrapper}>
              <IconAntDesign
                name="plus"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color="#fff"></IconAntDesign>
            </TouchableOpacity>

            <View style={styles.chatInputTextWrapper}>
              <TextInput
                style={styles.chatInputText}
                placeholder="Nhập văn bản"></TextInput>

              <TouchableOpacity style={styles.chatEmojiWrapper}>
                <IconMC
                  name="emoticon-happy"
                  size={0.024 * windowHeight + 0.024 * windowWidth}></IconMC>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
