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


export default function Onboarding2({ navigation }) {

  return (
    <View style={
      styles.Onboarding2
    }>

      <View id="1" style={styles.Onboarding2Background}>
        <Image source={require('../assets/bg2.png')} style={styles.Onboarding2_backgroundImage} />
      </View>

      <View id="2" style={styles.Onboarding2HubView}>

      </View>

      <View id="3" style={styles.Onboarding2TextView}>
        <Text style={styles.Onboarding2Text1}>
          Trang cá nhân chuyên nghiệp
        </Text>

        <Text style={styles.Onboarding2Text2}>
          Là nơi giúp giảng viên giới thiệu về cá nhân
        </Text>

        <Text style={styles.Onboarding2Text2}>
          cho đồng nghiệp và sinh viên
        </Text>
      </View>

      <View id="4" style={styles.Onboarding2ButtonView}>
        <TouchableOpacity style={styles.Onboarding2Button} 
         onPress={() => {
          navigation.navigate('Ob3');
         }}
        >
          <Text style={styles.Onboarding2ButtonText}>Tiếp tục</Text>
        </TouchableOpacity>

      </View>

    </View>
    )
}