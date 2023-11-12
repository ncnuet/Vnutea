import React,{useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LecturerFavorite from './ComponentHomeScreen/lecturerFavorite';
import TaskLecturer from './ComponentHomeScreen/TaskLecturer';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerTop} >
        <Image style={styles.imagecontainerTop} source={require('./image/coc.png')} />
        <Text style={styles.textvnu}>VNUTea</Text>
        <TouchableOpacity style={styles.avatarButton}  >
          <Image style = {{width: '100%',height:'100%',borderRadius: 40,}} source={{uri: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellButton} >
          <Image source={require('./image/bell.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.messButton} onPress={() => navigation.navigate('Chat')} >
          <Image source={require('./image/mess.png')}  />
        </TouchableOpacity>
      </View>
      <ScrollView keyboardShouldPersistTaps='handled' style = {{marginTop: 80}}>
        <Text style={styles.textGv}>Giảng viên nổi bật</Text>
        <LecturerFavorite></LecturerFavorite>
        <Text style = {styles.textGv}>Danh sách giảng viên</Text>
        <TaskLecturer></TaskLecturer>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#D9E8ED',
  },
  containerTop: {
    position: "absolute",
    top:10,
    width: '100%',
    height: 50,
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
  avatarButton: {
    position: 'absolute',
    right: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FFFFFF80',
  },
  bellButton: {
    position: 'absolute',
    right: 70,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FFFFFF80',
  },
  messButton: {
    position: 'absolute',
    right: 130,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FFFFFF80',
  },
  textGv: {
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 10,
  },
});
export default HomeScreen;