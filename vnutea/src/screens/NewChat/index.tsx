import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatList from "./components/ChatList";
import Chat from "./components/Chat";

type ChatStackParamList = {
    ChatListScreen: undefined;
    ChatScreen: {
        roomId: string;
        name: string;
        avt: undefined;
        statusOnl: string;
    };
}

const StackChat = createNativeStackNavigator<ChatStackParamList>();

export const ChatStackNavigator = () => {
    return (
        <StackChat.Navigator screenOptions={ {headerShown: false}}>
            <StackChat.Screen name='ChatListScreen' component={ChatList}></StackChat.Screen>
            <StackChat.Screen name='ChatScreen' component={Chat}></StackChat.Screen>
        </StackChat.Navigator>
    )
}

