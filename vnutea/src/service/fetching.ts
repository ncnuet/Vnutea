import { Alert } from "react-native";
import axios from "./axios";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NavRootProp } from "@/types/routing";

export interface ReturnData<T = any> {
    message: string;
    data: T;
}

export default async function fetch<T>(
    fetcher: () => Promise<AxiosResponse<ReturnData<T>, any>>,
    callback?: (data: T, msg: string) => void) {

    try {
        const response = await fetcher();
        if (response.status === 200) {
            callback && callback(response.data.data, response.data.message);
        } else if (response.status === 401) {
           Alert.alert("Het ha dang nhap")
        } else {
            Alert.alert("Lỗi")
        }
    } catch (error) {
        Alert.alert("Lỗi")
    }
}