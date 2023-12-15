import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AppointmentChat = (props: { text: string , imageLink : string}) => {
  const navigation1 = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation1.navigate('Messanger')}>
    <View style={styles.item}>
        <Image style = {styles.square}  source={{uri : props.imageLink}} />
        <Text style={styles.itemText}>Bạn đang đặt lịch gặp thầy <Text style={styles.itemName}>{props.text}</Text>, hãy nhắn tin cho thầy nhé
        </Text>
        <View style={styles.borderMess}>
            <Text style={styles.textMess} >Nhắn tin cho thầy</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item: {
        height: 100,
        backgroundColor: '#F7F8F8',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D9E8ED',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: '5%',
        marginRight: '5%',
    },
    square: {
        position: 'absolute',
        left: 10,
        width: 60,
        height: 60,
        borderRadius: 20,
        marginRight: 15,
    },
    itemText: {
        position: 'absolute',
        left: 80,
        top: 20,
        maxWidth: '70%',
        color: '#19253D',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '600',
        wordWrap: 'break-word',
    },
    itemName: {
        color: '#77C9A3',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '800',
        wordWrap: 'break-word',
    },
    borderMess: {
        width: 120,
        height: 20,
        position: 'absolute',
        left: 80,
        top: 60,
        backgroundColor: '#77C9A3A6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMess: {
        color: 'white',
fontSize: 13,
fontFamily: 'Lato',
fontWeight: '700',
wordWrap: 'break-word',
    }
});

export default AppointmentChat;