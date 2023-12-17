import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export default function Header({ name }: { name: string }) {
    const navigation = useNavigation();

    return (
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
                <Text className='font-montserrat text-2xl font-bold text-primary'>{name}</Text>
                <Text className='font-montserrat text-primary font-semibold'>Thông tin liên hệ</Text>
            </View>
        </View>
    )
}