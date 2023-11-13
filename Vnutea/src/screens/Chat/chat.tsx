
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

function chat() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <ImageBackground source={require('./image/Vector.png')} style={{flex: 1,}}>
          <TouchableOpacity style = {styles.roundButton} >
            <Image source = {require('./image/arrowleft.png')} />
          </TouchableOpacity>
          <Text style = {styles.textPostion}>Chat</Text>
        </ImageBackground>
      </View>
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.sreachFrame}
        > 
         <TextInput style={styles.input} placeholder={'Search'} />
        </KeyboardAvoidingView>
        <ScrollView  keyboardShouldPersistTaps='handled'>
          <Task  text={"Bạn có một cuộc hẹn với Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} />
          <Text style= {{ fontSize: 24, marginLeft: 30}}>Chat</Text>
          <Task  text={"Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} /> 
          <Task  text={"Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} /> 
          <Task  text={"Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} /> 
          <Task  text={"Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} /> 
          <Task  text={"Le Quang Do"} imageLink = {"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"} /> 
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
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FFFFFF80',
  },
  textPostion: {
    position: 'absolute',
    left: 60,
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#19253D',
  },
  sreachFrame: {
    marginTop: 80,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 333,
  },
});
export default chat;