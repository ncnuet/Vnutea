import Header from "@/components/Header";
import TaskLecturer from "@/components/TaskLecturer";
import { FlatList, View, Text } from "react-native";

export default function () {
    return (
        <View>
            <Header />

            <View className="p-5">
                <Text className="text-xl text-primary font-semibold font-montserrat">Chủ nhiệm</Text>
                <TaskLecturer data={[]} depName={[]} />
            </View>

            <View className="p-5">
                <Text className="text-xl text-primary font-semibold font-montserrat">Chủ nhiệm</Text>
                <TaskLecturer data={[]} depName={[]} />
            </View>
        </View>
    )
}