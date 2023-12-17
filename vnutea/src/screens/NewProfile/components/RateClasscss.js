import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%'; 
const myGray ='#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;
const mySpecBlue = '#19253D';

export const styles = StyleSheet.create({ 
    headerBar: {
        backgroundColor: '#FFC700',
        width: '100%',
        height: 0.18 * windowHeight,
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27,
    },
    headerImg: {
        position: 'absolute',
        right: 0.04 * windowWidth,
        bottom: 0,
    },
    headerWrapper: {
        // borderWidth: 1,
        width: "80%",
        height: 0.06 * windowHeight,
        marginTop: 0.084 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        flexDirection: 'row',
    },
    headerBtn: {
        backgroundColor: '#FFE380',
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextWrapper: {
        marginLeft: 0.05 * windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // borderWidth: 1,
    },
    headerTopTextWrapper: {
        height: '55%',
        justifyContent: 'flex-start',
        // marginTop: -0.01 * windowHeight,
        // borderWidth: 1,
    },
    headerTopText: {
        color: mySpecBlue,
        fontSize: 0.0164 * windowHeight + 0.0164 * windowWidth,
        fontWeight: '600',
        fontFamily: "Montserrat",
    },
    headerBottomTextWrapper: {
        height: '45%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginTop: -0.001 * windowHeight,
        // borderWidth: 1,
    },
    headerBottomText: {
        color: mySpecBlue,
        fontSize: 0.0132 * windowHeight + 0.0132 * windowWidth,
        fontWeight: '500',
        textTransform: 'uppercase',
        fontFamily: "Montserrat",
    },
    reactBoxContainer: {
        // backgroundColor: 'red',
        // height: 0.71 * windowHeight,
        marginTop: 0.02 * windowHeight,
    },
    itemContainer: {
        paddingTop: 0.016 * windowHeight,
        paddingBottom: 0.016 * windowHeight,
        paddingLeft: 0.028 * windowWidth,
        paddingRight: 0.028 * windowWidth,
        width: 0.86 * windowWidth,
        // height: 50,
        marginLeft: 0.07 * windowWidth,
        backgroundColor: '#fff',
        borderRadius: 16,
        // borderWidth: 1,
        marginBottom: 0.012 * windowHeight,
        flexDirection: 'column',
    },
    itemTopWrapper: {
        // height: 60,
        width: '100%',
        // backgroundColor: 'green',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTextWrapper: {
        width: 0.68 * windowWidth,
        // height: 50,
        // borderWidth: 1,
        flexDirection: 'column',
    },
    itemNameWrapper: {
        width: '100%',
    },
    itemNameText: {
        fontSize: 0.0146 * windowHeight + 0.0146 * windowWidth,
        color: mySpecBlue,
        fontWeight: '700',
        fontFamily: "Montserrat",
    },
    itemDesWrapper: {
        width: '100%',
        marginTop: 0.002 * windowHeight,
    },
    itemDesText: {
        fontSize: 0.0104 * windowHeight + 0.0104 * windowWidth,
        color: mySpecBlue,
        fontWeight: '300',
        fontFamily: "Montserrat",
    },

    itemBtnWrapper: {
        width: 0.14 * windowWidth,
        // height: 50,
        // borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemBtn: {
        width: 0.1 * windowWidth,
        marginTop: 0.004 * windowHeight,
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: 100,
        justifyContent: 'flex-start',
        // borderWidth: 1,
        alignItems: 'center',
    },
    itemBtnImage: {
        // paddingTop: -0.01 * windowHeight,
        width: '86%',
        height: '86%',
        borderRadius: 100,
        resizeMode: 'cover',
        // backgroundColor: mySpecBlue,
    },
    itemBottomWrapper: {
        marginTop: 0.012 * windowHeight,
        // height: 30,
        width: '100%',
        // backgroundColor: 'red',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    btnBottomWrapper: {
        width: 0.12 * windowWidth,
        aspectRatio: 1,
        // borderWidth: 1,
        borderRadius: 100,
    },
    btnBottomImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover',
    },

    btnSubmit: {
        width: 0.86 * windowWidth,
        // position: 'absolute',
        // bottom: 0.038 * windowHeight,
        marginTop: 0.02 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        height: 0.064 * windowHeight,
        backgroundColor: '#FFC700',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        zIndex: 1,
    },
    btnSubmitText: {
        color: mySpecBlue,
        fontWeight: '600',
        fontSize: 0.0142 * windowHeight + 0.0142 * windowWidth,
        fontFamily: "Montserrat",
    },
});