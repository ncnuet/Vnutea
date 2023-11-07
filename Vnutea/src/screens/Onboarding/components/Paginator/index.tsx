import { ISlideType } from "@/constants/onboarding.data";
import { Animated, View, useWindowDimensions } from "react-native";

interface IProps {
    data: ISlideType[],
    scrollX: Animated.Value
}

export default function Paginator({ data, scrollX }: IProps) {
    const { width } = useWindowDimensions()

    return (
        <View className="flex flex-row h-[64] justify-center">
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                });

                return (
                    <Animated.View
                        className="h-[10] rounded-full bg-secondary my-5 mx-2"
                        style={[{ width: dotWidth, opacity }]}
                        key={i.toString()} >

                    </Animated.View>
                )
            })}
        </View >
    )
}