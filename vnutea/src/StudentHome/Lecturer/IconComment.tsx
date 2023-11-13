import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const IconComment = () => {
  return (
    <View style={styles.view}>
        <Image style={styles.icon} source={require('../image/icon1.png')}></Image>
        <Image style={styles.icon} source={require('../image/icon2.png')}></Image>
        <Image style={styles.icon} source={require('../image/icon3.png')}></Image>
        <Image style={styles.icon} source={require('../image/icon4.png')}></Image>
        <Image style={styles.icon} source={require('../image/icon5.png')}></Image>
        <Text style={styles.textIcon}>Tuyệt vời</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
    icon: {
        height: 20,
        width:20,
        marginRight: 2,
    },
    textIcon: {
        color: '#FFC700',
        fontSize: 12,
        fontFamily: 'Lato',
        fontWeight: '700',
        wordWrap: 'break-word',
    },
});


export default IconComment;