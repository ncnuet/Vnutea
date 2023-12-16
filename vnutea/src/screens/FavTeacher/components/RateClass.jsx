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

import {styles} from './RateClasscss.js';

import {Svg, Path} from 'react-native-svg';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%';
const myGray = '#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export default function RateClass({route,navigation}) {
  const {idClass, codeClass} = route.params;
  const [nameSubject, setNameSubject] = useState(codeClass);
  // const [reactOpen, setReactOpen] = useState([false, false, false]);
  const [openNum, setOpenNum] = useState(-1);
  const [reactNum, setReactNum] = useState([5, 5, 5, 5, 5, 5, 5]);

  const fakeDataList = [
    {
      id: 0,
      name: 'Chất lượng giảng dạy',
      des: 'Sự rõ ràng trong cách giảng bài và sự tận tâm, nhiệt huyết của giáo viên',
    },
    {
      id: 1,
      name: 'Nội dung học phần',
      des: 'Sự liên quan đến nội dung thực tế và độ khó với cấp độ học sinh',
    },
    {
      id: 2,
      name: 'Tài liệu học tập',
      des: 'Chất lượng và tính chất hữu ích của giáo trình và sự hiệu quả của slide bài giảng, tài liệu tham khảo',
    },
    {
      id: 3,
      name: 'Môi trường học tập',
      des: 'Sự thoải mái, sắp xếp của phòng học và mức độ tập trung và yên tĩnh trong lớp',
    },
    {
      id: 4,
      name: 'Phương pháp đánh giá',
      des: 'Sự công bằng trong cách chấm điểm, độ minh bạch và giải thích rõ ràng về các bài kiểm tra',
    },
    {
      id: 5,
      name: 'Công nghệ và tư duy sáng tạo',
      des: 'Sự tích hợp của công nghệ trong quá trình giảng dạy và sự sáng tạo của giáo viên',
    },
    {
      id: 6,
      name: 'Tính chất công bằng',
      des: 'Sự đối xử công bằng với các học sinh và sự linh hoạt để đáp ứng đa dạng trong lớp',
    },
  ];

  //render Icon
  const renderIcon = (id, ticked) => {
    let path;
    if (id == 1) {
      path = require('../assets/emo1.png');
      if (ticked == true) {
        path = require('../assets/emo1ticked.png');
      }
    }
    if (id == 2) {
      path = require('../assets/emo2.png');
      if (ticked == true) {
        path = require('../assets/emo2ticked.png');
      }
    }
    if (id == 3) {
      path = require('../assets/emo3.png');
      if (ticked == true) {
        path = require('../assets/emo3ticked.png');
      }
    }
    if (id == 4) {
      path = require('../assets/emo4.png');
      if (ticked == true) {
        path = require('../assets/emo4ticked.png');
      }
    }
    if (id == 5) {
      path = require('../assets/emo5.png');
      if (ticked == true) {
        path = require('../assets/emo5ticked.png');
      }
    }
    return <Image source={path} style={styles.itemBtnImage}></Image>;
  };

  const handleTurnOnReact = id => {
    // console.log('ok');
    // setReactOpen(prevState => {
    //   return prevState.map((value, index) => (index === id ? !value : value));
    // });
    // console.log(reactOpen);

    if (openNum == id) {
      setOpenNum(-1);
    } else {
      setOpenNum(id);
    }
    // console.log(id);
  };

  const handleReactOnPress = (id, react) => {
    setReactNum(prevState => {
      return prevState.map((value, index) => (index === id ? react : value));
    });
  };

  const renderReactList = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTopWrapper}>
          <View style={styles.itemTextWrapper}>
            {/* Name */}
            <View style={styles.itemNameWrapper}>
              <Text style={styles.itemNameText}>{item.name}</Text>
            </View>
            {/* Des */}
            <View style={styles.itemDesWrapper}>
              <Text style={styles.itemDesText}>{item.des}</Text>
            </View>
          </View>

          <View style={styles.itemBtnWrapper}>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => handleTurnOnReact(item.id)}>
              {/* <Image
                source={require('../assets/emo5.png')}
                style={styles.itemBtnImage}></Image> */}
              {renderIcon(reactNum[item.id], true)}
            </TouchableOpacity>
          </View>
        </View>

        {openNum == item.id && (
          <View style={styles.itemBottomWrapper}>
            <TouchableOpacity
              style={styles.btnBottomWrapper}
              onPress={() => handleReactOnPress(item.id, 1)}>
              {/* <Image
                source={require('../assets/emo1.png')}
                style={styles.btnBottomImage}></Image> */}
              {reactNum[item.id] == 1 && renderIcon(1, true)}
              {reactNum[item.id] != 1 && renderIcon(1, false)}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBottomWrapper}
              onPress={() => handleReactOnPress(item.id, 2)}>
              {/* <Image
                source={require('../assets/emo2.png')}
                style={styles.btnBottomImage}></Image> */}
              {reactNum[item.id] == 2 && renderIcon(2, true)}
              {reactNum[item.id] != 2 && renderIcon(2, false)}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBottomWrapper}
              onPress={() => handleReactOnPress(item.id, 3)}>
              {/* <Image
                source={require('../assets/emo3.png')}
                style={styles.btnBottomImage}></Image> */}
              {reactNum[item.id] == 3 && renderIcon(3, true)}
              {reactNum[item.id] != 3 && renderIcon(3, false)}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBottomWrapper}
              onPress={() => handleReactOnPress(item.id, 4)}>
              {/* <Image
                source={require('../assets/emo4.png')}
                style={styles.btnBottomImage}></Image> */}
              {reactNum[item.id] == 4 && renderIcon(4, true)}
              {reactNum[item.id] != 4 && renderIcon(4, false)}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBottomWrapper}
              onPress={() => handleReactOnPress(item.id, 5)}>
              {/* <Image
                source={require('../assets/emo5.png')}
                style={styles.btnBottomImage}></Image> */}
              {reactNum[item.id] == 5 && renderIcon(5, true)}
              {reactNum[item.id] != 5 && renderIcon(5, false)}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#F6F6F6', flex: 1}}>
      {/* Header  */}
      <View style={styles.headerBar}>
        <Image
          style={styles.headerImg}
          source={require('../assets/Vector2.png')}></Image>

        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              navigation.pop();
            }}>
            <IconAntDesign
              name="arrowleft"
              size={0.02 * windowHeight + 0.02 * windowWidth}
              color={mySpecBlue}></IconAntDesign>
          </TouchableOpacity>

          <View style={styles.headerTextWrapper}>
            <View style={styles.headerTopTextWrapper}>
              <Text style={styles.headerTopText}>Đánh giá lớp học</Text>
            </View>

            <View style={styles.headerBottomTextWrapper}>
              <Text style={styles.headerBottomText}>{nameSubject}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Body */}
      <ScrollView>

        {/* Danh sach danh gia */}
        <View style={styles.reactBoxContainer}>
          <FlatList
            data={fakeDataList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderReactList({item})}></FlatList>
        </View>

        {/* Nut luu nhan xet */}
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.btnSubmitText}>Lưu nhận xét</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}
