import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Animated,
    RefreshControl,
    Share,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import DynamicHeader from '@/components/DynamicHeader';
import Info from '@/components/Infor';
import { StackHomeProp } from '@/ContactStackNavigator';
import fetch from '@/service/fetching';
import axios from '@/service/axios';
import { ITeacher, ITeacherDetails } from '@/types';
import Award from '@/components/Award';

interface Props
    extends StackHomeProp<"LecturerScreen"> { };

const Default: ITeacherDetails = {
    name: "",
    awards: [],
    department: {
        id: "",
        name: "",
    },
    id: "",
    image: "",
    liked: false,
    description: "",
    contact: {
        emails: [],
        phones: [],
        social: []
    },
    details: []
}
export default function Lecturer({ navigation, route }: Props) {
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    const [teacher, setTeacher] = useState<ITeacherDetails>({ ...Default, id: route.params.id });

    async function getDetail() {
        fetch<{ teacher: ITeacherDetails }>(
            () => axios.get("/teacher/" + route.params.id),
            async (data) => {
                setTeacher(data.teacher)
            }
        )
    }

    async function refresh() {
        setRefreshing(true);
        const [] = await Promise.all([getDetail()])
        setRefreshing(false);
    };

    function handleShare() {
        Share.share({ message: "vnuteaapp://teacher/" + teacher.id });
    }

    function handleLike() {
        if (teacher.liked) {
            fetch(
                () => axios.delete("me/favorite/" + teacher.id)
            )
        } else {
            fetch(
                () => axios.post("/me/favorite", { ref: teacher.id, type: "teacher" })
            )
        }

        setTeacher({ ...teacher, liked: !teacher.liked })
    }

    useEffect(() => {
        refresh();
    }, [])

    return (
        <View className=''>
            <DynamicHeader animHeaderValue={scrollOffsetY} teacher={teacher.name} />
            <ScrollView
                className=''
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh} />}

                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                        { useNativeDriver: false }
                    )}>

                <View className='h-72'></View>
                <View className='p-7'>
                    <View className='flex flex-row'>
                        <View className='flex-grow'>
                            <Text className='text-xl text-blue-500 font-lato font-semibold'>Giảng viên</Text>
                            <Text className='text-primary text-3xl font-montserrat font-extrabold'>{teacher.name}</Text>
                        </View>

                        <View className='flex flex-row gap-2'>
                            <TouchableOpacity onPress={handleShare}>
                                <Icon name='share-social-outline' size={30} color={"#19253D"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLike}>
                                {teacher.liked
                                    ? <Icon name='heart' size={30} color={"red"} />
                                    : <Icon name='heart-outline' size={30} color={"red"} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='text-gray-400 pt-2 font-lato'>{teacher.description}</Text>

                    <Award data={teacher.awards} />

                    <View className='flex flex-row gap-3 py-4'>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`tel:${teacher.contact.phones.length > 0
                                    ? teacher.contact.phones[0] : "012345"}`)
                            }}
                            className='bg-green-400 p-2 rounded-2xl'>
                            <Icon name='call-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`sms:${teacher.contact.phones.length > 0
                                    ? teacher.contact.phones[0] : "012345"}`)
                            }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='mail-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`mailto:${teacher.contact.emails.length > 0
                                    ? teacher.contact.emails[0] : "abc@gmail.com"}`)
                            }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='at-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("DepartmentScreen", { id: teacher.department.id }) }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='hardware-chip-outline' color="white" size={30} />
                        </TouchableOpacity>

                        {/* TODO:  */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ClassScreen", { id: "" }) }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='school-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ContactScreen", { user: teacher }) }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='ellipsis-horizontal-outline' color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    teacher.details.length > 0
                        ? teacher.details.map((item, index) =>
                            <Info title={item.title} content={item.content} key={index.toString()} />
                        )
                        : undefined
                }
            </ScrollView >
        </View >)
};