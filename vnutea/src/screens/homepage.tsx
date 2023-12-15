import axios from 'axios';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

async function send(): Promise<any> {
  const res = await axios.post("localhost:8000/auth/login", {
    username: "21020365",
    password: "123456789"
  })

  console.log(res)
}

const res = new Promise((resolve, reject) => {
  axios.post("localhost:8000/auth/login", {
    username: "21020365",
    password: "123456789"
  }).then(data => {
    if (data.status == 200) {
      resolve(data)
    } else {
      reject();
    }
  })
})


function Section({ children, title }: SectionProps): JSX.Element {
  useEffect(() => {
    send()
    SplashScreen.hide();
  }, []);

  return (
    <View className="mt-8 px-2">
      <Text className="text-2xl text-black dark:text-white">
        {title}
      </Text>
      <Text className="mt-2 text-lg text-black dark:text-white">
        {children}
      </Text>
    </View>
  );
}

function HomeScreen(): JSX.Element {
  return (
    <View className="bg-neutral-300">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View className="bg-white dark:bg-black">
          <Section title="Step One">
            Edit <Text className="font-bold">App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
