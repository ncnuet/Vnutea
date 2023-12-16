import { FlatList, Text, View } from "react-native";

export default function Info() {
    return (
        <>
            <View className='p-7 pt-0'>
                <Text
                    className='font-montserrat font-semibold text-lg text-primary'>
                    Current Management Positions
                </Text>

                <View className='bg-gray-200 p-4 rounded-2xl mt-2'>
                    <FlatList
                        data={[
                            { key: 'Head, Department of Science, Technology and International Relations, VNU-UET.' },
                            { key: 'Director, VNU Key Laboratory for Smart Integrated Systems (SISLAB).' },
                            { key: 'Member & Secrectary of the Scientific & Academic Council of the VNU-UET' },
                            { key: 'Senior Member of IEEE, IEEE CAS, IEEE SSCS (Chairman, SSCS Vietnam Chapter).' },
                            { key: 'Member of the Executing Board of The Radio-Electronics Association of Vietnam (REV) (2009-2014, 2014-2019).' },
                            { key: ' Member of IEICE (Chairman, IEICE Vietnam Section).' },
                        ]}
                        renderItem={({ item }) =>
                            <Text className='text-primary mb-2 font-semibold font-lato'>
                                {`\u25CF ${item.key}`}
                            </Text>}
                    />
                </View>
            </View>
        </>
    )
}