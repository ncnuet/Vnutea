import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, _Image, Button } from 'react-native';
import HomeScreen from '../HomeScreen';
import { useNavigation } from '@react-navigation/native';
const DATA = [
    {
        id: '1',
        name: 'Lê Phê Đô',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.8',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
        favorite: false,
    },
    {
        id: '2',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.2',
        url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg',
        favorite: false,
    },
    {
        id: '3',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.1',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
        favorite: false,
    },
    {
        id: '4',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.0',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
        favorite: true,
    },
    {
        id: '5',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.1',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
        favorite: false,
    },
    {
        id: '6',
        name: 'Le Phe Do',
        position: 'Truong nhom',
        department: 'Công nghệ thông tin',
        star: '4.0',
        url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
        favorite: false,
    },
];

type ItemProps = { name: string, position: string, department: string, url: string, star: string,favorite: boolean};
const Item = ({ name, department, url, star,favorite }: ItemProps) => {
    const navigation2 = useNavigation();
    const [likes, setLikes] = useState(require('../image/love.png'));
    const [isClicked, setIsClicked] = useState(favorite);

    const handleClick = () => {
        if (isClicked) {
            setLikes(require('../image/loved.png'));
        } else {
            setLikes(require('../image/love.png'));
        }
        setIsClicked(!isClicked);
    };
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation2.navigate('Lecturer')}>
            <Text style={styles.title}>Thầy {name}</Text>
            <Text style={styles.titleUnder}>{department}</Text>
            <Image style={styles.avatar} source={{ uri: url }} />
            <Image style={styles.star} source={require('../image/Star.png')} />
            <Text style={styles.textStar}>{star}</Text>
            <View style={styles.border1}><Text style={styles.textBorder1}>GV Xuất sắc TB</Text></View>
            <TouchableOpacity style={styles.circular} onPress={handleClick}>
                <Image style = {styles.imageLove} source={likes}></Image>
            </TouchableOpacity>
        </TouchableOpacity>
    )
};


const TaskLecturer = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item name={item.name} position={item.position} department={item.department} url={item.url} star={item.star} favorite = {item.favorite} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    item: {
        height: 80,
        width: '95%',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        position: 'absolute',
        left: 70,
        color: '#263257',
        fontSize: 20,
        fontFamily: 'Montserrat Alternates',
    },
    titleUnder: {
        position: 'absolute',
        top: 25,
        left: 70,
        color: '#263257',
        fontSize: 14,
        fontFamily: 'Montserrat Alternates',
    },
    avatar: {
        position: 'absolute',
        top: 5,
        left: 10,
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    star: {
        position: 'absolute',
        top: 60,
        left: 15,
        width: 15,
        height: 15,
    },
    textStar: {
        position: 'absolute',
        top: 61,
        left: 35,
        width: 15,
        height: 15,
        fontSize: 10,
    },
    border1: {
        position: 'absolute',
        top: 50,
        left: 70,
        backgroundColor:'#79E28AA6',
        height:20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBorder1: {
        marginLeft: 10,
        marginRight:10,
    },
    circular: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 30,
        height: 30,
    },
    imageLove: {
        width:30,
        height:30,
    }
});

export default TaskLecturer;