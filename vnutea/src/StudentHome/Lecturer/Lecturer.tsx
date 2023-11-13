import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import TaskComment from './TaskComment';

const Lecturer = () => {
    const navigation = useNavigation();
    const [likes, setLikes] = useState(require('../image/love.png'));
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) {
            setLikes(require('../image/loved.png'));
        } else {
            setLikes(require('../image/love.png'));
        }
        setIsClicked(!isClicked);
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.avatar} source={{ uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2019/04/02/cd273738c1c623987ad7.jpg' }}></Image>
                <Text style={styles.textNameLecturer}>Thầy Lê Phê Đô</Text>
                <Text style={styles.textMota}>Giảng viên bộ bôn toán đại cương, đã có hơn 30 năm đứng trên cương vị giảng dạy với bề dày thành tích đáng tự hào</Text>
                <TouchableOpacity style={styles.circular} onPress={handleClick}>
                    <Image style={styles.imageLove} source={likes}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMessanger} onPress={() => navigation.navigate('Messanger')} >
                    <Image style={{ height: '100%', width: '100%' }} source={require('../image/mess.png')} />
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.borderViewLeft}>
                        <Image style={{ position: 'absolute', top: 10, }} source={require('../image/star1.png')}></Image>
                        <Text style={{ position: 'absolute', top: 52, color: '#263257', fontSize: 12, fontWeight: '800', }}>4.8</Text>
                        <Text style={{ position: 'absolute', top: 66, color: '#263257', fontSize: 12, fontWeight: '800', }}>Rating</Text>
                    </View>
                    <View style={styles.borderViewRight}>
                        <Image style={{ position: 'absolute', top: 10, }} source={require('../image/mu.png')}></Image>
                        <Text style={{ position: 'absolute', top: 52, color: '#263257', fontSize: 12, fontWeight: '800', }}>100+</Text>
                        <Text style={{ position: 'absolute', top: 66, color: '#263257', fontSize: 12, fontWeight: '800', }}>Classes</Text>
                    </View>
                </View>
                <View style={styles.viewContact}>
                    <Text style={styles.text}>Liên hệ</Text>
                    <TouchableOpacity style={styles.buttonContact} onPress={() => navigation.navigate('ContactLecturer')}>
                        <Image source={require('../image/arrowright.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boderContact}>
                    <View style={styles.inforContact}>
                        <View style={styles.boderInforContact}>
                            <Image source={require('../image/phone.png')} />
                        </View>
                        <Text style={styles.textInforContact}>0338673187</Text>
                    </View>
                    <View style={styles.inforContact}>
                        <View style={styles.boderInforContact}>
                            <Image source={require('../image/mail.png')} />
                        </View>
                        <Text style={styles.textInforContact}>21020304@vnu.edu.vn</Text>
                    </View>
                    <View style={styles.inforContact}>
                        <View style={styles.boderInforContact}>
                            <Image source={require('../image/mail.png')} />
                        </View>
                        <Text style={styles.textInforContact}>https://www.facebook.com/profile.php?id=100014738946643</Text>
                    </View>
                </View>
                <Text style={styles.text}>Current Management Positions</Text>
                <View style={styles.border}>
                    <FlatList
                        data={[
                            { key: 'Head, Department of Science, Technology and International Relations, VNU-UET.' },
                            { key: 'Director, VNU Key Laboratory for Smart Integrated Systems (SISLAB).' },
                            { key: 'Member & Secrectary of the Scientific & Academic Council of the VNU-UET' },
                            { key: 'Senior Member of IEEE, IEEE CAS, IEEE SSCS (Chairman, SSCS Vietnam Chapter).' },
                            { key: 'Member of the Executing Board of The Radio-Electronics Association of Vietnam (REV) (2009-2014, 2014-2019).' },
                            { key: ' Member of IEICE (Chairman, IEICE Vietnam Section).' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.textBorder}>+ {item.key}</Text>}
                    />
                </View>
                <Text style={styles.text}>Academic Positions</Text>
                <View style={styles.border}>
                    <FlatList
                        data={[
                            { key: 'Since 2011: Associate Professor in Electronics and Computer Engineering at VNU-UET.' },
                            { key: '2008-2011: Assistant Professor at VNU-UET.' },
                            { key: '/2005-2/2008: Engineer-Researcher (PhD student), ASIC design department, CEA-LETI, MINATEC, Grenoble, France..' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.textBorder}>+ {item.key}</Text>}
                    />
                </View>
                <View style={styles.viewContact}>
                    <Text style={styles.text}>Bình luận</Text>
                    <TouchableOpacity style={styles.buttonContact} onPress={() => navigation.navigate('Comment')}>
                        <Image source={require('../image/arrowright.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TaskComment text='Kha Banh'></TaskComment>
                    <TaskComment text='Kha Banh'></TaskComment>
                    <TaskComment text='Kha Banh'></TaskComment>
                    <TaskComment text='Kha Banh'></TaskComment>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        position: 'absolute',
        left: '5%',
        top: 20,
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    textNameLecturer: {
        color: '#2B7EFF',
        fontSize: 20,
        fontFamily: 'Montserrat Alternates',
        fontWeight: '800',
        wordWrap: 'break-word',
        marginTop: 110,
        marginLeft: '5%',
    },
    textMota: {
        color: '#7B8190',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '600',
        wordWrap: 'break-word',
        marginLeft: '5%',
        marginRight: 50,
        marginBottom: 10,
    },
    buttonMessanger: {
        position: 'absolute',
        top: 50,
        right: 80,
        width: 40,
        height: 40,
    },
    circular: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
    },
    imageLove: {
        width: 40,
        height: 40,
    },
    borderViewLeft: {
        marginLeft: '5%',
        backgroundColor: 'linear-gradient(96deg, #F0FFF3 0%, rgba(121, 226, 138, 0.20) 100%)',
        width: '45%',
        height: 120,
        borderWidth: 2,
        borderColor: '#77C9A3',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    borderViewRight: {
        position: 'absolute',
        right: '5%',
        backgroundColor: 'linear-gradient(96deg, #F0FFF3 0%, rgba(121, 226, 138, 0.20) 100%)',
        width: '45%',
        height: 120,
        borderWidth: 2,
        borderColor: '#77C9A3',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContact: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    text: {
        margin: '5%',
        color: '#19253D',
        fontSize: 20,
        fontFamily: 'Lato',
        fontWeight: '800',
    },
    buttonContact: {
        position: 'absolute',
        right: 30,
    },
    boderContact: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#F7F8F8',
        borderWidth: 2,
        borderColor: '#19253D',
    },
    inforContact: {
        margin: 10,
        marginRight: 20,
        height: 40,
        justifyContent: 'center',
    },
    boderInforContact: {
        height: 40,
        width: 40,
        backgroundColor: '#FF7070',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textInforContact: {
        position: 'absolute',
        left: 50,
        color: '#19253D',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '700',
        wordWrap: 'break-word',
    },
    border: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#F7F8F8',
        borderWidth: 2,
        borderColor: '#19253D',
        justifyContent: 'center',
    },
    textBorder: {
        margin: 10,
        color: '#19253D',
        fontSize: 14,
        fontFamily: 'Lato',
        fontWeight: '700',
        wordWrap: 'break-word',
    }
});
export default Lecturer;