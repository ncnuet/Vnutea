import { useNavigation } from "@react-navigation/native";
import { Animated, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Header_Max_Height = 300;
const Header_Min_Height = 100;

export default function DynamicHeader(
    { animHeaderValue, teacher }: { animHeaderValue: Animated.Value, teacher: string }) {
    const navigation = useNavigation();

    const Height = animHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp'
    })

    const Opacity = animHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const OpacityInvert = animHeaderValue.interpolate({
        inputRange: [0, 0, Header_Max_Height - Header_Min_Height],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })

    return (
        <View className="relative">
            <View className="mx-10 mt-10 absolute z-50">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='return-up-back-outline' size={30} color="#19253D" />
                </TouchableOpacity>
            </View>

            <Animated.View
                className="absolute z-40 top-0 left-0 w-full overflow-hidden"
                style={[{ height: Height }]}
            >
                <View className="bg-green-patel relative rounded-3xl h-full flex flex-row items-center">
                    <Animated.Text
                        style={[{ opacity: OpacityInvert }]}
                        className="text-primary font-extrabold w-full text-3xl font-montserrat mt-3 ml-24">
                        {teacher}
                    </Animated.Text>

                    <View className="absolute top-0 left-0 -z-10">
                        <Icon
                            name='leaf'
                            size={400}
                            color="#77C9A3"
                        />
                    </View>
                    <Animated.Image
                        style={[{ opacity: Opacity }]}
                        source={require("@/assets/people2.png")}
                        className='absolute bottom-0 right-16'
                    />
                </View>
            </Animated.View>
        </View >
    );
}