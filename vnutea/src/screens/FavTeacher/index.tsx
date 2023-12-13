import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavTeacher from "./components/FavTeacher";

type FavTeacherParamList = {
    FavTeacherScreen: undefined;
}

const StackFavTeacher = createNativeStackNavigator<FavTeacherParamList>();

export const FavTeacherNavigator = () => {
    return (
        <StackFavTeacher.Navigator screenOptions={ {headerShown: false}} >
            <StackFavTeacher.Screen name="FavTeacherScreen" component={FavTeacher}></StackFavTeacher.Screen>
        </StackFavTeacher.Navigator>
    )
}