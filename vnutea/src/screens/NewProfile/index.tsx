import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewProfile from "./components/NewProfile";
import FavTeacher from "./components/FavTeacher";
import RateClass from "./components/RateClass";
import ClassList from "./components/ClassList";
import RateClassList from "./components/RateClassList";

type ProfileParamList = {
    NewProfileScreen: undefined;
    FavTeacherScreen: undefined;
    RateClassScreen: {
        idClass: undefined,
        codeClass: string,
    };
    ClassListScreen: undefined;
    RateClassListScreen: undefined;
}

const StackProfile = createNativeStackNavigator<ProfileParamList>();

export const ProfileNavigator = () => {
    return (
        <StackProfile.Navigator screenOptions={ {headerShown: false}} >
            <StackProfile.Screen name="NewProfileScreen" component={NewProfile}></StackProfile.Screen>
            <StackProfile.Screen name="FavTeacherScreen" component={FavTeacher}></StackProfile.Screen>
            <StackProfile.Screen name="RateClassScreen" component={RateClass}></StackProfile.Screen>
            <StackProfile.Screen name="ClassListScreen" component={ClassList}></StackProfile.Screen>
            <StackProfile.Screen name="RateClassListScreen" component={RateClassList}></StackProfile.Screen>
        </StackProfile.Navigator>
    )
}