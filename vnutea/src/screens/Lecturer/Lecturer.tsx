import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Animated,
    RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import DynamicHeader from '@/components/DynamicHeader';
import { StudentStackParamList } from '@/types/routing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Info from '@/components/Infor';

interface Props extends NativeStackScreenProps<StudentStackParamList, 'LecturerScreen'> {

};

export default function Lecturer({ navigation, route }: Props) {
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = React.useCallback(() => {
        console.log("Hello");

        setRefreshing(true);
        Promise
            .all([])
            .finally(() => setRefreshing(false))
    }, []);

    return (
        <View className=''>
            <DynamicHeader animHeaderValue={scrollOffsetY} teacher='Nghia' />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />}
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
                            <Text className='text-primary text-3xl font-montserrat font-extrabold'>LÊ PHÊ ĐÔ</Text>
                        </View>

                        <View className='flex flex-row gap-2'>
                            <TouchableOpacity>
                                <Icon name='share-social-outline' size={30} color={"#19253D"} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='heart-outline' size={30} color={"red"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='text-gray-400 pt-2 font-lato'>
                        Giảng viên bộ bôn toán đại cương, đã có hơn 30 năm đứng trên cương vị giảng dạy với bề dày thành tích đáng tự hào</Text>

                    <FlatList
                        className='mt-2'
                        horizontal
                        data={[1, 2]}
                        renderItem={() =>
                            <Text
                                className='text-primary font-lato text-sm bg-green-patel w-fit rounded-full px-2 mr-3'>GV Xuất sắc TB</Text>}
                        keyExtractor={item => item.toString()}
                    />

                    <View className='flex flex-row gap-3 py-4'>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("tel:0123456789") }}
                            className='bg-green-400 p-2 rounded-2xl'>
                            <Icon name='call-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { Linking.openURL("sms:0123456789") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='mail-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { Linking.openURL("mailto:21020365@vnu.edu.vn") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='at-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ClassScreen") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='school-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("LabScreen") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='hardware-chip-outline' color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ContactScreen") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='ellipsis-horizontal-outline' color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Info />
            </ScrollView>
        </View>)
};