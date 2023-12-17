import { EUSerRole, IUser } from "@/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export const UserContext = createContext<{ user: IUser, setUser: Dispatch<SetStateAction<IUser>> }>(null!);

const Default_User: IUser = {
    uid: "",
    name: "guest",
    role: EUSerRole.STUDENT,
    username: "@guest",
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>(Default_User)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
