export type RootStackParamList = {
  OnBoarding: undefined;
  MainRootApp: undefined;
  Login: { isLogout: boolean };
};

export type StudentTabParamList = {
  Home: undefined;
  Setting: undefined;
  Search: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type StudentStackParamList = {
  HomeScreen: undefined;
  LecturerScreen: {
    id: string
  };
  ContactScreen: undefined;
  ClassScreen: undefined;
  LabScreen: undefined;
  DepartmentScreen: undefined;
  TeacherList: undefined;
};

export type MyStackParamList = {
  Student: undefined;
};
