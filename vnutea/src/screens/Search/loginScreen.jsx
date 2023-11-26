import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native'
import {
  Animated,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import { ImageBackground } from 'react-native';

import { sLoginScreen } from './loginScreenCss.js';

export default function LoginScreen({ navigation }) {

    return (
        <View style={sLoginScreen.loginBg}>
            <View style={sLoginScreen.loginBgImage}> 
                <View style={{alignItems:"center", justifyContent:"center",height:"70%",width:"38%"}}>
                   <Image source={require('../assets/coffe_icon.png')} style={sLoginScreen.loginBgImageSize}/> 
                </View>
            </View>

            <View style={sLoginScreen.loginAllTextWraper}>
                <View style={sLoginScreen.loginText1View}>
                    <Text style={sLoginScreen.loginText1}>Login to our world</Text>
                </View>

                <View style={sLoginScreen.loginInputWrapper}>
                    {/*Ô Tên Tài Khoản */}
                    <Text style={sLoginScreen.loginText2}>Tên tài khoản</Text>
                    <TextInput style={sLoginScreen.loginInput1} placeholder='Vnu ID'/>

                    {/*Ô Mật Khẩu */}
                    <Text style={sLoginScreen.loginText2}>Mật khẩu</Text>
                    <TextInput style={sLoginScreen.loginInput2} placeholder='Password' secureTextEntry={true}>   
                    </TextInput>

                    {/* Nút Quên mật khẩu */}
                    <View style={sLoginScreen.forgotPasswordWrapper}>
                      <TouchableOpacity
                       onPress={() => {
                        navigation.navigate('ForgotPassword')
                       }}
                      >
                        <Text style={sLoginScreen.forgotPasswordWrapperText} >Quên mật khẩu?</Text>
                      </TouchableOpacity>  
                    </View>

                    <View style={sLoginScreen.loginButtonWrapper}>
                        {/* Nút Đăng Nhập */}
                        <TouchableOpacity style={sLoginScreen.loginButton}>
                            <Text style={sLoginScreen.loginButtonText}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={sLoginScreen.registerButtonWrapper}>
                    <Text style={sLoginScreen.textBtn}>
                        Bạn chưa có tài khoản?
                    </Text>

                    {/* Nút Đăng Ký */}
                    <TouchableOpacity style={sLoginScreen.registerButton}>
                        <Text style={sLoginScreen.registerButtonText}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>

                <View style={sLoginScreen.AllBtnWrapper}>

            </View>

                {/* Phần Trống để Đẩy nút đăng nhập cao lên */}
                <View style={sLoginScreen.Empty}>

                </View>
            </View>


        </View>
    )
}