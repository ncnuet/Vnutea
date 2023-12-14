import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Logo from '@/components/Logo';
import { AuthContext } from '@/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '@/context/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function Login({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('');

  const login = () => {
    if (username !== '' && password !== '') {
      // setIsLoading(true);
      
      axios
        .post(`${BASE_URL}/auth/login`, {
          username: username,
          password: password,
          remember: true,
        })
        .then(res => {
          let userInfo = res.data;
          console.log(userInfo);
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          navigation.replace('MainRootApp');
          // setIsLoading(false);
        })
        .catch(() => {
          Alert.alert('Invalid email or password', '', [
            // The "Yes" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: 'Yes',
            },
          ]);
          return console.log(`Login error ${e}`);
          // setIsLoading(false);
        });
    } else {
      return Alert.alert('Enter email or password', '', [
        // The "Yes" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'Yes',
        },
      ]);
    }
  };

  function nextSignup() {
    navigation.push('Signup');
  }

  return (
    <View style={styles.container}>
      {/* <Spinner visible={isLoading} /> */}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Logo />
        <Text
          style={styles.title}
          className='font-montserrat'>
          Welcome
        </Text>

        <Text className='mb-2 text-white'>Tên đăng nhập</Text>
        <TextInput
          className='font-montserrat text-primary'
          placeholderTextColor="gray"
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <Text className='mb-2 text-white'>Mật khẩu</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          className='font-montserrat text-primary'
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity
          title="Login"
          style={styles.button}
          onPress={login}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>
            {' '}
            Log In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#92D5E6',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 19,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#19253D',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#92D5E6',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
});
