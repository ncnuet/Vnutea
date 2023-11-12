import React,{useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import TaskChat from './taskChat';
import AppointmentChat from '../ComponentHomeScreen/appointmentChat';
const DataMessanger = [
  {
    id: '1',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '2',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '3',
    name: 'Lê Phê Đô',
    messanger: 'Cau an com chua',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '4',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '5',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '40',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '6',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '7',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '8',
    name: 'Lê Phê Đô',
    messanger: 'Hi! Chao cau',
    time: '3m',
    numberNotification: '4',
    imageLink: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
];
type MessangerData = { name: string, messanger: string, time: string, numberNotification: string, imageLink: string};
const chat = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.sreachFrame}
      >
        <TextInput style={styles.input} placeholder={'Search'} />
      </KeyboardAvoidingView>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <AppointmentChat text={"Le Quang Do"} imageLink={"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} />
        <Text style={styles.text}>Chat</Text>
        <FlatList
          data={DataMessanger}
          renderItem={({ item }) => <TaskChat name={item.name} messanger={item.messanger} time={item.time} numberNotification={item.numberNotification} imageLink={item.imageLink} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  sreachFrame: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F7F8F8',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 333,
  },
  text: {
    color: '#19253D',
    fontSize: 24,
    marginLeft: 30,
  }
});
export default chat;