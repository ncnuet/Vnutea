import { EMajor, EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export default abstract class BaseValidator {
    protected static checkEmail(email: string) {
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new InputError("Email không hợp lệ", "email");
        }
        return true
    }

    protected static checkRole(role: string, und?: boolean) {
        if (role) {
            if (!Object.values(EUserRole).includes(role as EUserRole)) {
                throw new InputError("Invalid role", "role");
            }
        } else if (!und) throw new InputError("Must include role", "role");
    }

    protected static checkMajor(major: string, und?: boolean) {
        if (major) {
            if (!Object.values(EMajor).includes(major as EMajor)) {
                throw new InputError("Invalid major", "major");
            }
        } else if (!und) throw new InputError("Must include major", "major");
    }

    private static checkPhone(phone: string) {
        if (!phone || phone.length !== 10 || !phone.startsWith("0")) {
            throw new InputError("Invalid phone number", "phone");
        }
    }
}