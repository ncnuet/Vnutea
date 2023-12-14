import { IContact } from "@/models/schema/contact.schema";
import { IDetail } from "@/models/schema/detail.schema";
import { EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export default abstract class BaseValidator {
    protected static checkUnd(data: any, und: boolean, key: string, message: string = key) {
        if (!data && !und)
            throw new InputError("Must include " + message, key)
    }

    protected static checkTypeEnum(type: object, data: any, und: boolean, key: string, message: string = key) {
        this.checkUnd(data, und, key, message);

        if (!Object.values(type).includes(data))
            throw new InputError("Invalid " + message, key, data);
    }

    protected static checkArray(data: any, und: boolean, key: string, message: string = key) {
        this.checkUnd(data, und, key, message);

        if (!Array.isArray(data))
            throw new InputError(message + "must be an array", key);
    }

    protected static checkName(name: string, und?: boolean, key: string = "name", message: string = key) {
        this.checkUnd(name, und, key, message);

        if (!name || name.length < 5)
            throw new InputError("Invalid " + message, key);
    }

    protected static checkId(id: string, und?: boolean, key: string = "id", message: string = key) {
        this.checkUnd(id, und, key, message);

        if (id.length != 24)
            throw new InputError("Invalid " + message, key);
    }

    protected static checkPhone(phone: string, und?: boolean, key: string = "phone", message: string = key) {
        this.checkUnd(phone, und, key, message);

        if (phone.length !== 10 || !phone.startsWith("0"))
            throw new InputError("Invalid " + message, key);
    }

    protected static checkEmail(email: string, und?: boolean, key: string = "email", message: string = key) {
        this.checkUnd(email, und, key, message);

        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!reg.test(email))
            throw new InputError("Invalid " + message, key);
    }

    protected static checkLink(link: string, und?: boolean, key: string = "link", message: string = key) {
        this.checkUnd(link, und, key, message);

        const reg = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        if (!reg.test(link))
            throw new InputError("Invalid " + message, key);
    }

    protected static checkFile(file: string, und?: boolean, key: string = "file", message: string = key) {
        this.checkUnd(file, und, key, message);
    }

    protected static checkRole(role: string, und?: boolean) {
        this.checkTypeEnum(EUserRole, role, und, "role");
    }

    protected static checkContact(contact: IContact, und?: boolean) {
        this.checkUnd(contact, und, "contact");

        if (!contact.phones || !Array.isArray(contact.phones))
            throw new InputError("Contact phones must be an array", "contact.phones");
        if (!contact.emails || !Array.isArray(contact.emails))
            throw new InputError("Contact emails must be an array", "contact.emails");
        if (contact.social && !Array.isArray(contact.social))
            throw new InputError("Contact social must be an array", "contact.social");

        contact.phones.forEach(phone => this.checkPhone(phone, false, "contact.phones", "phone"))
        contact.emails.forEach(email => this.checkEmail(email, false, "contact.emails", "email"))
        contact.social && contact.social.forEach(social => this.checkLink(social, false, "contact.social", "social"))
    }

    protected static checkDetail(detail: IDetail[], und?: boolean) {
        this.checkArray(detail, und, "detail");

        detail.forEach(section => {
            this.checkName(section.title, false, "detail[].title", "title");
            this.checkArray(section.content, false, "detail[].content", "content");
            section.content.forEach(content => this.checkName(content, false, "detail[].content", "content"));
        })
    }

}