import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RootStackParamList } from "../types/routing";
interface IProps {
    index: number;
}

interface ISlide {
    image: any,
    title: string,
    subtitle: string
}

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

const slides: ISlide[] = [
    {
        image: require("../assets/onboarding_1.png"),
        title: "Chào mừng đến với Vnutea",
        subtitle: "Nơi giúp các bạn sinh viên dễ dàng tìm kiếm thông tin giảng viên, lớp môn học và hơn thế nữa"
    },
    {
        image: require("../assets/onboarding_2.png"),
        title: "Trang cá nhân chuyên nghiệp",
        subtitle: "Nơi giới thiệu bản thân cho đồng nghiệp và sinh viên"
    },
    {
        image: require("../assets/onboarding_3.png"),
        title: "Hiểu hơn về lớp môn học",
        subtitle: "Các đánh giá của sinh viên đã từng học về chất lượng lớp học, những lưu ý và trao đổi để đạt được kết quả tốt nhất"
    }
]

const maxItems = [1, 2, 3];

function Indicator({ index }: IProps) {
    return (
        <View className="w-full my-10">
            <View className="flex gap-3 flex-row mx-auto">
                {maxItems.map((_, _index) => <View
                    key={_index}
                    className={
                        "h-3 rounded-full transition-all " +
                        (index === _index ? "w-14" : "w-3") +
                        (index === 2 ? "bg-primary" : "bg-white")
                    }
                />)
                }
            </View>
        </View>
    )
}

function Onboarding({ navigation }: Props): JSX.Element {
    const [currSlide, setCurrSlide] = useState<number>(0);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    function nextSlide() {
        if (currSlide + 1 <= maxItems.length - 1)
            setCurrSlide(currSlide + 1)
        else {
            navigation.replace("HomeScreen");
        }
    }

    return (
        <View className={"h-full " + (currSlide === 2 ? "bg-secondary" : "bg-primary")}>
            <StatusBar animated translucent backgroundColor={"transparent"} />
            <Image source={slides[currSlide].image} className="w-full" />

            <Indicator index={currSlide} />

            <View className="px-6">
                <Text
                    className={
                        "text-center text-xl font-semibold font-montserrat mb-5 " +
                        (currSlide === 2 ? "text-primary" : "text-white")}>
                    {slides[currSlide].title}
                </Text>

                <Text
                    className={
                        "text-center text-sm font-semibold font-lato " +
                        (currSlide === 2 ? "text-primary" : "text-white")}>
                    {slides[currSlide].subtitle}
                </Text>
            </View>

            <View className="flex items-center absolute bottom-10 left-0 w-full">
                <TouchableOpacity
                    onPress={nextSlide}
                    className={
                        "w-fit py-4 px-20 rounded-full " +
                        (currSlide === 2 ? "bg-primary" : "bg-white")}>
                    <Text
                        className={"font-lato font-semibold text-lg text-center " +
                            (currSlide === 2 ? "text-white" : "text-primary")}>
                        Tiếp tục
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Onboarding;