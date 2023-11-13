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
import Task from './task';

function messanger() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <ImageBackground source={require('./image/Vector.png')} style={{flex: 1,}}>
          <TouchableOpacity style = {styles.roundButton} >
            <Image source = {require('./image/arrowleft.png')} />
          </TouchableOpacity>
          <Image style = {styles.avtar} source= {  {uri: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg'} }></Image>
          <Text style = {styles.textPostion}>Le Quang Do</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  containerTop: {
    position: "absolute",
    width: '100%',
    height: 60,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#77C9A3',
  },
  roundButton: {
    position: 'absolute',
    left: 20,
    bottom: '10%',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FFFFFF80',
  },
  avtar: {
    position: 'absolute',
    left: 80,
    width: 40,
    height: 40,
    bottom: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  textPostion: {
    position: 'absolute',
    left: 140,
    bottom: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#19253D',
  },
});
export default messanger;