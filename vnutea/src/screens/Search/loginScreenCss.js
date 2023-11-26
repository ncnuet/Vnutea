import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const sLoginScreen = StyleSheet.create({
    loginBg: {
        backgroundColor: '#19253D',
        flex: 1,
    },
    loginBgImage: {
        height: 0.2*windowHeight,
        alignItems:"center",
        justifyContent:"center",
    },  
    loginBgImageSize: {
        marginTop: 0.07 * windowHeight,
        height: 0.3 * windowHeight,
        width: 0.3 * windowWidth,
        resizeMode: "contain",
    },
    loginAllTextWraper: {
        marginTop: 0.007 * windowHeight,
        height: 0.8*windowHeight,
    },
    loginText1View: {
        flex: 6,
    },
    loginText1: {
        color: "#fff",
        fontSize: 31,
        fontWeight: "bold",
        textAlign: 'center',
    },
    loginInputWrapper: {
        flex: 12,
        marginLeft: 0.07 * windowWidth,
        marginRight: 0.07 * windowWidth,
    },
    loginText2: {
        color: "#fff",
        fontSize: 16,
    },
    loginInput1: {
        backgroundColor: '#fff',
        height: 45,
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 10,
        fontSize: 16,
    },
    loginInput2: {
        backgroundColor: '#fff',
        height: 45,
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 3,
        fontSize: 16,
        display: 'flex',
    },
    forgotPasswordWrapper: {
        marginTop: 8,
        alignItems: "flex-start",
        marginLeft: 2,
    },
    forgotPasswordWrapperText: {
        color: "white",
        textDecorationLine: "underline",
    },
    loginButtonWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems:"center",
        marginTop: 0.023 * windowHeight,
    },
    loginButton: {
        backgroundColor: '#92D5E6',
        borderRadius: 10,
        height: 0.060 * windowHeight,
        width: "55%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        color: "#fff",
        marginBottom: 5,
        fontSize: 16,
    },
    loginButtonText: {
        color: '#19253D',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerButtonWrapper: {
        flex: 32,
        width: windowWidth,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 0.04 * windowHeight,
    },
    registerButton: {
        backgroundColor: '#5596CB',
        borderRadius: 10,
        height: 0.060 * windowHeight,
        width: "55%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButtonText: {
        color: '#1E2932',
        fontWeight: 'bold',
        fontSize: 16,
    },
    Empty: {
        flex: 0,
    }
})
