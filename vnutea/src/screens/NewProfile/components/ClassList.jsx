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

import {styles} from './ClassListcss.js';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import RenderClassList from '../RenderClassList/RenderClassList.jsx';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 22;
const mySpecBlue = '#19253D';

export default function ClassList({navigation}) {
  const [statusRender, setStatusRender] = useState('all');

  //Doi trang thai render
  const handleTypeRenderChange = id => {
    if (id === 0) {
      setStatusRender('all');
    } else if (id === 1) {
      setStatusRender('pass');
    } else {
      setStatusRender('notPass');
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
      if (statusRender === 'pass') {
        itemStyle = [styles.typeItemWrapper, styles.typeTickedWrapper];
        textStyle = [styles.typeItemText, styles.typeTickedText];
      }
    } else if (item.id === 2) {
      if (statusRender === 'notPass') {
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

  //   Chinh do dai cua xau khong vuot qua myMaxLength
  const adjustString = name => {
    if (name.length >= myMaxLength - 1) {
      let res = name.substr(0, myMaxLength - 3);
      res = res + '...';
      return res;
    }

    return name;
  };

  //TUrn back button
  const handleReturnOnPress = () => {
    navigation.pop();
  };

  //Render danh sach lop hoc
  const renderClassList = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          //Xu ly truy cap lap tuc
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
                {adjustString(item.name)}
              </Text>
            </View>
          </View>

          <View style={styles.itemDesMidWrapper}>
            <Text style={styles.itemCodeText}>
              {adjustString(item.code)}
            </Text>
            
          </View>

          {item.status == 'pass' && (
            <View style={styles.itemDesBotWrapper}>
              <Text style={styles.itemDesBotText}>Đã tốt nghiệp</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
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
            <Text style={styles.topText}>Danh sách lớp học</Text>
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

      {/* Danh sach cac mon hoc */}
      <RenderClassList dataChatList={fakeDataClassList} statusRender={statusRender}></RenderClassList>
    </View>
  );
}

//Fake du lieu top tim kiem
const fakeDataClassList = [
  {
    id: 0,
    name: 'Xác suất thống kê',
    code: 'MAT1042',
    rate1: 3.1,
    rate2: 4.8,
    rate3: 4.3,
    status: 'failed',
  },
  {
    id: 1,
    name: 'Tín hiệu hệ thống',
    code: 'INT3301',
    rate1: 1.0,
    rate2: 3.8,
    rate3: 2.8,
    status: 'pass',
  },
  {
    id: 2,
    name: 'Lập trình hướng đối tượng',
    code: 'INT2203',
    rate1: 2.4,
    rate2: 4.8,
    rate3: 4.9,
    status: 'pass',
  },
  {
    id: 3,
    name: 'Lập trình Nâng cao',
    code: 'INT1107',
    rate1: 3.4,
    rate2: 4.8,
    rate3: 4.9,
    status: 'pass',
  },
  {
    id: 4,
    name: 'Khai phá dữ liệu',
    code: 'INT1107',
    rate1: 3.8,
    rate2: 3.8,
    rate3: 4.2,
    status: 'failed',
  },
  {
    id: 5,
    name: 'Tư tưởng Hồ CHí Minh',
    code: 'TTHCM01',
    rate1: 2.6,
    rate2: 4.8,
    rate3: 3.2,
    status: 'failed',
  },
  {
    id: 6,
    name: 'Kinh tế chính trị',
    code: 'KTCT001',
    rate1: 3.6,
    rate2: 4.8,
    rate3: 4.2,
    status: 'pass',
  },
  {
    id: 7,
    name: 'Nhập môn lập trình',
    code: 'INT0001',
    rate1: 4,
    rate2: 4.8,
    rate3: 3,
    status: 'pass',
  },
  {
    id: 8,
    name: 'Phát triển ứng dụng di động',
    code: 'MBB2036',
    rate1: 3.2,
    rate2: 4.8,
    rate3: 4.2,
    status: 'failed',
  },
  {
    id: 9,
    name: 'Lập trình mạng',
    code: 'MAT9911',
    rate1: 3.2,
    rate2: 4.8,
    rate3: 4.2,
    status: 'pass',
  },
];

const renderTypeList = [
  {
    type: 'Tất cả',
    id: 0,
  },
  {
    type: 'Đã tốt nghiệp',
    id: 1,
  },
  {
    type: 'Chưa tốt nghiệp',
    id: 2,
  },
];

