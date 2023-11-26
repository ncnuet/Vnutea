import { Image, TouchableOpacity, View, Text, TextInput, FlatList, ScrollView } from 'react-native'
import {
  Animated,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useRef, useState, useSyncExternalStore, useMemo } from 'react';
import { ImageBackground } from 'react-native';
import {Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons/faChalkboardUser'
import { faFlaskVial } from '@fortawesome/free-solid-svg-icons/faFlaskVial'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faStar} from '@fortawesome/free-solid-svg-icons/faStar'

import {styles} from './Searchcss.js';

//Cac du lieu la hang so dung cho css
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%'; 
const myGray ='#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;

// Nếu xâu có quá nhiều ký tự sẽ được chuẩn hóa xuống còn tối đa 40 ký tự
// Dùng cho Recent Searchs
const ReduceString = (myString) => {
    let res = myString;

    if (myString.length >= myMaxLength) {
        res = myString.substr(0, myMaxLength - 3);
        res = res + '...';
    }
    return res;
}

export default function Search({ navigation }) {

    const [typeSearch, setTypeSearch] = useState('Teachers');
    const [mySearch, setMySearch] = useState('');

    //Fake du lieu lich su tim kiem gan day
    const fakeRecentSearchsList = [
        {id: "-1", title: "Le phe da5"},
        {id: "0", title: "Le phe do1"},
        {id: "1", title: "Lam sao de khong hoc van duoc A+"},
        {id: "2", title: "A+"},
        {id: "3", title: "Le phe da"},
        {id: "4", title: "Le phe da2"},
        {id: "5", title: "Le phe da2"},
    ]

    //Fake du lieu top tim kiem
    const fakeTopSearchsList = [
        {
            id: 1,
            name: "Thầy Lê Phê Pha",
            position: "Tiến sĩ, Trưởng khoa",

        },
        {
            id: 2,
            name: "Thầy Lê Phê Pha",
            position: "Tiến sĩ, Trưởng khoa",

        },
        {
            id: 3,
            name: "Thầy Lê Phê Pha",
            position: "Tiến sĩ, Trưởng khoa",

        },
        {
            id: 4,
            name: "Thầy Lê Phê Pha",
            position: "Tiến sĩ, Trưởng khoa",

        },
        {
            id: 5,
            name: "Thầy Lê Phê Pha",
            position: "Tiến sĩ, Trưởng khoa",

        }
    ]

    //Xu ly tim kiem
    const handleSearchOnPress = () => {
        if (mySearch != '') {
            navigation.navigate('SearchRes',{
                searchValue: mySearch,
                typeSearchValue: typeSearch,
            })
        }
    }

    //Xu ly khi doi lua chon cac nut tim kiem
    const handleTeachersOnPress = () => {
        setTypeSearch('Teachers');
    }
    const handleLabOnPress = () => {
        setTypeSearch('Lab');
    }
    const handleClassOnPress = () => {
         setTypeSearch('Class');
    }
    const handleFacilityOnPress = () => {
        setTypeSearch('Facility');
    }

    console.log('rendering');

    // Bên trong hàm component của bạn
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

    //...


    return (
        <View style={styles.container}>
            {/* Khoang trang de tranh Khung giao dien cham dinh dien thoai*/}
            <View style={styles.emptyTop}>

            </View>

            {/* Khung giao dien tong */}
            {/* The View ben ngoai cung chi co tac dung tranh scroll khi focus vao o input tim kiem */}
            <View>
            <ScrollView style={styles.allWrapper} >
                {/* Label */}
                <View style={styles.labelWrapper}>
                  <Text style={styles.labelText}>
                    Search
                  </Text>   
                </View>

                {/* Input Search */}
                <View style={styles.inputWrapper}>
                    {/* Input and Button Search Wrapper */}
                    <View style={styles.inputAndBtnWrapper}>
                        {/* Nut tim kiem */}
                        <TouchableOpacity style={styles.btnSearch}
                         onPress = {handleSearchOnPress}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} color={'#000'} size={0.028 * windowHeight}/>
                        </TouchableOpacity>

                        {/* O Tim Kiem voi do dai toi da la 40 ky tu*/}
                        <View style={styles.inputSearch}>
                            <TextInput placeholder='Nhập từ khóa tìm kiếm' style={styles.inputSearchText} maxLength={40}
                             value = {mySearch}
                             onChangeText = {(text) => {setMySearch(text);}}
                            ></TextInput>
                        </View>

                    </View>

                    {/* Nut tim kiem bang giong noi */}
                    <TouchableOpacity style={styles.btnMic} 
                     onPress={() => {
                        //Xu ly tim kiem bang giong noi
                     }}
                    >
                      <FontAwesomeIcon icon={faMicrophone} size={0.028 * windowHeight} color={"white"}/>
                    </TouchableOpacity>
                </View>

                {/* 4 Nut lua chon kieu tim kiem (radio)*/}
                <View style={styles.fourOptionsWrapper}>
                    {/* Nut Teachers */}
                    <View style={styles.btnOptionsWrapper}>
                        <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Teachers' && btnOptionsSelectedStyle]} onPress={handleTeachersOnPress}>
                            <FontAwesomeIcon icon={faChalkboardUser} size={0.03 * windowHeight} color={typeSearch === 'Teachers' ? '#fff' : myBoldGray}/>
                        </TouchableOpacity>  

                        {/* Teachers */}
                        <Text style={[ textOptionsStyle, typeSearch === 'Teachers' && textOptionsSelectedStyle,]}>
                            Teachers
                        </Text>
                    </View>
                    

                    {/* Nut Lab */}
                    <View style={styles.btnOptionsWrapper}>
                        <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Lab' && btnOptionsSelectedStyle]} onPress={handleLabOnPress}>
                            <FontAwesomeIcon icon={faFlaskVial } size={0.03 * windowHeight} color={typeSearch === 'Lab' ? '#fff' : myBoldGray}/>
                        </TouchableOpacity>  

                        {/* Lab */}
                        <Text style={[textOptionsStyle, typeSearch === 'Lab' && textOptionsSelectedStyle,]}>
                            Lab
                        </Text>
                    </View>

                    {/* Nut Class */}
                    <View style={styles.btnOptionsWrapper}>
                        <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Class' && btnOptionsSelectedStyle]} onPress={handleClassOnPress}>
                            <FontAwesomeIcon icon={faGraduationCap} size={0.03 * windowHeight} color={typeSearch === 'Class' ? '#fff' : myBoldGray}/>
                        </TouchableOpacity>  

                        {/* Class */}
                        <Text style={[ textOptionsStyle, typeSearch === 'Class' && textOptionsSelectedStyle,]}>
                            Class
                        </Text>
                    </View>

                    {/* Facility */}
                    <View style={styles.btnOptionsWrapper}>
                        <TouchableOpacity style={[btnOptionsStyle, typeSearch === 'Facility' && btnOptionsSelectedStyle]} onPress={handleFacilityOnPress}>
                            <FontAwesomeIcon icon={faBook} size={0.03 * windowHeight} color={typeSearch === 'Facility' ? '#fff' : myBoldGray}/>
                        </TouchableOpacity>  

                        {/* Facility */}
                        <Text style={[ textOptionsStyle, typeSearch === 'Facility' && textOptionsSelectedStyle,]}>
                            Facility
                        </Text> 
                    </View>

                </View>

                {/* Recent Searchs Label*/}
                <View style={styles.recentSearchsWrapper}>
                    {/* Text Tim kiem gan day */}
                    <Text style={styles.recentSearchText}>
                        Recent searchs
                    </Text>

                    {/* Nut de xoa lich su tim kiem gan day */}
                    <TouchableOpacity style={styles.recentSeachClearBtn}
                     onPress = {() => {
                        //Xu ly xoa lich su tim kiem gan day
                     }}
                    >
                        <Text style={styles.recentSearchClearBtnText}>
                            Clear history
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Muc hien thi danh sach tim kiem gan day */}
                <View style={styles.recentSearchsListWrapper}>
                  <ScrollView contentContainerStyle={{ flexDirection:'row', flexWrap:'wrap'}} style={{height: 0.08 * windowHeight}} >
                    {
                        fakeRecentSearchsList.map(item => (
                            <View key={item.key} style={styles.itemRecentSearchs}>
                                <TouchableOpacity style={styles.btnRecentSearchs}
                                 onPress={() => {
                                    //Xu ly tim kiem luon
                                 }}
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} color={myBoldGray} size={0.02 * windowHeight}/>
                                </TouchableOpacity>
                                <Text style={styles.textRecentSearchs}>{ReduceString(item.title)}</Text>
                            </View>
                        ))
                    }
                  </ScrollView>
                </View>

                {/* Top Search Label*/}
                <View style={styles.topSearchsWrapper}>
                    {/* Text Top Search*/}
                    <Text style={styles.topSearchText}>
                        Top searchs
                    </Text>

                    {/* Nut de xoa lich su tim kiem nhieu nhat */}
                    <TouchableOpacity style={styles.topSeachClearBtn}
                     onPress = {() => {
                        //Xu ly xoa lich su tim kiem nhieu nhat
                     }}
                    >
                        <Text style={styles.topSearchClearBtnText}>
                            Clear history
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Muc hien thi danh sach tim kiem nhieu nhat */}
                <View style={styles.topSearchsListWrapper}>
                    <FlatList 
                        data={fakeTopSearchsList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.topSearchsItem} 
                             onPress={() => {
                                //Xu ly truy cap lap tuc
                             }}
                            >   
                            <View style={styles.searchItemAvtWrapper}>
                                <View style={styles.avtGv}>
                                    <Image style={styles.avtStyle} source={require('../assets/avtgv.png')}/>
                                </View>
                                <View style={styles.rateWrapper}>
                                    <FontAwesomeIcon icon={faStar} />
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
                                        <FontAwesomeIcon icon={faHeart} style={{color: "#F64545"}} size={0.032 * windowHeight}/>
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
                        )}
                     />
                     <View style={styles.paddingBottomItem}>

                     </View>
                </View>
                {/* --- */}

            </ScrollView>
            {/* Het danh sach hien thi! Ben duoi la bottomTab */}
            </View>

            {/* Bottom Tabbar */}
            <View style={styles.tabBarWrapper}>
                {/* Nut Home */}
                <TouchableOpacity style={styles.btnMenu}>
                    <FontAwesomeIcon icon={faHouse} color={'#fff'} size={0.038 * windowHeight}/>
                </TouchableOpacity>

                {/* Nut tim kiem */}
                <TouchableOpacity style={styles.btnMenu}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color={'#fff'} size={0.038 * windowHeight}/>
                </TouchableOpacity>

                {/* Nut mon hoc */}
                <TouchableOpacity style={styles.btnMenu}>
                    <FontAwesomeIcon icon={faBookOpen} color={'#fff'} size={0.038 * windowHeight}/>
                </TouchableOpacity>

                {/* Nut profile cua toi */}
                <TouchableOpacity style={styles.btnMenu}>
                    <FontAwesomeIcon icon={faUser} color={'#fff'} size={0.038 * windowHeight}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}




//CSS
