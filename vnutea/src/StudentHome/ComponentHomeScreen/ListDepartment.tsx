import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, _Image, TouchableHighlight,} from 'react-native';
const DATA = [
    {
        id: '1',
        name: 'ALL',
        status: true,
    },
    {
        id: '2',
        name: 'Điện tử viễn thông',
        status: false,
    },
    {
        id: '3',
        name: 'Cơ khí',
        status: false,
    },
    {
        id: '4',
        name: 'CNTT',
        status: false,
    },
    {
        id: '5',
        name: 'Da',
        status: false,
    },
];

type ItemProps = { name: string, status: boolean };
const Item = ({ name, status }: ItemProps) => {
    var [isPress, setIsPress] = React.useState(status);
    const handleClick = () => {
        setIsPress(!isPress);
        status = !status;
    };
    return (
        <View style={styles.box}>       
        <TouchableOpacity onPress={handleClick} style={isPress ? styles.button : styles.buttonPress}>
            <Text style={isPress ? styles.text : styles.textButton}>{name}</Text>
        </TouchableOpacity>
        </View>
    )
};


const ListDepartment = () => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                data={DATA}
                renderItem={({ item }) => <Item name={item.name} status = {item.status} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    box: {
        marginRight: 10,
        height: 40,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPress: {
        backgroundColor: '#19253D',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#19253D',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '600',
    },
    textButton: {
        color: '#FFFF',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '600',
    },
});

export default ListDepartment;