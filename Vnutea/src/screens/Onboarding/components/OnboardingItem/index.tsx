import { ISlideType } from "@/constants/onboarding.data";
import { Image, Text, View, useWindowDimensions } from "react-native"

interface IProps {
    data: ISlideType
}

export default function OnboardingItem({ data }: IProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={[{ width }]} className="flex flex-col">
            <Image alt="illustration photo" source={data.image} className="w-full flex-shrink object-none object-bottom" />

            <View className="p-7">
                <Text
                    className={"text-center text-xl font-bold font-montserrat mb-5 text-white"}>
                    {data.title}
                </Text>

                <Text className={"text-center text-sm font-semibold font-lato text-white"}>
                    {data.description}
                </Text>
            </View>
        </View>
    )
}