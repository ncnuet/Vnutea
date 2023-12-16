import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import IconComment from '../Lecturer/IconComment';

const TaskComment = (props: {text: string}) => {

  return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <Image style={styles.avatar} source={{ uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2019/04/02/cd273738c1c623987ad7.jpg' }}></Image>
          <Text style={styles.nameUser}>{props.text}</Text>
          <View style={styles.icon}>
            <IconComment />
          </View>
          <Text style={styles.time}>3 giờ trước</Text>
        </View>
        <View >
          <Text style={styles.itemText}>Xuan-Tu Tran received a B.Sc. degree in 1999 from Hanoi University of Science and a M.Sc. degree in 2003 from Vietnam National University, Hanoi, all in Electronics Engineering and Communications; and a Ph.D. degree in 2008 from Grenoble INP (in collaboration with the CEA-LETI), France, in Micro Nano Electronics.</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  item: {
    width: '90%',
    backgroundColor: '#D9D9D9',
    padding: 5,
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  itemTop: {
    width : '100%',
    height : 50,
  },
  avatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  nameUser: {
    position: 'absolute',
    left: 50,
    top: 5,
    color: '#19253D',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: 13.25,
    letterSpacing: 0.28,
    wordWrap: 'break-word',
  },
  icon: {
    position: 'absolute',
    left: 50,
    top: 20,
  },
  time: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#7B8190',
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: 13.25,
    letterSpacing: 0.20,
    wordWrap: 'break-word',
  },
  itemText: {
    maxWidth: '100%',
    color: '#7B8190',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: 13.25,
    letterSpacing: 0.24,
    wordWrap: 'break-word',
  },
});


export default TaskComment;