import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  ScrollViewView,
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
import {AuthContext} from '@/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL} from '@/context/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {ScrollView} from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Logo />
      <Text>Hieue</Text>
      <Text>Hieue</Text>
      <Text>Hieue</Text>
      <Text>Hieue</Text>

      <Text>Hieue</Text>
      <Text>Hieue</Text>
      <Text>Hieue</Text>
      <Text>Hieue</Text>
      <Text>Hieue</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
