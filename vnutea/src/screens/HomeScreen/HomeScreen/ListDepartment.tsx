import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, _Image } from 'react-native';

type ItemProps = {
    name: string,
    status: boolean,
    onClick: () => void
};

const Item = ({ name, status, onClick }: ItemProps) => {
    const handleClick = () => {
        onClick && onClick();
    };

    return (
        <View className='h-10 mr-3'>
            <TouchableOpacity
                onPress={handleClick}
                className={
                    "px-5 rounded-full py-2 " +
                    (status ? "bg-primary" : "bg-white")
                }>
                <Text
                    className={
                        "font-montserrat font-semibold " +
                        (status ? "text-white" : "text-primary")
                    }>
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

interface Department {
    name: string;
    id: string;
}

interface IProps {
    data: Department[],
    onChange: (data: string[]) => void;
}

export default function ListDepartment({ data, onChange }: IProps) {
    const [selected, setSelected] = useState<string[]>(["0"]);

    function handleChange(id: string) {
        let tmp = selected;
        if (tmp.includes(id)) tmp = tmp.filter(x => x !== id)
        else tmp = [...tmp, id];

        if (tmp.length > 1 && tmp.includes("0")) tmp = tmp.filter(x => x !== "0")
        if (id === "0" || tmp.length === 0) {
            tmp = ["0"]
        }

        setSelected(tmp);
        onChange && onChange(tmp);
    }

    return (
        <View className='mt-5 mx-5'>
            <FlatList
                horizontal={true}
                data={data}
                renderItem={({ item }) =>
                    <Item
                        name={item.name}
                        status={selected.includes(item.id)}
                        onClick={() => { handleChange(item.id) }}
                    />}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
            />
        </View>
    );
};