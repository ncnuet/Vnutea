import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Share,
    Alert,
    Linking,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { StudentStackParamList } from '@/types/routing';

const ContactLecturer = () => {
    const navigation = useNavigation<NavigationProp<StudentStackParamList>>();
    const onShare = async () => {
        Clipboard.setString('hello world');
        try {
            await Share.share({ message: 'vnuteaapp://sdsdcsd' });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <View className=''>
            <View className='bg-green-patel p-5 pt-10 flex flex-row items-center rounded-3xl overflow-hidden'>
                <View className='absolute -top-20 right-0'>
                    <Icon name='leaf' size={300} color="#77C9A3" />
                </View>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    className='ml-3'>
                    <Icon name='return-up-back-outline' size={30} color="#19253D" />
                </TouchableOpacity>
                <View className='flex-grow ml-7'>
                    <Text className='font-montserrat text-2xl font-bold text-primary'>Le Phe Do</Text>
                    <Text className='font-montserrat text-primary font-semibold'>Thông tin liên hệ</Text>
                </View>
            </View>

            <View>
                <View className='flex flex-col items-center mt-10'>
                    <View className='p-3 rounded-xl bg-gray-200'>
                        <Image
                            className='h-48 w-48'
                            source={{
                                uri: `https://api.qrserver.com/v1/create-qr-code/?data=${"vnuteaapp://" + "id"}&size=100x100`
                            }} />
                    </View>
                    <Text className='text-primary font-montserrat mt-4 mx-7 font-semibold'>
                        Quét mã QR hoặc chia sẻ link dưới đây để bất cứ ai cũng đều có thể xem profile của thầy cô
                    </Text>
                    <TouchableOpacity
                        onPress={() => { onShare() }}
                        className='mx-7 rounded-lg bg-blue-100 p-3'>
                        <Text className='text-blue-500 font-semibold font-montserrat'>vnuteaapp://01234</Text>
                    </TouchableOpacity>
                </View>

                <View className='p-7 pb-0'>
                    <View className='bg-gray-200 p-5 rounded-2xl'>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("tel://012345679")}
                            className='flex flex-row items-center mb-2'>
                            <Icon name='call-outline' color="#19253D" size={25} />
                            <Text className='font-semibold text-primary ml-3'>0868893340</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("tel://012345679")}
                            className='flex flex-row items-center'>
                            <Icon name='call-outline' color="#19253D" size={25} />
                            <Text className='font-semibold text-primary ml-3'>0868893340</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='p-7 pb-0'>
                    <View className='bg-gray-200 p-5 rounded-2xl'>
                        <TouchableOpacity className='flex flex-row items-center'>
                            <Icon name='at-outline' color="#19253D" size={25} />
                            <Text className='font-semibold text-primary ml-3'>0868893340</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='p-7 pb-0'>
                    <TouchableOpacity className='bg-gray-200 p-5 rounded-2xl flex flex-row items-center'>
                        <Icon name='at-outline' color="#19253D" size={25} />
                        <Text className='font-semibold text-primary ml-3'>0868893340</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default ContactLecturer;