import { Text, TouchableOpacity, View } from "react-native";

interface IProps {
    next_action: () => void;
}

export default function NextButton({ next_action }: IProps) {
    return (
        <TouchableOpacity
            onPress={next_action}
            activeOpacity={0.8}
            className="w-fit mx-10 bg-secondary px-20 py-4 rounded-full">
            <Text className="text-primary font-semibold text-lg text-center">Tiếp</Text>
        </TouchableOpacity>
    )
}