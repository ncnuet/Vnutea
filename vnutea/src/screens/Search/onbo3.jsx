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

export default function Onboarding3({ navigation }) {

    return (
        <View style={
              styles.Onboarding3   
        }>

            <View id="1" style={styles.Onboarding3Background}>
                <Image source={require('../assets/bg3.png')} style={styles.Onboarding3_backgroundImage} />
            </View>

            <View id="2" style={styles.Onboarding3HubView}>

            </View>

            <View id="3" style={styles.Onboarding3TextView}>
                <Text style={styles.Onboarding3Text1}>
                    Hiểu hơn về lớp môn học
                </Text>

                <Text style={styles.Onboarding3Text2}>
                    Các đánh giá của sinh viên trước về chất lượng
                </Text>

                <Text style={styles.Onboarding3Text2}>
                    môn học, những lưu ý và điều những điều cần
                </Text>

                <Text style={styles.Onboarding3Text2}>
                    chuẩn bị để đạt được kết quả tốt
                </Text>
            </View>

            <View id="4" style={styles.Onboarding3ButtonView}>
                <TouchableOpacity style={styles.Onboarding3Button} 
                 onPress={() => {
                    navigation.navigate('Login')
                 }}
                >
                    <Text style={styles.Onboarding3ButtonText}>Đã hiểu!</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}