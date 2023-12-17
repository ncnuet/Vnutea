import { useRef, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Comment from "./Comment";

const data = [
    { value: 1, x: require("@/assets/emo1ticked.png"), y: require("@/assets/emo1.png") },
    { value: 3, x: require("@/assets/emo2ticked.png"), y: require("@/assets/emo2.png") },
    { value: 2, x: require("@/assets/emo3ticked.png"), y: require("@/assets/emo3.png") },
    { value: 4, x: require("@/assets/emo4ticked.png"), y: require("@/assets/emo4.png") },
    { value: 5, x: require("@/assets/emo5ticked.png"), y: require("@/assets/emo5.png") },
]

export default function Evaluation() {
    const [value, setValue] = useState(1);

    return (
        <View className="p-7">
            <View className="flex flex-col items-center bg-slate-50 p-5 rounded-2xl">
                <Text className="text-slate-600 text-xl font-semibold font-montserrat">Xếp hạng chung</Text>
                <Text className="text-9xl text-primary font-extrabold font-montserrat my-7">4.8</Text>
                <FlatList
                    data={data}
                    horizontal
                    keyExtractor={(item => item.value.toString())}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            className="mx-1"
                            onPress={() => setValue(item.value)}>
                            {value === item.value
                                ? <Image
                                    className="h-10 w-10 bg-primary rounded-full"
                                    source={item.x} />
                                : <Image
                                    className="h-10 w-10"
                                    source={item.y} />}
                        </TouchableOpacity>}
                >
                </FlatList>
                <Text className="font-montserrat mt-3 font-semibold text-gray-400">Dựa trên 20 phiếu đánh giá</Text>
            </View>
            <Comment />
            <View className="h-28"></View>
        </View>
    )
}