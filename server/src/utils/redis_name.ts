export enum NameType {
    USER_VERSION,
    USER_ROLE,
    TOKEN
}

export function getKey(name: string, type: NameType): string {
    return type === NameType.USER_VERSION && name + "_v" ||
        type === NameType.USER_ROLE && name + "_r" ||
        type === NameType.TOKEN && "token_" + name || name
}