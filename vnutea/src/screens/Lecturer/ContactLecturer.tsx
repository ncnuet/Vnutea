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

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '@/components/Header';
import { StackHomeProp } from '@/ContactStackNavigator';

interface IProps extends StackHomeProp<"ContactScreen"> { }

const ContactLecturer = ({ navigation, route }: IProps) => {
    const user = route.params.user;
    const [linkApp, setLinkApp] = useState("vnuteaapp://teacher/" + user.id)

    const onShare = async () => {
        try {
            await Share.share({ message: linkApp });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <View className=''>
            <Header name={user.name} />

            <ScrollView>
                <View className='flex flex-col items-center mt-10'>
                    <View className='p-3 rounded-xl bg-gray-200'>
                        <Image
                            className='h-48 w-48'
                            source={{
                                uri: `https://api.qrserver.com/v1/create-qr-code/?data=${linkApp}&size=100x100`
                            }} />
                    </View>
                    <Text className='text-primary font-montserrat mt-4 mx-7 font-semibold'>
                        Quét mã QR hoặc chia sẻ link dưới đây để bất cứ ai cũng đều có thể xem profile
                    </Text>
                    <TouchableOpacity
                        onPress={() => { onShare() }}
                        className='mx-7 rounded-lg bg-blue-100 p-3 my-5'>
                        <Text className='text-blue-500 font-semibold font-montserrat'>{linkApp}</Text>
                    </TouchableOpacity>
                </View>

                <View className='p-7 pb-0'>
                    <View className='bg-gray-200 p-5 rounded-2xl'>
                        {user.contact.phones.map((item, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() => Linking.openURL(`tel:${item}`)}
                                className='flex flex-row items-center mb-2'>
                                <Icon name='call-outline' color="#19253D" size={25} />
                                <Text className='font-semibold text-primary ml-3'>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className='p-7 pb-0'>
                    <View className='bg-gray-200 p-5 rounded-2xl'>
                        {user.contact.emails.map((item, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() => Linking.openURL(`mailto:${item}`)}
                                className='flex flex-row items-center'>
                                <Icon name='at-outline' color="#19253D" size={25} />
                                <Text className='font-semibold text-primary ml-3'>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className='h-36'></View>
            </ScrollView>
        </View>
    );
};

export default ContactLecturer;