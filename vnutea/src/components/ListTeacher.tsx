import Header from "@/components/Header";
import TaskLecturer from "@/components/TaskLecturer";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

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