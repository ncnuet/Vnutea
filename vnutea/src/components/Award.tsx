import { FlatList, Text, View } from "react-native";

interface IProps {
    data: {
        name: string,
        color: string
    }[]
}

export default function Award({ data }: IProps) {
    return (
        <View className=''>
            <FlatList
                className='mt-2'
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.name + index}
                data={data}
                renderItem={({ item }) =>
                    <Text
                        className={'text-primary font-lato text-sm  w-fit rounded-full px-2 mr-2 ' +
                            (item.color === "blue"
                                ? "bg-green-patel text-primary"
                                : item.color === "purple"
                                    ? "bg-purple-400 text-white"
                                    : "bg-red-400 text-white")}>
                        {item.name}
                    </Text>
                }
            />
        </View>
    )
}