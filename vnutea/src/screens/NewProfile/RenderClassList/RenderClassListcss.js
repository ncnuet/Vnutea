import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mySpecBlue = '#19253D';

export const styles = StyleSheet.create({
    itemWrapper: {
        width: '86%',
        marginLeft: 0.07 * windowWidth,
        backgroundColor: '#fff',
        height: 0.12 * windowHeight,
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
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemDesTopWrapper: {
        height: '33%',
        width: '100%',
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
        fontWeight: '600',
        fontFamily: "Montserrat",
    },
    itemDesMidWrapper: {
        marginTop: -0.008 * windowHeight,
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemCodeText: {
        color: mySpecBlue,
        fontSize: 0.0112 * windowHeight + 0.0112 * windowWidth,
        fontWeight: '500',
        fontFamily: "Montserrat",
    },
    itemDesBotWrapper: {
        height: '25%',
        paddingLeft: 0.014 * windowWidth,
        paddingRight: 0.014 * windowWidth,
        paddingTop: 0.0032 * windowHeight,
        paddingBottom: 0.0032 * windowHeight,
        backgroundColor: '#79E28A',
        borderRadius: 7,
        alignSelf: 'flex-start',
        marginBottom: 0.004 * windowHeight,
        marginTop: -0.02 * windowHeight,
    },
    itemDesBotText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 0.0068 * windowHeight + 0.0068 * windowHeight,
        fontFamily: "Montserrat",
    },
});
