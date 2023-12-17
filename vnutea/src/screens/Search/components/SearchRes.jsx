import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonIcons from 'react-native-vector-icons/Ionicons';

import {styles} from './Searchcss.js';
// import axios from '@/service/axios.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const mySpecBlue = '#19253D';
const myMaxLength = 40;

const ReduceString = myString => {
  let res = myString;

  if (myString.length >= myMaxLength) {
    res = myString.substr(0, myMaxLength - 3);
    res = res + '...';
  }
  return res;
};

export default function Search({route, navigation}) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  
  const {searchValue, typeSearchValue} = route.params;

  // async function getData(){
  //   fetch(
  //     () => axios.get("")
  //   )
  // }

  // useEffect(()=>)


  // const searchValue = '1';
  // const typeSearchValue = '2';

  const [typeSearch, setTypeSearch] = useState('Teachers');
  const [mySearch, setMySearch] = useState('');

  const [likeList, setLikeList] = useState([
    'true',
    'true',
    'false',
    'false',
    'false',
  ]);

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
  const callAPIHere = () => {};

  //Xu ly tim kiem
  const handleSearchOnPress = () => {
    if (mySearch != '') {
      navigation.replace('SearchResScreen', {
        searchValue: mySearch,
        typeSearchValue: typeSearch,
      });
    }
  };

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

  const btnOptionsStyle = useMemo(
    () => ({
      width: 0.18 * windowWidth,
      height: 0.18 * windowWidth,
      borderRadius: 100,
      backgroundColor: myGray,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const btnOptionsSelectedStyle = useMemo(
    () => ({
      width: 0.18 * windowWidth,
      height: 0.18 * windowWidth,
      borderRadius: 100,
      backgroundColor: myBlue,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const textOptionsStyle = useMemo(
    () => ({
      fontSize: 0.01 * windowWidth + 0.01 * windowHeight,
      color: mySpecBlue,
      fontFamily: "Montserrat",
    }),
    [],
  );

  const textOptionsSelectedStyle = useMemo(
    () => ({
      fontSize: 0.01 * windowWidth + 0.01 * windowHeight,
      fontWeight: 'bold',
      fontFamily: "Montserrat",
      color: mySpecBlue,
    }),
    [typeSearch],
  );

  //Xu ly Like/ Unlike
  const handleHeartBtn = itemId => {
    //Call API

    setLikeList(prevLikeList => {
      return prevLikeList.map((like, index) =>
        index === itemId ? (like === 'true' ? 'false' : 'true') : like,
      );
    });
  };

  //render tag giang vien
  const renderTagItem = ({item}) => (
    <Text style={[styles.searchTagText, {backgroundColor: item.tagColor}]}>
      {item.tagText}
    </Text>
  );

  //Render top search
  const renderTopSearchItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.topSearchsItem}
        onPress={() => {
          //Xu ly truy cap lap tuc
        }}>
        <View style={styles.searchItemAvtWrapper}>
          <View style={styles.avtGv}>
            <Image style={styles.avtStyle} source={item.image} />
          </View>
          <View style={styles.rateWrapper}>
            <Icon
              name="star-half-alt"
              size={0.0112 * windowHeight + 0.0112 * windowWidth}
              color="#19253D"
            />
            <Text style={{color:mySpecBlue, fontFamily:'Montserrat', fontWeight: '600',}}> {item.star} </Text>
          </View>
        </View>

        <View style={styles.searchItemDesWrapper}>
          {/* ten, vai tro va cam xuc */}
          <View style={styles.searchItemMain}>
            <View style={styles.searchItemTextWrapper}>
              <View style={styles.searchItemName}>
                <Text style={styles.searchNameText}>{item.name}</Text>
              </View>
              <View style={styles.searchItemJob}>
                <Text style={styles.searchJobText}>{item.position}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.searchHeartWrapper}
              onPress={() => handleHeartBtn(item.id)}>
              {likeList[item.id] == 'true' && (
                <IconOcticons
                  name="heart-fill"
                  size={0.018 * windowHeight + 0.018 * windowWidth}
                  color="#F64545"
                />
              )}
              {likeList[item.id] == 'false' && (
                <IconOcticons
                  name="heart"
                  size={0.018 * windowHeight + 0.018 * windowWidth}
                  color="#F64545"
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Cac the thanh tuu danh gia */}
          <View style={styles.searchItemTag}>
            <FlatList
              data={item.tagList}
              keyExtractor={tag => tag.tagText.toString()}
              renderItem={renderTagItem}
              horizontal={true}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.emptyTop} />
      <View>
        <ScrollView style={[styles.allWrapper]}>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>Tìm kiếm</Text>
          </View>
          {/* Input Search */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputAndBtnWrapper}>
              <TouchableOpacity
                style={styles.btnSearch}
                onPress={handleSearchOnPress}>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={'#000'} size={0.028 * windowHeight} /> */}
                <IconIonIcons
                  name="search-outline"
                  size={26}
                  color="#000"
                />
              </TouchableOpacity>
              <View style={styles.inputSearch}>
                <TextInput
                  placeholder="Nhập từ khóa tìm kiếm"
                  placeholderTextColor="gray"
                  style={styles.inputSearchText}
                  maxLength={40}
                  value={mySearch}
                  onSubmitEditing={handleSearchOnPress}
                  onChangeText={text => {
                    setMySearch(text);
                  }}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnMic}
              onPress={() => {
                /* Xu ly tim kiem bang giong noi */
              }}>
              {/* <FontAwesomeIcon icon={faMicrophone} size={0.028 * windowHeight} color={"white"} /> */}
              <Icon
                name="microphone"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.fourOptionsWrapper}>
            {/* Nut Teachers */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Teachers' && btnOptionsSelectedStyle,
                ]}
                onPress={handleTeachersOnPress}>
                <IconIonIcons
                  name="person"
                  size={32}
                  color={typeSearch === 'Teachers' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Teachers */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Teachers' && textOptionsSelectedStyle,
                ]}>
                Teachers
              </Text>
            </View>

            {/* Nut Lab */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Lab' && btnOptionsSelectedStyle,
                ]}
                onPress={handleLabOnPress}>
                <IconIonIcons
                  name="hardware-chip"
                  size={32}
                  color={typeSearch === 'Lab' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Lab */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Lab' && textOptionsSelectedStyle,
                ]}>
                Lab
              </Text>
            </View>

            {/* Nut Class */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Class' && btnOptionsSelectedStyle,
                ]}
                onPress={handleClassOnPress}>
                <IconIonIcons
                  name="school"
                  size={32}
                  color={typeSearch === 'Class' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Class */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Class' && textOptionsSelectedStyle,
                ]}>
                Class
              </Text>
            </View>

            {/* Facility */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Facility' && btnOptionsSelectedStyle,
                ]}
                onPress={handleFacilityOnPress}>
                <IconIonIcons
                  name="business"
                  size={32}
                  color={typeSearch === 'Facility' ? '#fff' : myBoldGray}
                />
              </TouchableOpacity>

              {/* Facility */}
              <Text
                style={[
                  textOptionsStyle,
                  typeSearch === 'Facility' && textOptionsSelectedStyle,
                ]}>
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
              <FlatList
                data={fakeTopSearchsList}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTopSearchItem}
              />
              {/* Khoang trong de ko che lap phan tu cuoi */}
              <View style={styles.paddingBottomItem}></View>
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

const fakeTopSearchsList = [
  {
    id: 0,
    name: 'Lê Phê Đô',
    position: 'Tiến sĩ, Trưởng khoa',
    star: 4.8,
    image: require('../assets/avtlpd.png'),
    like: 'true',
    tagList: [
      {
        tagColor: '#4BBEFA',
        tagText: 'G.V Xuất sắc nhất T8',
      },
      {
        tagColor: '#14D950',
        tagText: 'Được yêu thích nhất',
      },
    ],
  },
  {
    id: 1,
    name: 'Đỗ Đức Đông',
    position: 'Giáo sư',
    star: 5,
    image: require('../assets/avtddd.jpg'),
    like: 'true',
    tagList: [
      {
        tagColor: '#4BBEFA',
        tagText: 'G.V Xuất sắc nhất T8',
      },
      {
        tagColor: '#14D950',
        tagText: 'Được yêu thích nhất',
      },
    ],
  },
  {
    id: 2,
    name: 'Phạm Hồng Minh',
    position: 'Giảng viên, kỹ sư phần mềm',
    star: 4.9,
    image: require('../assets/avtphm.jpeg'),
    like: 'false',
    tagList: [
      {
        tagColor: '#4BBEFA',
        tagText: 'G.V Xuất sắc nhất T8',
      },
    ],
  },
  {
    id: 3,
    name: 'Đỗ Tuấn Nghĩa',
    position: 'Phó hiệu trưởng, trưởng khoa',
    star: 4.8,
    image: require('../assets/avtdtn.jpg'),
    like: 'false',
    tagList: [
      {
        tagColor: '#4BBEFA',
        tagText: 'G.V Xuất sắc nhất T8',
      },
      {
        tagColor: '#F8411E',
        tagText: 'GV5T',
      },
    ],
  },
  {
    id: 4,
    name: 'Bàn Văn Hiếu',
    position: 'Hiệu trưởng, trưởng ban',
    star: 4.6,
    image: require('../assets/avtlmh.jpg'),
    like: 'false',
    tagList: [
      {
        tagColor: '#4BBEFA',
        tagText: 'G.V Xuất sắc nhất T8',
      },
      {
        tagColor: '#14D950',
        tagText: 'Được yêu thích nhất',
      },
    ],
  },
];
