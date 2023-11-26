import { Image, TouchableOpacity, View, Text } from 'react-native'
import { styles } from './styles.js'
import {
  Animated,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useRef} from 'react';
import myConstant from '../assets/constant.js';

export default function Onboarding1({ navigation }) {

  return (
    <View style={
        styles.Onboarding1
    }>
      
        <View id="1" style={styles.Onboarding1Background}>
          <Image source={require('../assets/bg.png')} style={styles.Onboarding1_backgroundImage} />
        </View>

        <View id="2" style={styles.Onboarding1HubView}>

        </View>

        <View id="3" style={styles.Onboarding1TextView}>
          <Text style={styles.Onboarding1Text1}>
            Chào mừng đến với Vnutea
          </Text>

          <Text style={styles.Onboarding1Text2}>
            Ứng dụng là nơi giúp các bạn sinh viên
          </Text>

          <Text style={styles.Onboarding1Text2}>
            tìm kiếm thông tin giảng viên
          </Text>
        </View>

        <View id="4" style={styles.Onboarding1ButtonView}>
          <TouchableOpacity style={styles.Onboarding1Button} 
           onPress={() => {
             navigation.navigate('Ob2');
           }}
          >
            <Text style={styles.Onboarding1ButtonText}>Tiếp tục</Text>
          </TouchableOpacity>

        </View>
     
    </View>
  )
}