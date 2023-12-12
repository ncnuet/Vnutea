import { IContact } from "@/models/schema/contact.schema";
import { IDetail } from "@/models/schema/detail.schema";
import { EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export default abstract class BaseValidator {
    protected static checkName(name: string, und?: boolean) {
        if (name) {
            if (!name || name.length < 5) {
                throw new InputError("Invalid name", "name");
            }
        } else if (!und) throw new InputError("Must include name", "name");
    }

    protected static checkFile(file: string, und?: boolean) {
        if (file) {

        } else if (!und) throw new InputError("Must include a file", "file")
    }

    protected static checkId(id: string, und?: boolean) {
        if (id) {
            if (id.length != 24) throw new InputError("Invalid id", "id");
        } else if (!und) throw new InputError("Must include id", "id");
    }

    protected static checkEmail(email: string, und?: boolean) {
        if (email) {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                throw new InputError("Email không hợp lệ", "email");
            }
        } else if (!und) throw new InputError("Must include email", "email");
    }

    protected static checkRole(role: string, und?: boolean) {
        if (role) {
            if (!Object.values(EUserRole).includes(role as EUserRole)) {
                throw new InputError("Invalid role", "role");
            }
        } else if (!und) throw new InputError("Must include role", "role");
    }

    protected static checkPhone(phone: string, und?: boolean) {
        if (phone) {
            if (phone.length !== 10 || !phone.startsWith("0")) {
                throw new InputError("Invalid phone number", "phone");
            }
        } else if (!und) throw new InputError("Must include phone number", "phone");
    }

    protected static checkLink(link: string, und?: boolean) {
        if (link) {
            if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(link)) {
                throw new InputError("Link không hợp lệ", "link");
            }
        } else if (!und) throw new InputError("Must include link", "link");
    }

    protected static checkContact(contact: IContact, und?: boolean) {
        if (contact) {
            if (!contact.phones || !Array.isArray(contact.phones))
                throw new InputError("Contact phones must be an array", "contact.phones");
            if (!contact.emails || !Array.isArray(contact.emails))
                throw new InputError("Contact emails must be an array", "contact.emails");
            if (contact.social && !Array.isArray(contact.social))
                throw new InputError("Contact social must be an array", "contact.social");

            contact.phones.forEach(phone => this.checkPhone(phone))
            contact.emails.forEach(email => this.checkEmail(email))
            contact.social && contact.social.forEach(social => this.checkLink(social))
        } else if (!und) throw new InputError("Must include contact", "contact");
    }

    protected static checkDetail(detail: IDetail[], und?: boolean) {
        if (detail) {
            if (!Array.isArray(detail))
                throw new InputError("Detail must be an array", "detail");

            detail.forEach(section => {
                this.checkName(section.title);

                if (!Array.isArray(section.content))
                    throw new InputError("Detail content must be an array", "detail.content");
                section.content.forEach(content => this.checkName(content));
            })
        } else if (!und) throw new InputError("Must include details", "details");
    }

}