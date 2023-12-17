import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%'; 
const myGray ='#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 24;
const mySpecBlue = '#19253D';

export const styles = StyleSheet.create({
    headerImg: {
        position: 'absolute',
        right: 0.12 * windowWidth,
        bottom: 0,
    },
    topBar: {
        backgroundColor: '#FFC700',
        width: '100%',
        height: 0.18 * windowHeight,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    topWrapper: {
        marginTop: 0.08 * windowHeight,
        width: '80%',
        height: 0.06 * windowHeight,
        // backgroundColor: 'red',
        flexDirection: 'row',
    },
    topBtn: {
        backgroundColor: '#FFE175',
        borderRadius: 100,
        height: '100%',
        aspectRatio: 1,
        marginRight: 0.05 * windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topTextWrapper: {
        // backgroundColor: '#FFE175',
        height: '100%',
        width: 0.6 * windowWidth,
        justifyContent: 'center',
    },
    topText: {
        fontSize: 0.0164 * windowHeight + 0.0164 * windowWidth,
        color: mySpecBlue,
        fontWeight: '600',
        fontFamily: "Montserrat",
    },
    topSearchsItem: {
        marginVertical: 0.008 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        width: myWidth,
        height: 0.11 * windowHeight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ECEBE0",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    searchItemAvtWrapper: {
        width: "24%",
        height: "90%",
        // borderWidth: 1,
        // borderColor: "red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    avtGv: {
        width: "70%",
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "green",
    },
    avtStyle: {
        width: "94%",
        height: "94%",
        resizeMode: "cover",
        borderRadius: 10,
    },
    rateWrapper: {
        width: "70%",
        height: "25%",
        // borderWidth: 1,
        // borderColor: "green",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    searchItemDesWrapper: {
        width: "70%",
        height: "90%",
        // borderWidth: 1,
        // borderColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchItemMain: {
        width: "100%",
        height: "65%",
        // borderWidth: 1,
        // borderColor: "green",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    searchItemTextWrapper: {
        width: "80%",
        height: "100%",
        // borderWidth: 1,
        // borderColor: "black",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    searchItemName: {
        width: "100%",
        height: "60%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: "red",
        fontSize: 0.0164 * windowHeight + 0.0164 * windowWidth,
    },
    searchNameText: {
        fontWeight: "bold",
        fontSize: 0.0164 * windowHeight + 0.0164 * windowWidth,
    },
    searchItemJob: {
        width: "100%",
        height: "40%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // borderWidth: 1,
        // borderColor: "red",
    },
    searchJobText: {
        fontSize: 0.0104 * windowHeight + 0.0104 * windowWidth,
        color: myBoldGray,
    },
    searchHeartWrapper: {
        paddingTop: 0.01 * windowHeight,
        width: "20%",
        height: "100%",
        // borderWidth: 1,
        // borderColor: "black",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
    searchItemTag: {
        width: "100%",
        height: "30%",
        // borderWidth: 1,
        // borderColor: "green",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    searchTagText: {
        // height: "90%",
        fontSize: 0.0092 * windowHeight + 0.0092 * windowWidth,
        // fontWeight: "bold",
        color: "white",
        backgroundColor: "#4BBEFA",
        paddingHorizontal: 0.01 * windowWidth,
        marginHorizontal: 0.005 * windowWidth,
        borderRadius: 5,
        paddingBottom: 1,
    },
    colorTagText2: {
        backgroundColor: "#14D950",
    },
    topSearchsListWrapper: {
        width: '100%',
        height: 0.674 * windowHeight,
        marginTop: 0.012 * windowHeight,
        // marginLeft: 0.07 * windowWidth,
        // marginRight: 0.07 * windowWidth,
        // borderWidth: 1,
    },
    allListWrapper: {
        marginTop: 0.03 * windowHeight,
        width: '100%',
        height: 0.664* windowHeight,
        borderWidth: 1,
    },


    itemWrapper: {
        width: '86%',
        marginLeft: 0.07 * windowWidth,
        backgroundColor: '#fff',
        height: 0.12 * windowHeight,
        // borderWidth: 1,
        marginTop: 0.016 * windowHeight,
        borderRadius: 22,
        flexDirection: 'row',
    },
    logoWrapper: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 22,
        backgroundColor: '#E7F0FE',
        justifyContent: 'center',
        alignItems: 'center',    
    },
    logoImg: {
        width: '76%',
        height: '76%',
        resizeMode: 'cover',
    },
    itemDesWrapper: {
        height: '100%',
        width: 0.54 * windowWidth,
        marginLeft: 0.04 * windowWidth,
        // borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemDesTopWrapper: {
        height: '33%',
        width: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemNameWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    itemNameText: {
        color: mySpecBlue,
        fontSize: 0.0126 * windowHeight + 0.0126 * windowWidth,
        fontWeight: '500',
        fontFamily: "Montserrat",
    },
    itemCodeWrapper: {
        marginLeft: 0.012 * windowWidth,
        height: '100%',
        justifyContent: 'center',
    },
    itemCodeText: {
        color: mySpecBlue,
        fontSize: 0.0126 * windowHeight + 0.0126 * windowWidth,
        fontWeight: '500',
    },
    itemDesMidWrapper: {
        marginTop: -0.008 * windowHeight,
        height: '40%',
        width: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemDesRateWrapper: {
        height: '100%',
        width: 0.16 * windowWidth,
        // borderWidth: 1,
        marginRight: 0.02 * windowWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDesIconWrapper: {
        marginLeft: 0.0052 * windowWidth,
        height: '40%',
        aspectRatio: 1,
        // borderWidth: 1,
    },
    itemDesIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    itemDesValueWrapper: {
        // marginLeft: 0.01 * windowWidth,
        height: '80%',
        width: 0.104 * windowWidth,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemDesValue: {
        color: mySpecBlue,
        fontSize: 0.0132 * windowHeight + 0.0132 * windowWidth,
        fontWeight: '600',
        fontFamily: "Montserrat",
    },
    itemDesBotWrapper: {
        height: '25%',
        // width: '100%',
        // borderWidth: 1,
        paddingLeft: 0.014 * windowWidth,
        paddingRight: 0.014 * windowWidth,
        paddingTop: 0.0032 * windowHeight,
        paddingBottom: 0.0032 * windowHeight,
        backgroundColor: '#79E28A',
        borderRadius: 7,
        alignSelf: 'flex-start',
        marginBottom: 0.004 * windowHeight,
    },
    itemDesBotText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 0.0068 * windowHeight + 0.0068 * windowHeight,
        fontFamily: "Montserrat",
    },

    renderTypeWrapper: {
        width: '100%',
        height: 0.04 * windowHeight,
        // backgroundColor: 'red',
        marginTop: 0.01 * windowHeight,
        marginLeft: 0.08 * windowWidth,
    },
    typeItemWrapper: {
        height: '100%',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 1000,
        paddingHorizontal: 0.026 * windowWidth,
        marginHorizontal: 0.01 * windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeItemText: {
        color: mySpecBlue,
        fontWeight: '600',
        fontSize: 0.01 * windowHeight + 0.01 * windowWidth,
        fontFamily: "Montserrat",
    },
    typeTickedWrapper: {
        backgroundColor: '#FFC700',
    },
    typeTickedText: {
        color: '#fff',
    },
    
})
