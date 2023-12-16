import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewProfile from "./components/NewProfile";
import FavTeacher from "./components/FavTeacher";
import RateClass from "./components/RateClass";

type ProfileParamList = {
    NewProfileScreen: undefined;
    FavTeacherScreen: undefined;
    RateClassScreen: undefined;
}

const StackProfile = createNativeStackNavigator<ProfileParamList>();

export const ProfileNavigator = () => {
    return (
        <StackProfile.Navigator screenOptions={ {headerShown: false}} >
            <StackProfile.Screen name="NewProfileScreen" component={NewProfile}></StackProfile.Screen>
            <StackProfile.Screen name="FavTeacherScreen" component={FavTeacher}></StackProfile.Screen>
            <StackProfile.Screen name="RateClassScreen" component={RateClass}></StackProfile.Screen>
        </StackProfile.Navigator>
    )
}