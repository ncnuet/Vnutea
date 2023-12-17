import { View } from "react-native";
import ListDepartment from "./ListDepartment";
import ItemLecturer from "@/components/ItemLecturer";
import { useState } from "react";
import { IDepartmentName, ITeacher } from "@/types";
import { TeacherListProvider } from "@/hooks/teacher.context";
import TestXXX from "@/components/testxx";
interface IProps {
    departments: IDepartmentName[],
    teachers: ITeacher[]
}
export default function Trending({ departments, teachers }: IProps) {
    const [departmentShow, setDepartmentShow] = useState<string[]>(["0"]);

    function handleChange(activeItems: string[]) {
        setDepartmentShow(activeItems);
    }

    return (
        <View className=''>
            <ListDepartment
                data={departments}
                onChange={handleChange}>
            </ListDepartment>

            <TeacherListProvider initial={teachers}>
                <ItemLecturer dep={departmentShow} />
            </TeacherListProvider>

        </View>
    )
}