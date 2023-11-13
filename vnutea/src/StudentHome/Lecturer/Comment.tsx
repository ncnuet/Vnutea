import React, { useState } from 'react';
import { ScrollView,View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard, Platform } from 'react-native';
import TaskComment from './TaskComment';
const Comment = () => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    
    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
      }
  return (
    <View style={styles.container}>
        <View style={styles.tasksComment}>
        <Text style={styles.sectionTitle}>Bình luận</Text>
        <ScrollView>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
            return (
                <TouchableOpacity key={index}>
                  <TaskComment text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
        </ScrollView>
      </View>
        {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeComment}
      >
        <TextInput style={styles.input} placeholder={'Viết bình luận'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addComment}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
      },
      tasksComment: {
        position: 'absolute',
        top: 150,
      },
      sectionTitle: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold'
      },
      items: {
        marginTop: 10,
      },
      writeComment: {
        position: 'absolute',
        top: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: '70%',
      },
      addComment: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
      addText: {},
});

export default Comment;