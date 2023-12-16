import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, _Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import { Department, Teacher } from '@/types';

type ItemProps = { name: string, department: string, url: string, favorite: boolean };
const Item = ({ name, department, url, favorite }: ItemProps) => {
    const navigation2 = useNavigation();
    const [isClicked, setIsClicked] = useState(favorite);
    const handleClick = () => {
        setIsClicked(!isClicked);
        favorite = !favorite;
    };
    return (
        <TouchableOpacity
            className='h-fit w-full mb-3 bg-white rounded-2xl p-3 flex flex-row'>
            <View className='flex flex-col items-center'>
                <Image
                    className='h-14 w-14 rounded-xl'
                    source={{ uri: url }} />
                <View className='flex flex-row mt-1 items-center'>
                    <Icon name='feed-heart' color={"#FF7070"} size={16} />
                    <Text className='ml-2 text-sm text-primary'>4.8</Text>
                </View>
            </View>
            <View className='ml-3 flex-grow'>
                <View className='flex flex-row'>
                    <View className='flex-grow'>
                        <Text className='font-montserrat font-bold text-primary text-xl'>{name}</Text>
                        <Text className='font-lato text-gray-400 text-sm -mt-1'>{department}</Text>
                    </View>
                    <TouchableOpacity
                        className='p-2'
                        onPress={handleClick}>
                        <Icon name='flame' size={25} color={"red"} />
                    </TouchableOpacity>
                </View>
                <View className='mt-2 flex flex-row'>
                    <Text className='text-primary font-lato text-sm bg-green-patel w-fit rounded-full px-2'>GV Xuất sắc TB</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

interface IProps {
    depName: Department[]
    data: Teacher[]
}

export function TaskLecturer({ data, depName }: IProps) {
    return (
        <FlatList
            className='mx-5 mt-5'
            data={data}
            renderItem={({ item }) =>
                <Item
                    name={item.name}
                    department={
                        depName.filter(dep => dep.id === item.department).length > 0
                            ? depName.filter(dep => dep.id === item.department)[0].name
                            : "CNTT"
                    }
                    url={"https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"}
                    favorite={item.liked} />}
            keyExtractor={item => item.id}
        />
    );
};

export default TaskLecturer;