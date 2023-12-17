import {
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList,
  } from 'react-native';
  import React, {
    useMemo,
  } from 'react';
  
  import {styles} from './RenderClassListcss.js';
  
  const myMaxLength = 22;
  
  export default function RenderClassList({navigation, dataChatList, statusRender}) {
  
    const filteredClassList = useMemo(() => {
      if (statusRender === 'all') {
        return dataChatList;
      } else if (statusRender === 'pass') {
        return dataChatList.filter(item => item.status === 'pass');
      } else {
        return dataChatList.filter(item => item.status === 'failed');
      }
    }, [statusRender]);
  
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
  
        {/* Danh sach cac mon hoc */}
        <View style={styles.topSearchsListWrapper}>
          <FlatList
            data={filteredClassList}
            keyExtractor={item => item.id.toString()}
            renderItem={renderClassList}
          />
          <View style={styles.paddingBottomItem}></View>
        </View>

      </View>
    );
  }

  