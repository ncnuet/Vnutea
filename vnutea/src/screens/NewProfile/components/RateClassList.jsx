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

import {styles} from './RateClassListcss.js';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 23;
const mySpecBlue = '#19253D';

export default function RateClassList({navigation}) {
  const [statusRender, setStatusRender] = useState('all');

  const filteredClassList = useMemo(() => {
    if (statusRender === 'all') {
      return fakeDataClassList;
    } else if (statusRender === 'rated') {
      return fakeDataClassList.filter(item => item.status === 'true');
    } else {
      return fakeDataClassList.filter(item => item.status === 'false');
    }
  }, [statusRender]);

  //TUrn back button
  const handleReturnOnPress = () => {
    navigation.pop();
  };

  const handleClassOnPress = (id, code) => {
    navigation.navigate('RateClassScreen', {
      idClass: id,
      codeClass: code,
    });
  };

  //   Ket hop ca ten mon hoc va ma mon hoc
  const mergeNameCode = (name, code) => {
    let res = name + '  ' + code;
    return adjustString(res);
  };

  //   Chinh do dai cua xau khong vuot qua myMaxLength
  const adjustString = name => {
    if (name.length >= myMaxLength - 1) {
      let res = name.substr(0, myMaxLength - 3);
      res = res + '...';
      return res;
    }

    return name;
  };

  //Render danh sach lop hoc
  const renderClassList = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          //Xu ly truy cap lap tuc
          handleClassOnPress(item.id, item.code);
        }}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/science.png')}
            style={styles.logoImg}></Image>
        </View>

        <View style={styles.itemDesWrapper}>
          <View style={styles.itemDesTopWrapper}>
            <View style={styles.itemNameWrapper}>
              <Text style={styles.itemNameText}>
                {mergeNameCode(item.name, item.code)}
              </Text>
            </View>
          </View>

          <View style={styles.itemDesMidWrapper}>
            <View style={styles.itemDesIconWrapper}>
              <Icon
                name="user-alt"
                color={mySpecBlue}
                size={0.016 * windowHeight + 0.016 * windowWidth}></Icon>
            </View>

            <View style={styles.itemDesValueWrapper}>
              <Text style={styles.itemDesValue}>{item.teacher}</Text>
            </View>
          </View>

          {item.status == 'true' && (
            <View style={styles.itemDesBotWrapper}>
              <Text style={styles.itemDesBotText}>Đã đánh giá</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  //Doi trang thai render
  const handleTypeRenderChange = id => {
    if (id === 0) {
      setStatusRender('all');
    } else if (id === 1) {
      setStatusRender('rated');
    } else {
      setStatusRender('unrated');
    }
  };

  const renderTypeClass = ({item}) => {
    let itemStyle = styles.typeItemWrapper;
    let textStyle = styles.typeItemText;

    // Kiểm tra giá trị của item.id và áp dụng style tương ứng
    if (item.id === 0) {
      if (statusRender === 'all') {
        itemStyle = [styles.typeItemWrapper, styles.typeTickedWrapper];
        textStyle = [styles.typeItemText, styles.typeTickedText];
      }
    } else if (item.id === 1) {
      if (statusRender === 'rated') {
        itemStyle = [styles.typeItemWrapper, styles.typeTickedWrapper];
        textStyle = [styles.typeItemText, styles.typeTickedText];
      }
    } else if (item.id === 2) {
      if (statusRender === 'unrated') {
        itemStyle = [styles.typeItemWrapper, styles.typeTickedWrapper];
        textStyle = [styles.typeItemText, styles.typeTickedText];
      }
    }

    return (
      <TouchableOpacity
        style={itemStyle}
        onPress={() => handleTypeRenderChange(item.id)}>
        <Text style={textStyle}>{item.type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6', }}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector2.png')}></Image>

        <View style={styles.topWrapper}>
          {/* Nut turn back */}
          <TouchableOpacity style={styles.topBtn}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}
              onPress={handleReturnOnPress}></IconAntDesign>
          </TouchableOpacity>

          <View style={styles.topTextWrapper}>
            <Text style={styles.topText}>Đánh giá lớp học </Text>
          </View>
        </View>
      </View>

      {/* Cac lua chon render */}
      <View style={styles.renderTypeWrapper}>
        <FlatList
          data={renderTypeList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTypeClass}
          horizontal={true}></FlatList>
      </View>

      {/* danh sach mon hoc */}
      <View style={styles.topSearchsListWrapper}>
        <FlatList
          data={filteredClassList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderClassList}
        />
        {/* <View style={styles.paddingBottomItem}></View> */}
      </View>
    </View>
  );
}

//Fake du lieu top tim kiem
const fakeDataClassList = [
  {
    id: 0,
    name: 'Xác suất thống kê',
    code: 'MAT1042',
    teacher: 'Lê Phê Đô',
    status: 'true',
  },
  {
    id: 1,
    name: 'Tín hiệu hệ thống',
    code: 'INT1042',
    teacher: 'Đỗ Đức Đông',
    status: 'false',
  },
  {
    id: 2,
    name: 'Lập trình hướng đối tượng',
    code: 'INT9999',
    teacher: 'Phạm Hồng Minh',
    status: 'true',
  },
  {
    id: 3,
    name: 'Tư tưởng Hồ Chí Minh',
    code: 'MAT1042',
    teacher: 'Lê Phê Đô',
    status: 'false',
  },
  {
    id: 4,
    name: 'Lịch sử đảng',
    code: 'MAT1042',
    teacher: 'Lê Phê Đô',
    status: 'true',
  },
  {
    id: 5,
    name: 'Lập trình nâng cao',
    code: 'MAT1042',
    teacher: 'Lê Phê Đô',
    status: 'true',
  },
  {
    id: 6,
    name: 'Nhập môn đấm bốc',
    code: 'MAT1042',
    teacher: 'Lê Phê Đô',
    status: 'false',
  },
];

const renderTypeList = [
  {
    type: 'Tất cả',
    id: 0,
  },
  {
    type: 'Đã đánh giá',
    id: 1,
  },
  {
    type: 'Chưa đánh giá',
    id: 2,
  },
];
