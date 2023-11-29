import { Image, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faHouse, faMagnifyingGlass, faBookOpen, faUser, faMicrophone, faChalkboardUser, faFlaskVial, faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';
import { Dimensions, StyleSheet } from 'react-native';
import React, { useState, useMemo } from 'react';

// import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
// import { faStar} from '@fortawesome/free-solid-svg-icons/faStar'

import {styles} from './Searchcss.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;

const ReduceString = (myString) => {
    let res = myString;

    if (myString.length >= myMaxLength) {
        res = myString.substr(0, myMaxLength - 3);
        res = res + '...';
    }
    return res;
};

export default function Search({route, navigation}) {

    const {searchValue, typeSearchValue} = route.params;

    const [typeSearch, setTypeSearch] = useState('Teachers');
    const [mySearch, setMySearch] = useState('');

    const myListRes = [
        {
            id: 1,
            value: 1,
        },
        {
            id: 2,
            value: 1,
        },
        {
            id: 3,
            value: 1,
        },
        {
            id: 4,
            value: 1,
        },
        {
            id: 5,
            value: 1,
        },
    ];

    //CallAPI de goi cac ket qua tim kiem theo searchValue va typeSearchValue ket qua tra ve mang myListRes
    const callAPIHere = () => {

    }


    //Xu ly tim kiem
    const handleSearchOnPress = () => {
        if (mySearch != '') {
            navigation.replace('SearchResScreen',{
                searchValue: mySearch,
                typeSearchValue: typeSearch,
            })
        }
    }

    //Xu ly cac chuc nang
    const handleTeachersOnPress = () => {
        setTypeSearch('Teachers');
    };

    const handleLabOnPress = () => {
        setTypeSearch('Lab');
    };

    const handleClassOnPress = () => {
        setTypeSearch('Class');
    };

    const handleFacilityOnPress = () => {
        setTypeSearch('Facility');
    };

    const btnOptionsStyle = useMemo(() => ({
        width: 0.18 * windowWidth,
        height: 0.18 * windowWidth,
        borderRadius: 100,
        backgroundColor: myGray,
        alignItems: "center",
        justifyContent: "center",
    }), []);

    const btnOptionsSelectedStyle = useMemo(() => ({
        width: 0.18 * windowWidth,
        height: 0.18 * windowWidth,
        borderRadius: 100,
        backgroundColor: myBlue,
        alignItems: "center",
        justifyContent: "center",
    }), []);

    const textOptionsStyle = useMemo(() => ({
        fontSize: 0.04 * windowWidth,
    }), []);

    const textOptionsSelectedStyle = useMemo(() => ({
        fontSize: 0.04 * windowWidth,
        fontWeight: "bold",
    }), [typeSearch]);

    return (
        <View style={styles.container}>
            <View style={styles.emptyTop} />
            <View >

                <ScrollView style={[styles.allWrapper]}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.labelText}>
                            Search
                        </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputAndBtnWrapper}>
                            <TouchableOpacity style={styles.btnSearch} onPress={handleSearchOnPress}>
                                {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={'#000'} size={0.028 * windowHeight} /> */}
                            </TouchableOpacity>
                            <View style={styles.inputSearch}>
                                <TextInput placeholder='Nhập từ khóa tìm kiếm' style={styles.inputSearchText} maxLength={40}
                                value = {mySearch}
                                onChangeText={(text) => {setMySearch(text);}}
                                ></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnMic} onPress={() => { /* Xu ly tim kiem bang giong noi */ }}>
                            {/* <FontAwesomeIcon icon={faMicrophone} size={0.028 * windowHeight} color={"white"} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fourOptionsWrapper}>
                        <View style={styles.btnOptionsWrapper}>
                            <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Teachers' && btnOptionsSelectedStyle]} onPress={handleTeachersOnPress}>
                                {/* <FontAwesomeIcon icon={faChalkboardUser} size={0.03 * windowHeight} color={typeSearch === 'Teachers' ? '#fff' : myBoldGray} /> */}
                            </TouchableOpacity>
                            <Text style={[textOptionsStyle, typeSearch === 'Teachers' && textOptionsSelectedStyle]}>
                                Teachers
                            </Text>
                        </View>
                        <View style={styles.btnOptionsWrapper}>
                            <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Lab' && btnOptionsSelectedStyle]} onPress={handleLabOnPress}>
                                {/* <FontAwesomeIcon icon={faFlaskVial} size={0.03 * windowHeight} color={typeSearch === 'Lab' ? '#fff' : myBoldGray} /> */}
                            </TouchableOpacity>
                            <Text style={[textOptionsStyle, typeSearch === 'Lab' && textOptionsSelectedStyle]}>
                                Lab
                            </Text>
                        </View>
                        <View style={styles.btnOptionsWrapper}>
                            <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Class' && btnOptionsSelectedStyle]} onPress={handleClassOnPress}>
                                {/* <FontAwesomeIcon icon={faGraduationCap} size={0.03 * windowHeight} color={typeSearch === 'Class' ? '#fff' : myBoldGray} /> */}
                            </TouchableOpacity>
                            <Text style={[textOptionsStyle, typeSearch === 'Class' && textOptionsSelectedStyle]}>
                                Class
                            </Text>
                        </View>
                        <View style={styles.btnOptionsWrapper}>
                            <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Facility' && btnOptionsSelectedStyle]} onPress={handleFacilityOnPress}>
                                {/* <FontAwesomeIcon icon={faBook} size={0.03 * windowHeight} color={typeSearch === 'Facility' ? '#fff' : myBoldGray} /> */}
                            </TouchableOpacity>
                            <Text style={[textOptionsStyle, typeSearch === 'Facility' && textOptionsSelectedStyle]}>
                                Facility
                            </Text>
                        </View>
                    </View>

                    {/* Ket qua tim kiem */}
                    <View style={[styles.searchResWrapper]}>
                        {/* Text Tim kiem gan day */}
                        <Text style={styles.recentSearchText}>
                            {`Results for '${searchValue}'`}
                        </Text>

                        {/* Render ket qua tim kiem o day */}
                        <View style={styles.listSearchResWrapper}>
                            {myListRes.map((item) => (
                                <TouchableOpacity style={styles.topSearchsItem} 
                                onPress={() => {
                                   //Xu ly truy cap lap tuc
                                }}
                               >   
                                    {/* <Text style={styles.resultItemText}>{item.value}</Text> */}
                                    <View style={styles.searchItemAvtWrapper}>
                                        <View style={styles.avtGv}>
                                            {/* <Image style={styles.avtStyle} source={require('../assets/avtgv.png')}/> */}
                                        </View>
                                        <View style={styles.rateWrapper}>
                                            {/* <FontAwesomeIcon icon={faStar} /> */}
                                            <Text> 4.8 </Text>
                                        </View>
                                    </View>

                                    <View style={styles.searchItemDesWrapper}>
                                        {/* ten, vai tro va cam xuc */}
                                        <View style={styles.searchItemMain}>

                                            <View style={styles.searchItemTextWrapper}>
                                                <View style={styles.searchItemName}>
                                                    <Text style={styles.searchNameText}>
                                                        Thầy Lê Phê Đô
                                                    </Text>
                                                </View>
                                                <View style={styles.searchItemJob}>
                                                    <Text style={styles.searchJobText}>
                                                        Tiến sĩ, trưởng khoa
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.searchHeartWrapper}>
                                                {/* <FontAwesomeIcon icon={faHeart} style={{color: "#F64545"}} size={0.032 * windowHeight}/> */}
                                            </View>
                                        </View>

                                        {/* Cac the thanh tuu danh gia */}
                                        <View style={styles.searchItemTag}>
                                            <Text style={styles.searchTagText}>
                                                G.V Xuất sắc nhất T8
                                            </Text>
                                            <Text style={[styles.searchTagText, styles.colorTagText2]}>
                                                Được yêu thích nhất
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            {/* Khoang trong de ko che lap phan tu cuoi */}
                            <View style={styles.paddingBottomItem}>

                            </View>
                        </View>


                    </View>


                </ScrollView>
            </View>
            <View style={styles.tabBarWrapper}>
                <TouchableOpacity style={styles.btnMenu}>
                    {/* <FontAwesomeIcon icon={faHouse} color={'#fff'} size={0.038 * windowHeight} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnMenu}>
                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={'#fff'} size={0.038 * windowHeight} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnMenu}>
                    {/* <FontAwesomeIcon icon={faBookOpen} color={'#fff'} size={0.038 * windowHeight} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnMenu}>
                    {/* <FontAwesomeIcon icon={faUser} color={'#fff'} size={0.038 * windowHeight} /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}