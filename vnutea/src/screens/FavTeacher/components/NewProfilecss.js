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
    topBar: {
        backgroundColor: '#FFC700',
        width: '100%',
        height: 0.18 * windowHeight,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    headerImg: {
        position: 'absolute',
        right: 0.12 * windowWidth,
        bottom: 0,
    },
    headerBoxWrapper: {
        marginTop: 0.09 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        width: '86%',
        height: 0.06 * windowHeight,
        flexDirection: 'row',
        // borderWidth: 1,
    },
    headerLogoWrapper: {
        width: '45%',
        height: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        height: 0.034 * windowHeight,
        width: 0.034 * windowHeight,
        resizeMode: 'cover',
    },
    headerLogoTextWrapper: {
        // borderWidth: 1,
        // width: '60%',
        height: '100%',
        marginLeft: 0.03 * windowWidth,
        justifyContent: 'center',
    },
    headerLogoText: {
        color: mySpecBlue,
        fontWeight: '600',
        fontSize: 0.0162 * windowHeight + 0.0162 * windowWidth,
    },
    headerInfoWrapper: {
        width: '55%',
        height: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    headerAvtWrapper: {
        height: '100%',
        aspectRatio: 1,
        // borderWidth: 2,
        // borderColor: mySpecBlue,
        // borderRadius: 100,
    },
    headerAvt: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: mySpecBlue,
        borderRadius: 100,
    },
    headerInfoTextWrapper: {
        height: '100%',
        width: '68%',
        marginRight: 0.032 * windowWidth,
        // borderWidth: 1,
        flexDirection: 'column',
    },
    headerInfoNameWrapper: {
        width: '100%',
        height: '50%',
        // borderWidth: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    headerInfoNameText: {
        color: mySpecBlue,
        fontWeight: '800',
        fontSize: 0.0146 * windowHeight + 0.0146 * windowWidth,
    },
    headerInfoIdWrapper: {
        width: '80%',
        height: '34%',
        // borderWidth: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        // marginRight: -1,
        marginTop: -0.0044 * windowHeight,
    },
    headerInfoIdText: {
        color: mySpecBlue,
        fontWeight: '800',
        fontSize: 0.011 * windowHeight + 0.011 * windowWidth,
    },
    threeBtnWrapper: {
        marginTop: 0.044 * windowHeight,
        height: 0.18 * windowHeight,
        width: '86%',
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        // borderWidth: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
    },
    midBtnWrapper: {
        height: 0.06 * windowHeight,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingLeft: 0.02 * windowWidth,
        
        // borderWidth: 1,
    },
    midBtnText: {
        // marginLeft: 0.02 * windowWidth,
        color: mySpecBlue,
        fontSize: 0.016 * windowHeight + 0.016 * windowWidth,
        fontWeight: '500',
    },
    midBtnIcon: {
        height: '100%',
        aspectRatio: 1,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtnWrapper: {
        marginTop: 0.018 * windowHeight,
        height: 0.06 * windowHeight,
        width: '86%',
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
    }

});