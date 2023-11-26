import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native'
import {
  Animated,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import { ImageBackground } from 'react-native';
import {Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ForgotpassWord({ navigation }) {
    const [getEmail, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Icon coffe */}
            <View style={styles.iconWrapper}>
                <Image source={require('../assets/coffe_icon.png')}  style={styles.icon} />    
            </View>

            {/* Text Header*/}
            <View style={styles.textPassWrapper}>
                <Text style={styles.textPass}>
                    Lấy lại mật khẩu
                </Text>
            </View>
            {/* Des */}
            <View style={styles.textEmailWrapper}>
                {/* Dong nhac */}
                <Text style={styles.textEmail}>
                    Nhập email mà bạn đã đăng ký để chúng tôi giúp bạn lấy lại mật khẩu:
                </Text>

                {/* Input de nhap Email */}
                <TextInput placeholder='Nhập email của bạn' style={styles.textInput}
                 autoCapitalize='none'
                 value={getEmail}
                 onChangeText={setEmail}
                >
                </TextInput>
            </View>

            {/* 2 Nut quay lai va Xac Nhan */}
            <View style={styles.btnWrapper}>
                {/* Nut xac nhan */}
                <TouchableOpacity style={styles.btnCF}
                 onPress={() => {
                    navigation.navigate('ForgotSuccess',{
                    email: getEmail} )
                 }}
                >
                    <Text style={styles.btnTextCF}>
                        XÁC NHẬN
                    </Text>
                </TouchableOpacity>

                {/* Nut quay lai */}
                <TouchableOpacity style={styles.btn}
                 onPress={() => {
                    navigation.goBack()
                 }}
                >
                    <Text style={styles.btnText}>
                        QUAY LẠI
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

// CSS
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#19253D",
        flex: 1,
    },
    iconWrapper: {
        height: 0.145 * windowHeight,
        width: "100%",
        marginTop: 0.05 * windowHeight,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
    },
    textPassWrapper: {
        width: "100%",
        height: 0.1 * windowHeight,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "red",
    },
    textPass: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
    },
    textEmailWrapper: {
        marginTop: -0.02 * windowHeight,
        width: "100%",
        height: 0.25 * windowHeight,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 0.05 * windowWidth,
        paddingRight: 0.05 * windowWidth,
        // borderWidth: 1,
        // borderColor: "red",
    },
    textEmail: {
        fontSize: 17,
        color: "#88C0EF",
    },
    textInput: {
        marginTop: 0.04 * windowHeight,
        width: "100%",
        borderWidth: 1,
        borderColor: "#2C597F",
        height: 0.055 * windowHeight,
        backgroundColor: "#fff",
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnWrapper: {
        width: 0.8 * windowWidth,
        height: 0.10 * windowHeight,
        justifyContent: "space-between",
        marginLeft: 0.1 * windowWidth,
        marginRight: 0.1 * windowWidth,
        flexDirection: "row",
        //borderWidth: 1,
        // borderColor: "red",
    },  
    btn: {
        //borderWidth: 1,
        // borderColor: "red",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: "64%",
        width: "45%",
        backgroundColor: "#5596CB",
    },
    btnText: {
        color: "#1E2932",
        fontWeight: "bold",
    },
    btnCF: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: "64%",
        width: "45%",
        backgroundColor: "#92D5E6",
    },
    btnTextCF: {
        color: "#163A5B",
        fontWeight: "bold",
    }
})
