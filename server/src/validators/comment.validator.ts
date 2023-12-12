import BaseValidator from "./base.validator";
import { IComment } from "@/models/schema/comment.schema";

export interface ICreateComment extends IComment {
    id?: string;
}

export interface IDeleteComment {
    id?: string;
    cid: string;
    creator?: string;
}

export default class CommentValidator extends BaseValidator {
    static validateCreate(data: ICreateComment) {
        this.checkId(data.id);
        this.checkName(data.content);
    }

    static validateDelete(data: IDeleteComment) {
        this.checkId(data.id);
        this.checkId(data.cid);
    }

}