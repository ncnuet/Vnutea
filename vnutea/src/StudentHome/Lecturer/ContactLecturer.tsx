import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ContactLecturer = () => {
  return (
    <View style={styles.container}>
        <View style={styles.QRview}>
            <View style = {styles.maQr}>
                <Image style={{width:'100%', height:'100%'}} source={require('../image/qrcode.png')}></Image>
            </View>
            <Text style = {styles.textqr}>Quét mã QR hoặc chia sẻ link dưới đây để bất cứ ai cũng đều có thể xem profile của thầy cô</Text>
            <View style = {styles.borderLink}>
                <Text style = {styles.textLink}>app.com/01234</Text>
            </View>
        </View>
        <View style={styles.borderPhone}>
            <View style={styles.viewBorderPhone}>
                <Image style={styles.imageBoderPhone} source={require('../image/phonecall.png')}></Image>
                <Text style={styles.textBoderPhone}>0868893340</Text>
            </View>
            <View style={styles.viewBorderPhone}>
                <Image style={styles.imageBoderPhone} source={require('../image/phonecall.png')}></Image>
                <Text style={styles.textBoderPhone}>0868893340</Text>
            </View>
            <View style={styles.viewBorderPhone}>
                <Image style={styles.imageBoderPhone} source={require('../image/phonecall.png')}></Image>
                <Text style={styles.textBoderPhone}>0868893340</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFF',
    },
    QRview: {
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    maQr: {
        height: 200,
        width: 200,
    },
    textqr: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '700',
    },
    borderLink: {
        margin: 10,
        backgroundColor: '#F7F8F8',
        height: 40,
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLink: {
        color: '#2B7EFF',
        fontSize: 16,
        fontFamily: 'Lato',
        fontWeight: '700',
        wordWrap: 'break-word',
    },
    borderPhone: {
        margin: '5%',
        backgroundColor: '#F7F8F8',
        height: 160,
        width: '90%',
        borderRadius: 20,
    },
    viewBorderPhone: {
        marginTop: 10,
        marginLeft: 10,
        height: 40,
    },
    textBoderPhone: {
        position: 'absolute',
        left: 60,
        top:10,
    },
    imageBoderPhone: {
        width: 40,
        height: 40,
    },
});
export default ContactLecturer;