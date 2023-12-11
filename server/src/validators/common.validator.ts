import { InputError } from "@/types/controller";

export default class CommonValidator {
    static validateUID(uid: string) {
        if (!uid || uid.length !== 24) {
            throw new InputError("UID không hợp lệ", "uid");
        }
        return true
    }
}