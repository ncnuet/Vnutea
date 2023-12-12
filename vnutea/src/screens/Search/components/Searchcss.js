import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myBlue = '#0672F7';
const myWidth = '86%'; 
const myGray ='#E5EBF2';
const myBoldGray = '#9EA1A5';
const myMaxLength = 40;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#19253D",
        flex: 1,
    },
    emptyTop: {
        backgroundColor: "#fff",
        width: "100%",
        height: 0.05 * windowHeight,
    },
    allWrapper: {
        backgroundColor: "#fff",
        width: "100%",
        maxHeight: 0.85 * windowHeight,
        height: 0.85* windowHeight,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        //paddingBottom: 0.028 * windowHeight,
        paddingTop: 0.03 * windowHeight,
    },
    labelWrapper: {
        width: {myWidth},
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        height: 0.08 * windowHeight,
        //borderWidth: 1,
        //borderColor: "red",
        marginTop: 0.02 * windowHeight,
    },
    labelText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#19253D",
    },
    inputWrapper: {
        width: {myWidth},
        height: 0.06 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        //borderColor: "red",
        //borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputAndBtnWrapper: {
        height: "100%",
        width: 0.86 * windowWidth - 0.06 * windowHeight - 0.012 * windowHeight,
        //borderWidth: 1,
        //borderColor: "green",
        borderRadius: 100,
        backgroundColor: myGray,
        flexDirection: "row",
    },
    btnSearch: {
        height: "100%",
        width: "20%",
        //borderWidth: 1,
        //borderColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    inputSearch: {
        height: "100%",
        width: "75%",
        //alignItems: "center",
        justifyContent: "center",
    },
    inputSearchText: {
        fontSize: 0.02 * windowHeight,
    },
    btnMic: {
        alignItems: "center",
        justifyContent: "center",
        width: 0.06 * windowHeight,
        height: 0.06 * windowHeight,
        borderRadius: 100,
        backgroundColor: myBlue,
    },
    fourOptionsWrapper: {
        marginTop: 0.04 * windowHeight,
        width: {myWidth},
        height: 0.124 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        flexDirection: "row",
        //borderWidth: 1,
        //borderColor: "green",
    },
    btnOptionsWrapper: {
        height: "100%",
        width: 0.18 * windowWidth,
        //borderColor: "green",
        //borderWidth: 1,
        marginRight: 0.036 * windowWidth,
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnOptions: {
        width: 0.18 * windowWidth,
        height: 0.18 * windowWidth,
        //borderColor: "red",
        //borderWidth: 1,
        borderRadius: 100,
        backgroundColor: myGray,
        alignItems: "center",
        justifyContent: "center",
    },
    textOptions: {
        fontSize: 0.04 * windowWidth,
    },
    btnOptions_selected: {
        width: 0.18 * windowWidth,
        height: 0.18 * windowWidth,
        //borderColor: "red",
        //borderWidth: 1,
        borderRadius: 100,
        backgroundColor: myBlue,
        alignItems: "center",
        justifyContent: "center",
    },
    textOptions_selected: {
        fontSize: 0.04 * windowWidth,
        fontWeight: "bold",
    },
    
    recentSearchsWrapper: {
        height: 0.05 * windowHeight,
        width: myWidth,
        marginTop: 0.018 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //borderWidth: 1,
        //borderColor: "green",
    },
    recentSearchText: {
        fontSize: 0.026 * windowHeight,
        fontWeight: "bold",
    },
    recentSeachClearBtn: {
        width: 0.24 * windowWidth,
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 2,
        //borderWidth: 1,
        //borderColor: "red",
    },
    recentSearchClearBtnText: {
        fontSize: 0.036 * windowWidth,
        fontWeight: "bold",
        color: myBoldGray,
    },
    recentSearchsListWrapper: {
        width: myWidth,
        marginTop: 0.012 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        //borderWidth: 1,
    },
    topSearchsWrapper: {
        width: myWidth,
        height: 0.04 * windowHeight,
        marginTop: 0.018 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //borderWidth: 1,
        //borderColor: "green",
    },
    topSearchText: {
        fontSize: 0.026 * windowHeight,
        fontWeight: "bold",
    },
    topSeachClearBtn: {
        width: 0.24 * windowWidth,
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 2,
        //borderWidth: 1,
        //borderColor: "red",
    },
    topSearchClearBtnText: {
        fontSize: 0.036 * windowWidth,
        fontWeight: "bold",
        color: myBoldGray,
    },
    topSearchsListWrapper: {
        width: myWidth,
        marginTop: 0.012 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        //borderWidth: 1,
    },
    itemRecentSearchs: {
        marginHorizontal: 0.01 * windowWidth,
        marginVertical: 0.0045 * windowHeight,
        paddingHorizontal: 0.016 * windowWidth,
        backgroundColor: myGray,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
    },
    btnRecentSearchs: {
        paddingHorizontal: 0.01 * windowWidth,
        paddingVertical: 0.004 * windowHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textRecentSearchs: {
        color: myBoldGray,
        paddingHorizontal: 0.008 * windowWidth,
        paddingVertical: 0.004 * windowHeight,
        fontSize: 0.018 * windowHeight,
    },
    topSearchsItem: {
        marginVertical: 0.008 * windowHeight,
        width: "100%",
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
    searchHeartWrapper: {
        width: "20%",
        height: "100%",
        // borderWidth: 1,
        // borderColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

    tabBarWrapper: {
        width: "90%",
        height: 0.08* windowHeight,
        flexDirection: "row",
        //borderWidth: 1,
        //borderColor: "red",
        marginLeft: 0.05 * windowWidth,
        marginRight: 0.05 * windowWidth,
        marginTop: 0.001 * windowHeight,
        marginBottom: 0.001 * windowHeight,
    },
    btnMenu: {
        alignItems: "center",
        justifyContent: "center",
        width: 0.225 * windowWidth,
        aspectRatio: 1,
        //borderWidth: 1,
        //borderColor: "red",
    },


    //SearchRes
    searchResWrapper: {
        flexDirection: 'column',
        width: myWidth,
        marginTop: 0.018 * windowHeight,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    listSearchResWrapper: {
        flexGrow: 1,
        width: '100%',
        marginTop: 0.016 * windowHeight,
    },
    resultItem: {
        height: 0.1 * windowHeight,
        width: '100%',
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 0.006 * windowHeight,
        marginBottom: 0.006 * windowHeight,
    },
    paddingBottomItem: {
        height: 0.05 * windowHeight,
        width: '100%',
    }   
})