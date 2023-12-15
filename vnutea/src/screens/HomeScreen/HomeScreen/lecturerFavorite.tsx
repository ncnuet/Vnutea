import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from '@/service/axios';

const DATA = [
  {
    id: '1',
    name: 'Lê Phê Đô',
    position: 'Truong nhom',
    department: 'Công nghệ thông tin',
    url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    id: '2',
    name: 'Le Phe Do',
    position: 'Truong nhom',
    department: 'Công nghệ thông tin',
    url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg'
  },
  {
    id: '3',
    name: 'Le Phe Do',
    position: 'Truong nhom',
    department: 'Công nghệ thông tin',
    url: 'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  }
];

interface IProp {
  name: string;
  position: string;
  department: string;
  id: string;
  index: number;
}

function Item({ name, position, department, id, index }: IProp) {
  return (
    <TouchableOpacity
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

interface Outstanding {
  name: string;
  awards: {
    name: string;
  }[]
  position: string[],
  user: string;
}

export default function LecturerFavorite() {
  const [outstanding, setOutstanding] = useState<Outstanding[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/outstanding");
        if (response.status === 200) {
          console.log(response.data.data.outstanding);
          setOutstanding(response.data.data.outstanding);
        } else {
          Alert.alert("Lỗi")
        }
      } catch (error) {
        Alert.alert("Lỗi")
      }
    }

    getData();
  }, [])

  return (
    <View className='h-48 ml-3 mt-5'>
      <FlatList
        horizontal={true}
        data={outstanding}
        renderItem={({ item, index }) => (
          <Item
            name={item.name}
            position={item.position[0]}
            department={item.awards[0] ? item.awards[0].name: "Giảng viên nổi bật"}
            id={item.user}
            index={index}
          />)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.user}
      />
    </View>
  );
};