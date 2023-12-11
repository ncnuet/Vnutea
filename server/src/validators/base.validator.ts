import { EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export default abstract class BaseValidator {
    protected static validateEmail(email: string) {
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new InputError("Email không hợp lệ", "email");
        }
        return true
    }

    protected static validateRole(role: string, und?: boolean) {
        if (role) {
            if (!Object.values(EUserRole).includes(role as EUserRole)) {
                throw new InputError("Invalid role", "role");
            } else if (!und) throw new InputError("Must include role", role);
        }
    }
}