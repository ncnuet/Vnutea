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
    KeyboardAvoidingView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import DynamicHeader from "@/components/DynamicHeader";
import { StudentStackParamList } from '@/types/routing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Info from '@/components/Infor';

interface Props extends NativeStackScreenProps<StudentStackParamList, 'LabScreen'> {

};

export default function Lab({ navigation, route }: Props) {
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Promise
            .all([])
            .finally(() => setRefreshing(false))
    }, []);

    return (
        <KeyboardAvoidingView
            behavior='padding'
            className='bg-white min-h-screen'>
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
                            <Text className='text-xl text-blue-500 font-lato font-semibold'>Phòng nghiên cứu</Text>
                            <Text className='text-primary text-3xl font-montserrat font-extrabold'>An toàn mạng</Text>
                        </View>

                        <View className='flex flex-row gap-2'>
                            <TouchableOpacity>
                                <Icon name='share-social-outline' size={30} color={"#19253D"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='text-gray-400 pt-2 font-lato'>
                        Giảng viên bộ bôn toán đại cương, đã có hơn 30 năm đứng trên cương vị giảng dạy với bề dày thành tích đáng tự hào
                    </Text>

                    <View className='flex flex-row gap-3 py-4'>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("TeacherList") }}
                            className='bg-blue-400 p-2 rounded-2xl'>
                            <Icon name='briefcase-outline' color="white" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("tel:0123456789") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='accessibility-outline' color="white" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("tel:0123456789") }}
                            className='bg-primary p-2 rounded-2xl'>
                            <Icon name='ellipsis-horizontal-outline' color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Info />
                <View className='h-24' />
            </ScrollView>
        </KeyboardAvoidingView>
    )
};