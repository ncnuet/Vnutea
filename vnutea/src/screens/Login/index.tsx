import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather"
import axios from '@/service/axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/routing';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation, route }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      setIsLoading(true)
      const response = await axios.get("/me");
      if (response.status === 200) {
        const user = response.data.data;
        console.log(user);
        AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.replace("MainRootApp")
      }
      setIsLoading(false);
    }

    if (route.params && !route.params.isLogout) checkLogin();
  }, [])

  const login = async () => {
    if (username.trim() !== '' && password.trim() !== '') {
      setIsLoading(true);

      try {
        const response = await axios.post("/auth/login",
          { username, password, remember: true });

        if (response.status === 200) {
          setIsLoading(false);
          navigation.replace('MainRootApp')
        } else {
          Alert.alert("Login failed");
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert("Login failed");
        setIsLoading(false);
      }
    }
  };

  return (
    <View className='flex flex-col h-full bg-primary justify-center items-center p-7'>
      <StatusBar animated translucent backgroundColor={'transparent'} />
      <Spinner visible={loading} />
      <Icon name='coffee' color="white" size={100} />

      <Text
        className='font-montserrat text-4xl font-semibold my-2 text-secondary'>
        Welcome
      </Text>

      <View className='w-full mt-10 font-montserrat'>
        <View className='w-full mb-3'>
          <Text className='mb-2 text-white'>Tên đăng nhập</Text>
          <View className='w-full flex flex-row items-center bg-gray-50 rounded-xl px-3 h-16'>
            <TextInput
              className='font-montserrat text-primary text-lg flex-grow'
              placeholderTextColor="gray"
              placeholder="username"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="username"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
        </View>

        <View className='w-full mb-3'>
          <Text className='mb-2 text-white'>Mật khẩu</Text>
          <View className='w-full flex flex-row items-center bg-gray-50 rounded-xl px-3 h-16'>
            <TextInput
              placeholderTextColor="gray"
              className='font-montserrat text-primary text-lg flex-grow'
              placeholder="password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!viewPassword}
              textContentType="password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity>
              <Icon
                name={viewPassword ? 'eye' : 'eye-off'}
                size={25}
                color="gray"
                onPress={() => setViewPassword((view) => !view)} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <TouchableOpacity
        className='w-full h-16 bg-blue-sea rounded-xl flex justify-center items-center mt-10'
        onPress={login}>
        <Text className='text-primary text-xl font-montserrat font-semibold'>Login</Text>
      </TouchableOpacity>
    </View>
  );
}