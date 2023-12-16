export interface Department {
    name: string;
    id: string;
}

export interface Teacher {
    name: string;
    id: string;
    award: {
        name: string;
        color: string;
    },
    liked: boolean;
    department: string;
}

export interface Outstanding {
    name: string;
    awards: {
        name: string;
    }[]
    position: string[],
    user: string;
}