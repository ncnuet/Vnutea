import React, {useState} from 'react';
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

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function nextHome() {
    if (username !== '' && password !== '') {
      navigation.replace('MainRootApp');
    } else {
    }
  }

  function nextSignup() {
    navigation.push('Signup');
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Logo />
        <Text style={styles.title}>Welcome</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          // autoFocus={true}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={nextHome}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>
            {' '}
            Log In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={nextSignup}>
            <Text style={{color: '#92D5E6', fontWeight: '600', fontSize: 14}}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 40,
  },
});
