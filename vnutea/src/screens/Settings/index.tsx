import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
const url =
  'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg';
const name = 'Trương Minh Đức';
const id = '21020304';

const Settings = ({ navigation }) => {
  const [showBox, setShowBox] = useState(true);

  const showConfirmLogout = () => {
    return Alert.alert('Are your sure?', 'Logout', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          navigation.replace('Login', { isLogout: true });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        {/* <Image style={styles.matcuoi} source={require('./image/matcuoi.png')} /> */}
        <Image
          style={styles.imagecontainerTop}
          source={require('./image/coc.png')}
        />
        <Text style={styles.textvnu}>VNUTea</Text>
        {/* <Image style={styles.avatarTop} source={{uri: url}} />
        <Text style={styles.idStudent}>{id}</Text>
        <Text style={styles.nameStudent}>{name}</Text> */}
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.buttonBox}>
          {/* <Image
            style={styles.imageBox}
            source={require('./image/star1.png')}
          /> */}
          <Text style={styles.textBox}>Đánh giá môn học</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox}>
          {/* <Image
            style={styles.imageBox}
            source={require('./image/suitcase.png')}
          /> */}
          <Text style={styles.textBox}>Lớp học của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox}>
          {/* <Image
            style={styles.imageBox}
            source={require('./image/heart.png')}
          /> */}
          <Text style={styles.textBox}>Lớp học của tôi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.buttonBox} onPress={showConfirmLogout}>
          {/* <Image
            style={styles.imageBox}
            source={require('./image/logout.png')}
          /> */}
          <Text style={styles.textLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerTop: {
    height: 140,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFC700',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagecontainerTop: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    width: 30,
    height: 30,
  },
  textvnu: {
    position: 'absolute',
    left: 45,
    bottom: 32,
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
  },
  avatarTop: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 42,
    height: 42,
    borderWidth: 5,
    borderRadius: 40,
  },
  nameStudent: {
    position: 'absolute',
    bottom: 40,
    right: 80,
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '800',
  },
  idStudent: {
    position: 'absolute',
    bottom: 28,
    right: 80,
    color: '#19253D',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '800',
  },
  matcuoi: {
    position: 'absolute',
    right: 40,
    height: '100%',
    width: 250,
  },
  box: {
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
    margin: 20,
  },
  buttonBox: {
    margin: 10,
    height: 50,
    padding: 10,
  },
  imageBox: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  textBox: {
    position: 'absolute',
    left: 50,
    top: 10,
    color: '#19253D',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '600',
    wordWrap: 'break-word',
  },
  textLogout: {
    position: 'absolute',
    left: 50,
    top: 10,
    color: '#FF7070',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '600',
    wordWrap: 'break-word',
  },
});
export default Settings;
