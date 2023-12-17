import { NavigationProp } from "@react-navigation/native";
import { ITeacherDetails } from ".";

export type RootStackParamList = {
  OnBoarding: undefined;
  MainRootApp: undefined;
  Login: { isLogout: boolean };
};

export type NavRootProp = NavigationProp<RootStackParamList>;

export type StudentTabParamList = {
  Home: undefined;
  Setting: undefined;
  Search: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type StudentStackParamList = {
  HomeScreen: undefined;
  TeacherList: undefined;
  ContactScreen: {
    user: ITeacherDetails
  };
  LecturerScreen: {
    id: string
  };
  ClassScreen: {
    id?: string,
    name?: string 
  };
  LabScreen: {
    id: string
  };
  DepartmentScreen: {
    id: string
  };
};

export type MyStackParamList = {
  Student: undefined;
};
