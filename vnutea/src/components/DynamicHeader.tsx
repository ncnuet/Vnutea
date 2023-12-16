import { Animated, Image, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Header_Max_Height = 300;
const Header_Min_Height = 100;

export default function DynamicHeader({ animHeaderValue, teacher }: { animHeaderValue: Animated.Value, teacher: string }) {
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
        <Animated.View
            className="absolute top-0 left-0 w-full z-50 overflow-hidden"
            style={[{ height: Height }]}
        >
            <View className="bg-green-patel relative rounded-3xl h-full flex flex-row items-center">
                <Animated.Text
                    style={[{ opacity: OpacityInvert }]}
                    className="text-primary font-extrabold text-center w-full text-3xl font-montserrat mt-3">
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
    );
}