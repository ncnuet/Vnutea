import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { RootStackParamList } from "@/types/routing";
import slides from "@/constants/onboarding.data";

import { View, StatusBar, FlatList, Animated } from "react-native";
import OnboardingItem from "./components/OnboardingItem";
import Paginator from "./components/Paginator";
import NextButton from "./components/NextButton";

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

function Onboarding({ navigation }: Props): JSX.Element {
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef<FlatList>(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const ViewItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    function nextSlide() {
        if (currentIndex + 1 <= slides.length - 1)
            (slideRef.current as FlatList).scrollToIndex({ index: currentIndex + 1 })
        else {
            navigation.replace("MainRootApp");
        }
    }

    return (
        <View className={"h-full pb-10 bg-primary"}>
            <StatusBar animated translucent backgroundColor={"transparent"} />
            <FlatList
                data={slides}
                renderItem={({ item }) => <OnboardingItem data={item} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false })}
                onViewableItemsChanged={ViewItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slideRef}
            />
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton next_action={nextSlide} />
        </View>
    )
}

export default Onboarding;