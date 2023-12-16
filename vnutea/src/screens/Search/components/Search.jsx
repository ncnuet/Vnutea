import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  LogBox,
} from 'react-native';
import {Animated, StyleSheet, Button, SafeAreaView} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  useMemo,
  useEffect,
} from 'react';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './Searchcss.js';

//Cac du lieu la hang so dung cho css
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;

// Nếu xâu có quá nhiều ký tự sẽ được chuẩn hóa xuống còn tối đa 40 ký tự
// Dùng cho Recent Searchs
const ReduceString = myString => {
  let res = myString;

  if (myString.length >= myMaxLength) {
    res = myString.substr(0, myMaxLength - 3);
    res = res + '...';
  }
  return res;
};

// @ts-check
export default function Search({navigation}) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [typeSearch, setTypeSearch] = useState('Teachers');
  const [mySearch, setMySearch] = useState('');
  const [likeList, setLikeList] = useState([
    'true',
    'true',
    'false',
    'false',
    'false',
  ]);

  //Fake du lieu lich su tim kiem gan day
  const fakeRecentSearchsList = [
    {id: '-1', title: 'Le phe do1'},
    {id: '0', title: 'Do Duc doong'},
    {id: '1', title: 'Lap trinh guong doi tuong'},
    {id: '2', title: 'A+ qua da pepsi oi'},
    {id: '3', title: 'Le phe da'},
    {id: '4', title: 'Le phe da2'},
    {id: '5', title: 'Le phe da2'},
  ];

  //Fake du lieu top tim kiem
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
          tagText: 'Có người yêu',
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
            <IconAntDesign
              name="star"
              size={0.012 * windowHeight + 0.012 * windowWidth}
              color="#19253D"
            />
            <Text> {item.star} </Text>
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
                <IconAntDesign
                  name="heart"
                  size={0.018 * windowHeight + 0.018 * windowWidth}
                  color="#F64545"
                />
              )}
              {likeList[item.id] == 'false' && (
                <IconAntDesign
                  name="hearto"
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

  //Xu ly tim kiem
  const handleSearchOnPress = () => {
    if (mySearch != '') {
      navigation.navigate('SearchResScreen', {
        searchValue: mySearch,
        typeSearchValue: typeSearch,
      });
    }
  };

  //Xu ly khi doi lua chon cac nut tim kiem
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

  // Bên trong hàm component của bạn
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
      fontSize: 0.0132 * windowWidth + 0.0132 * windowHeight,
    }),
    [],
  );

  const textOptionsSelectedStyle = useMemo(
    () => ({
      fontSize: 0.0132 * windowWidth + 0.0132 * windowHeight,
      fontWeight: 'bold',
    }),
    [typeSearch],
  );

  //...

  return (
    <View style={styles.container}>
      {/* Khoang trang de tranh Khung giao dien cham dinh dien thoai*/}
      <View style={styles.emptyTop}></View>

      {/* Khung giao dien tong */}
      {/* The View ben ngoai cung chi co tac dung tranh scroll khi focus vao o input tim kiem */}
      <View>
        <ScrollView style={styles.allWrapper}>
          {/* Label */}
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>Search</Text>
          </View>

          {/* Input Search */}
          <View style={styles.inputWrapper}>
            {/* Input and Button Search Wrapper */}
            <View style={styles.inputAndBtnWrapper}>
              {/* Nut tim kiem */}
              <TouchableOpacity
                style={styles.btnSearch}
                onPress={handleSearchOnPress}>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={'#000'} size={0.028 * windowHeight}/> */}
                <Icon
                  name="search"
                  size={0.02 * windowHeight + 0.02 * windowWidth}
                  color="#000"
                />
              </TouchableOpacity>

              {/* O Tim Kiem voi do dai toi da la 40 ky tu*/}
              <View style={styles.inputSearch}>
                <TextInput
                  placeholder="Nhập từ khóa tìm kiếm"
                  style={styles.inputSearchText}
                  maxLength={40}
                  value={mySearch}
                  onSubmitEditing={handleSearchOnPress}
                  onChangeText={text => {
                    setMySearch(text);
                  }}></TextInput>
              </View>
            </View>

            {/* Nut tim kiem bang giong noi */}
            <TouchableOpacity
              style={styles.btnMic}
              onPress={() => {
                //Xu ly tim kiem bang giong noi
              }}>
              {/* <FontAwesomeIcon icon={faMicrophone} size={0.028 * windowHeight} color={"white"}/> */}
              <Icon
                name="microphone"
                size={0.02 * windowHeight + 0.02 * windowWidth}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* 4 Nut lua chon kieu tim kiem (radio)*/}
          <View style={styles.fourOptionsWrapper}>
            {/* Nut Teachers */}
            <View style={styles.btnOptionsWrapper}>
              <TouchableOpacity
                style={[
                  btnOptionsStyle,
                  typeSearch === 'Teachers' && btnOptionsSelectedStyle,
                ]}
                onPress={handleTeachersOnPress}>
                {/* <FontAwesomeIcon icon={faChalkboardUser} size={0.03 * windowHeight} color={typeSearch === 'Teachers' ? '#fff' : myBoldGray}/> */}
                <Icon
                  name="chalkboard-teacher"
                  size={0.0164 * windowHeight + 0.0164 * windowWidth}
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
                {/* <FontAwesomeIcon icon={faFlaskVial } size={0.03 * windowHeight} color={typeSearch === 'Lab' ? '#fff' : myBoldGray}/> */}
                <IconFontisto
                  name="laboratory"
                  size={0.0164 * windowHeight + 0.0164 * windowWidth}
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
                {/* <FontAwesomeIcon icon={faGraduationCap} size={0.03 * windowHeight} color={typeSearch === 'Class' ? '#fff' : myBoldGray}/> */}
                <IconFontAwesome
                  name="mortar-board"
                  size={0.0164 * windowHeight + 0.0164 * windowWidth}
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
                {/* <FontAwesomeIcon icon={faBook} size={0.03 * windowHeight} color={typeSearch === 'Facility' ? '#fff' : myBoldGray}/> */}
                <IconFontAwesome
                  name="book"
                  size={0.0164 * windowHeight + 0.0164 * windowWidth}
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

          {/* Recent Searchs Label*/}
          <View style={styles.recentSearchsWrapper}>
            {/* Text Tim kiem gan day */}
            <Text style={styles.recentSearchText}>Recent searchs</Text>

            {/* Nut de xoa lich su tim kiem gan day */}
            <TouchableOpacity
              style={styles.recentSeachClearBtn}
              onPress={() => {
                //Xu ly xoa lich su tim kiem gan day
              }}>
              <Text style={styles.recentSearchClearBtnText}>Clear history</Text>
            </TouchableOpacity>
          </View>

          {/* Muc hien thi danh sach tim kiem gan day */}
          <View style={styles.recentSearchsListWrapper}>
            <ScrollView
              contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
              style={{height: 0.1 * windowHeight}}>
              {fakeRecentSearchsList.map(item => (
                <View key={item.key} style={styles.itemRecentSearchs}>
                  <TouchableOpacity
                    style={styles.btnRecentSearchs}
                    onPress={() => {
                      //Xu ly tim kiem luon
                    }}>
                    <Icon
                      name="search"
                      size={0.014 * windowHeight + 0.014 * windowWidth}
                      color={myBoldGray}
                    />
                    <Text style={styles.textRecentSearchs}>
                      {ReduceString(item.title)}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Top Search Label*/}
          <View style={styles.topSearchsWrapper}>
            {/* Text Top Search*/}
            <Text style={styles.topSearchText}>Top searchs</Text>

            {/* Nut de xoa lich su tim kiem nhieu nhat */}
            <TouchableOpacity
              style={styles.topSeachClearBtn}
              onPress={() => {
                //Xu ly xoa lich su tim kiem nhieu nhat
              }}>
              <Text style={styles.topSearchClearBtnText}>Clear history</Text>
            </TouchableOpacity>
          </View>

          {/* Muc hien thi danh sach tim kiem nhieu nhat */}
          <View style={styles.topSearchsListWrapper}>
            <FlatList
              data={fakeTopSearchsList}
              keyExtractor={item => item.id.toString()}
              renderItem={renderTopSearchItem}
            />
            <View style={styles.paddingBottomItem}></View>
          </View>
          {/* --- */}
        </ScrollView>
        {/* Het danh sach hien thi! Ben duoi la bottomTab */}
      </View>
    </View>
  );
}
