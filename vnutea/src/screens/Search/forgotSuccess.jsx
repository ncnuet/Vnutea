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

export default function ForgotSuccess({ route, navigation }) {
    const {email} = route.params;

    return (
        <SafeAreaView style={styles.container}>
             {/* Icon coffe */}
             <View style={styles.iconWrapper}>
                <Image source={require('../assets/coffe_icon.png')}  style={styles.icon} />    
            </View>

            {/* Text Header */}
            <View style={styles.textPassWrapper}>
                <Text style={styles.textPass}>
                    Xác nhận thành công!
                </Text>
            </View>

             {/* Des */}
             <View style={styles.textEmailWrapper}>
                {/* Dong nhac */}
                <Text style={styles.textEmail}>
                    Chúng tôi đã gửi yêu cầu lấy lại mật khẩu đến địa chỉ email:
                </Text>

                {/* Email cua nguoi dung */}
                <Text style={styles.textEmail}>
                    {email}
                </Text>

                <Text style={styles.textEmail}>
                    Vui lòng kiểm tra hòm thư của bạn để nhận mật khẩu mới!
                </Text>
            </View>

            {/* Nut xac nhan */}
            <View style={styles.btnWrapper}>
               <TouchableOpacity style={styles.btn}
                onPress = {() => {
                    navigation.pop(2)
                }}
               >
                    <Text style={styles.btnText}>
                         VỀ TRANG ĐĂNG NHẬP
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
        height: 0.20 * windowHeight,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 0.05 * windowWidth,
        paddingRight: 0.05 * windowWidth,
        //borderWidth: 1,
        //borderColor: "red",
    },
    textEmail: {
        fontSize: 17,
        color: "#CDE1F2",
        marginBottom: 6,
    },
    btnWrapper: {
        width: 0.8 * windowWidth,
        height: 0.10 * windowHeight,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 0.1 * windowWidth,
        marginRight: 0.1 * windowWidth,
        flexDirection: "row",
        // borderWidth: 1,
        // borderColor: "red",
    },  
    btn: {
        //borderWidth: 1,
        // borderColor: "red",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: "64%",
        width: "64%",
        backgroundColor: "#92D5E6",
    },
    btnText: {
        color: "#163A5B",
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