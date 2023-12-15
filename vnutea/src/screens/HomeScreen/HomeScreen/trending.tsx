import { Alert, View } from "react-native";
import ListDepartment from "./ListDepartment";
import TaskLecturer from "./TaskLecturer";
import { useEffect, useState } from "react";
import axios from "@/service/axios";

interface Department {
    name: string;
    id: string;
}

interface Teacher {
    name: string;
    id: string;
    award: {
        name: string;
        color: string;
    },
    liked: boolean;
    department: string;
}

const defaultDep = { name: "All", id: "0" }

export default function TrendingSection() {
    const [departments, setDepartments] = useState<Department[]>([defaultDep]);
    const [departmentShow, setDepartmentShow] = useState<string[]>([defaultDep.id]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        async function getDepartments() {
            try {
                const response = await axios.get("/department/name");
                if (response.status === 200) {
                    console.log(response.data.data.departments);
                    setDepartments([{ name: "All", id: "0" }, ...response.data.data.departments]);
                } else {
                    Alert.alert("Lỗi");
                }
            } catch (error: any) {
                console.log(error.message);
                Alert.alert("Lỗi")
            }
        }

        async function getTeacher() {
            try {
                const response = await axios.get("/teacher");
                if (response.status === 200) {
                    console.log(response.data.data.teacher);
                    setTeachers(response.data.data.teacher);
                } else {
                    Alert.alert("Lỗi");
                }
            } catch (error: any) {
                console.log(error.message);
                Alert.alert("Lỗi")
            }
        }

        getDepartments();
        getTeacher();
    }, [])

    function handleChange(activeItems: string[]) {
        console.log(activeItems);
        setDepartmentShow(activeItems);
    }

    return (
        <View className='mt-7'>
            <ListDepartment
                data={departments}
                onChange={handleChange}></ListDepartment>
            <TaskLecturer 
            depName = {departments}
            data={
                (departmentShow.length === 1 && departmentShow[0] === "0")
                    ? teachers
                    : teachers.filter(teacher => departmentShow.includes(teacher.department))
            }></TaskLecturer>
        </View>
    )
}