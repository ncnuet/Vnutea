import React from 'react';
import { View, Text, Image } from 'react-native';

export default function TaskComment(props: { text: string }) {
  return (
    <View className='bg-gray-50 my-3 rounded-2xl p-5'>
      <View className='flex flex-row'>
        <View className='flex flex-row flex-grow'>
          <Image source={require("@/assets/avatar.png")} className='h-16 w-16 rounded-md overflow-hidden' />
          <View className='ml-3'>
            <Text className='text-primary text-xl font-montserrat font-semibold'>Tran Trong Tu</Text>
            <Text className='text-gray-400 text-sm'>Cong nghe thong tin</Text>
          </View>
        </View>
        <Text className='text-xs font-lato mt-2 text-gray-500'>4h</Text>
      </View>

      <View className='mt-4'>
        <Text className='text-primary'>Xuan-Tu Tran received a B.Sc. degree in 1999 from Hanoi University of Science and a M.Sc. degree in 2003 from Vietnam National University, Hanoi, all in Electronics Engineering and Communications; and a Ph.D. degree in 2008 from Grenoble INP (in collaboration with the CEA-LETI), France, in Micro Nano Electronics.</Text>
      </View>
    </View>
  )
}