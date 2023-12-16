import { View } from "react-native";
import ListDepartment from "./ListDepartment";
import TaskLecturer from "@/components/TaskLecturer";
import { useState } from "react";
import { Department, Teacher } from "@/types";

const defaultDep = { name: "All", id: "0" }
interface IProps {
    departments: Department[],
    teachers: Teacher[]
}
export default function TrendingSection({ departments, teachers }: IProps) {
    const [departmentShow, setDepartmentShow] = useState<string[]>([defaultDep.id]);

    function handleChange(activeItems: string[]) {
        console.log(activeItems);
        setDepartmentShow(activeItems);
    }

    return (
        <View className='mt-7'>
            <ListDepartment
                data={departments}
                onChange={handleChange}>
            </ListDepartment>
            <TaskLecturer
                depName={departments}
                data={
                    (departmentShow.length === 1 && departmentShow[0] === "0")
                        ? teachers
                        : teachers.filter(teacher => departmentShow.includes(teacher.department))
                }>

            </TaskLecturer>
        </View>
    )
}