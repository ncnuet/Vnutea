import { ITeacher } from "@/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useReducer, useState } from "react";

export const TeacherListContext = createContext<{
    teachers: ITeacher[],
    dispatchTeachers: Dispatch<IActionUpdate>
}>(null!);

interface IProps {
    children: ReactNode,
    initial: ITeacher[]
}

export enum EActionUpdate {
    UPDATE_LIKE,
    UPDATE_ALL
}

interface IActionUpdate<T = any> {
    type: EActionUpdate,
    id: string,
    value: T,
}

function updateTeacherList(state: ITeacher[], action: IActionUpdate): ITeacher[] {
    switch (action.type) {
        case EActionUpdate.UPDATE_LIKE:
            return state.map(teacher => {
                if (teacher.id === action.id) {
                    return { ...teacher, like: action.value };
                } else {
                    return teacher;
                }
            });

        case EActionUpdate.UPDATE_ALL:
            return action.value as ITeacher[];
    }

    return state;
}

export function TeacherListProvider({ children, initial }: IProps) {
    const [teachers, dispatchTeachers] = useReducer(updateTeacherList, initial)

    useEffect(() => {
        dispatchTeachers({
            type: EActionUpdate.UPDATE_ALL,
            value: initial,
            id: ""
        });
    }, [initial])

    return (
        <TeacherListContext.Provider
            value={{ teachers, dispatchTeachers }}>
            {children}
        </TeacherListContext.Provider>
    )
}
