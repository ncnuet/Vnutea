import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { StudentStackParamList } from '@/types/routing';
import { Outstanding } from '@/types';

interface IProp {
  name: string;
  position: string;
  department: string;
  id: string;
  index: number;
}

function Item({ name, position, department, id, index }: IProp) {
  const navigation = useNavigation<NavigationProp<StudentStackParamList>>()

  function handlePress(id: string) {
    console.log(id, id);
    navigation.navigate("LecturerScreen", { id })
  }

  return (
    <TouchableOpacity
      onPress={() => { handlePress(id) }}
      className={
        'mx-2 rounded-3xl p-5 w-[80vw] pl-7 relative overflow-hidden ' +
        (index % 2 == 0 ? "bg-green-patel" : "bg-blue-sea")} >
      <View className='absolute -right-20 -top-10'>
        {index % 2 == 0
          ? <Icon
            name='leaf'
            color="#77C9A3"
            size={300} />
          : <Icon
            name='layers-outline'
            color="#30BBDE"
            size={300} />}
      </View>
      <View className='absolute -bottom-0 -right-0'>
        <Image
          source={require("@/assets/people.png")}>
        </Image>
      </View>

      <View className='flex flex-col'>
        <Text className='text-primary font-montserrat uppercase font-bold text-3xl'>{name}</Text>
        <View>
          <View className='border-t-4 border-primary w-28 pt-3'>
            <Text className='text-white font-montserrat font-semibold'>{position}</Text>
          </View>
          <Text className='text-white font-montserrat font-semibold'>{department}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default function OutstandingLecturer({ outstanding }: { outstanding: Outstanding[] }) {
  return (
    <View className='h-48 ml-3 mt-5'>
      <FlatList
        horizontal={true}
        data={outstanding}
        renderItem={({ item, index }) => (
          <Item
            name={item.name}
            position={item.position[0]}
            department={item.awards[0] ? item.awards[0].name : "Giảng viên nổi bật"}
            id={item.user}
            index={index}
          />)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.user}
      />
    </View>
  );
};