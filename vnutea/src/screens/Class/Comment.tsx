import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard, Platform, FlatList } from 'react-native';
import TaskComment from './TaskComment';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Comment() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [myCmt, setMyCmt] = useState<string>("");

  return (
    <View
      className='mt-10 w-full'>
      <View
        className='bg-gray-100 border-2 border-primary rounded-2xl flex flex-row items-center p-1 px-3 w-full'>
        <TextInput
          className='flex-grow'
          placeholder='Viết bình luận'
          placeholderTextColor="gray"
          value={task}
          onChangeText={() => { }} />

        <TouchableOpacity
          className='ml-3'
          onPress={() => { }}>
          <Icon name="send" size={30} color="#19253D" />
        </TouchableOpacity>
      </View>

      <FlatList
        className='mt-10'
        data={[1, 2]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <TaskComment text={""} />}
      />
    </View >
  )
}
