import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const DATA = [
    {
      id: '1',
      name: 'Lê Phê Đô',
      position: 'Truong nhom',
      department: 'Công nghệ thông tin',
      url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
    },
    {
      id: '2',
      name: 'Le Phe Do',
      position: 'Truong nhom',
      department: 'Công nghệ thông tin',
      url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg'
    },
    {
      id: '3',
      name: 'Le Phe Do',
      position: 'Truong nhom',
      department: 'Công nghệ thông tin',
      url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
    },
    {
        id: '4',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
      },
  ];
  
  type ItemProps = {name: string,position: string,department: string, url: string};
  const Item = ({name,position,department ,url}: ItemProps) => {
    const navigation3 = useNavigation();
    return (
    <TouchableOpacity style={styles.item} onPress={() => navigation3.navigate('Lecturer')}>
      <Text style={styles.title}>{name}</Text>
      <Text>{position}</Text>
      <Text>{department}</Text>
      <Image style = {styles.avatar}  source={{uri:url}} />
    </TouchableOpacity>
    )
  };
  
const LecturerFavorite = () => {
    return (
            <View style={styles.container}>
                <FlatList
                    horizontal={true}
                    data={DATA}
                    renderItem={({ item }) => <Item name={item.name} position={item.position} department={item.department} url={item.url}/>}
                    keyExtractor={item => item.id}
                />
            </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: 160,
    },
    item: {
      width: 300, 
      borderRadius: 20,
      backgroundColor: '#ACDFB2',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    title: {
      fontSize: 32,
    },
    avatar: {
        position: 'absolute',
        top: 25,
        right: 15,
        width: 80,
        height:80,
        borderRadius: 20,
    }
  });
  
  export default LecturerFavorite;