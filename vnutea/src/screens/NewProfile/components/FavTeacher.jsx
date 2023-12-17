import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {Animated, StyleSheet, Button, SafeAreaView} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  useMemo,
} from 'react';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';

import {styles} from './FavTeachercss.js';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function FavTeacher({ navigation }) {
  const [likeList, setLikeList] = useState([
    'true',
    'true',
    'true',
    'true',
    'true',
    'true',
    'true',
  ]);

  //Xu ly Like/ Unlike
  const handleHeartBtn = itemId => {
    //Call API

    setLikeList(prevLikeList => {
      return prevLikeList.map((like, index) =>
        index === itemId ? (like === 'true' ? 'false' : 'true') : like,
      );
    });
  };

  //TUrn back button
  const handleReturnOnPress = () => {
    navigation.pop();
  }

  //render tag giang vien
  const renderTagItem = ({item}) => (
   
      <Text style={[styles.searchTagText, {backgroundColor: item.tagColor}]}>{item.tagText}</Text>
  );

  //Render danh sach giang vien
  const renderFavTeacher = ({item}) => {
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
            <Text style={{color: mySpecBlue}}> {item.star} </Text>
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
              keyExtractor={tag => tag.tagText}
              renderItem={renderTagItem}
              horizontal={true}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image style={styles.headerImg} source={require('../assets/Vector2.png')}></Image>

        <View style={styles.topWrapper}>

          {/* Nut turn back */}
          <TouchableOpacity style={styles.topBtn}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}
              onPress={handleReturnOnPress}
              ></IconAntDesign>
          </TouchableOpacity>

          <View style={styles.topTextWrapper}>
            <Text style={styles.topText}>Giảng viên yêu thích</Text>
          </View>
        </View>
      </View>

      <View style={styles.topSearchsListWrapper}>
        <FlatList
          data={fakeTopSearchsList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavTeacher}
        />
        <View style={styles.paddingBottomItem}></View>
      </View>
    </View>
  );
}

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
      {
        tagColor: '#14D950',
        tagText: 'Được yêu thích nhất',
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
    ],
  },
  {
    id: 5,
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
    id: 6,
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
];
