import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TaskChat = (props: { name: string , imageLink : string, messanger: string, time: string, numberNotification: string,}) => {
  const navigation1 = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation1.navigate('Messanger')}>
    <View style={styles.item}>
        <Image style = {styles.square}  source={{uri : props.imageLink}} />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemMess}>{props.messanger}</Text>
        <Text style={styles.textTime}>{props.time}</Text>
        <View style={styles.circular}>
          <Text style={styles.number}>{props.numberNotification}</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
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
  itemName: {
    position: 'absolute',
    left: 80,
    top: 14,
    maxWidth: '80%',
    color: '#19253D',
    fontSize: 20,
    fontFamily: 'Lato',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  itemMess: {
    position: 'absolute',
    left: 80,
    top: 45,
    color: '#7B8190',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: '500',
    wordWrap: 'break-word',
  },
  textTime: {
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#7B8190',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  circular: {
    position: 'absolute',
    right: 20,
    top: 40,
    width: 16,
    height: 16,
    backgroundColor: '#FF7070',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
});

export default TaskChat;