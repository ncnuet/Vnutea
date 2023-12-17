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
import { IDepartmentDetails, IOutstanding, ITeacher } from '@/types';
import { NavHomeProp } from '@/ContactStackNavigator';

interface IProp {
  type: "teacher" | "department",
  data: ITeacher | IDepartmentDetails,
  index: number
}

function Item({ data, type, index }: IProp) {
  const navigation = useNavigation<NavHomeProp>()

  function handlePress() {
    if (type === "teacher")
      navigation.navigate("LecturerScreen", { id: data.id })
    else
      navigation.navigate("DepartmentScreen", { id: data.id })
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
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
        <Text className='text-primary font-montserrat uppercase font-bold text-3xl'>{data.name}</Text>
        <View>
          <View className='border-t-4 border-primary w-28 pt-3'>
            <Text className='text-white font-montserrat font-semibold'>{
              type === "teacher"
                ? (data as ITeacher).awards.length > 0 ? (data as ITeacher).awards[0].name : "Giảng viên ưu tú"
                : (data as IDepartmentDetails).contact.emails.length > 0
                  ? (data as IDepartmentDetails).contact.emails[0]
                  : "cntt@edu.vnu.vn"
            }</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default function Outstanding({ outstanding }: { outstanding: IOutstanding[] }) {
  return (
    <View className='h-48 ml-3 mt-5'>
      <FlatList
        horizontal={true}
        data={outstanding}
        renderItem={({ item, index }) => (
          <Item
            type={item.type}
            data={item.data}
            index={index}
          />)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.data.id}
      />
    </View>
  );
};