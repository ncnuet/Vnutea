import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, _Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '@/service/axios';
import fetch from '@/service/fetching';
import { NavHomeProp } from '@/ContactStackNavigator';
import { EActionUpdate, TeacherListContext } from '@/hooks/teacher.context';
import Award from './Award';

type ItemProps = {
    id: string
    name: string,
    department: string,
    image: string,
    like: boolean,
    awards: {
        name: string,
        color: string,
    }[],
    isUpdateOutside?: boolean
};

const Item = memo(({ id, name, department, image, like, awards, isUpdateOutside = false }: ItemProps) => {
    const navigation = useNavigation<NavHomeProp>()
    const context = useContext(TeacherListContext);
    const [isLove, setLove] = useState(like);

    useEffect(() => {
        setLove(like);
    }, [like])

    const handleLove = () => {
        if (isLove) {
            fetch(
                () => axios.delete("me/favorite/" + id)
            )
        } else {
            fetch(
                () => axios.post("/me/favorite", { ref: id, type: "teacher" })
            )
        }

        isUpdateOutside && context.dispatchTeachers({
            type: EActionUpdate.UPDATE_LIKE,
            id,
            value: !isLove
        })

        setLove(!isLove)
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("LecturerScreen", { id })}
            className='mb-3 bg-white rounded-2xl p-3 flex flex-row overflow-hidden'>

            <View className='flex flex-col items-center flex-none'>
                <Image
                    className='h-14 w-14 rounded-xl'
                    source={{ uri: image }} />
                <View className='flex flex-row mt-1 items-center'>
                    <Icon name='flame' color={"#FF7070"} size={16} />
                    <Text className='ml-2 text-sm text-primary'>4.8</Text>
                </View>
            </View>

            <View className='ml-3 flex-1 overflow-hidden'>
                <View className='flex flex-row'>
                    <View className='flex-1'>
                        <Text className='font-montserrat font-bold text-primary text-lg'>{name}</Text>
                        <Text className='font-lato text-gray-400 text-sm -mt-1'>{department}</Text>
                    </View>

                    <TouchableOpacity
                        className='p-2 flex-none'
                        onPress={handleLove}>
                        {isLove
                            ? <Icon name='heart' size={25} color={"red"} />
                            : <Icon name='heart-outline' size={25} color={"red"} />}
                    </TouchableOpacity>
                </View>

                <Award data={awards} />
            </View>
        </TouchableOpacity>
    )
});

interface IProps {
    dep: string[]
}

const TaskLecturer = ({ dep }: IProps) => {
    const { teachers } = useContext(TeacherListContext);

    return useMemo(() => (
        <View className='mx-5 mt-5'>
            {dep.length === 1 && dep[0] === "0"
                ? teachers.map(item =>
                    <Item
                        id={item.id}
                        name={item.name}
                        department={item.department.name}
                        image={item.image
                            ? item.image
                            : "https://bizweb.dktcdn.net/100/354/778/files/ky-thuat-chup-anh-chan-dung-dep-nhat-1.jpg?v=1619759659660"}
                        like={item.liked}
                        key={item.id}
                        awards={item.awards}
                    />)
                : teachers
                    .filter(item => dep.includes(item.department.id))
                    .map(item =>
                        <Item
                            id={item.id}
                            name={item.name}
                            department={item.department.name}
                            image={item.image
                                ? item.image
                                : "https://bizweb.dktcdn.net/100/354/778/files/ky-thuat-chup-anh-chan-dung-dep-nhat-1.jpg?v=1619759659660"}
                            like={item.liked}
                            key={item.id}
                            awards={item.awards}
                        />
                    )
            }
        </View>
    ), [teachers, dep])
}

export default TaskLecturer;
export { Item as ItemLecturer }