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
} from 'react-native';
const url = 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg'
const name = 'Trương Minh Đức'
const id = '21020304'
const StudentScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.imagecontainerTop} source={require('./image/coc.png')} />
        <Text style={styles.textvnu}>VNUTea</Text>
        <Image style = {styles.avatarTop} source={{uri:url}} />
        <Text style={styles.idStudent}>{id}</Text>
        <Text style={styles.nameStudent}>{name}</Text>
      </View>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerTop: {
    height: 100,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFC700',
    justifyContent: 'center',
  },
  imagecontainerTop: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: 10,
    
  },
  textvnu: {
    position: 'absolute',
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
    marginLeft: 45,
  },
  avatarTop: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderWidth: 5,
    borderRadius: 40,
  },
  nameStudent: {
    position: 'absolute',
    top: 30,
    right: 100,
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
  },
  idStudent: {
    position: 'absolute',
    top: 50,
    right: 100,
    color: '#19253D',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '800',
  }
});
export default StudentScreen;