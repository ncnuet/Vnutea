import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from './components/Search.jsx';
import SearchRes from './components/SearchRes.jsx';

type SearchStackParamList = {
    SearchScreen: undefined;
    SearchResScreen: {
        searchValue: string,
        typeSearchValue: string,
    };
}

const StackSearch = createNativeStackNavigator<SearchStackParamList>();

export const SearchStackNavigator = () => {
    return (
        <StackSearch.Navigator screenOptions={{ headerShown: false }}>
            <StackSearch.Screen name="SearchScreen" component={Search}></StackSearch.Screen>
            <StackSearch.Screen name="SearchResScreen" component={SearchRes}></StackSearch.Screen>
        </StackSearch.Navigator>
    );
}