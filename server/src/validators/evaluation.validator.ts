import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { ESatisfactionLevel, ICriteria, IEvaluation } from "@/models/schema/evaluation.schema";

export interface ICreateEvaluation extends IEvaluation { }

export interface IUpdateEvaluation {
    id: string;
}

export interface IUpdateEvaluation {
    id: string;
    criteria: ICriteria[]
}

export default class EvaluationValidator extends BaseValidator {
    static checkCriteria(criteria: ICriteria[], und?: boolean) {
        if (criteria) {
            if (!Array.isArray(criteria))
                throw new InputError("Criteria must be an array", "criteria");

            criteria.forEach(cre => {
                this.checkName(cre.name);
                this.checkSatisfactionLevel(cre.value);
            })

        } else if (!und) throw new InputError("Must include a criteria", "criteria")
    }

    static checkSatisfactionLevel(level: number, und?: boolean) {
        if (level) {
            if (!Object.values(ESatisfactionLevel).includes(level))
                throw new InputError("Invalid satisfaction level", "level")
        } else if (!und) throw new InputError("Must include satisfaction level", "level")
    }

    static validateCreate(data: ICreateEvaluation) {
        this.checkId(data.classID);
        this.checkCriteria(data.criteria);
    }

    static validateDelete(data: IUpdateEvaluation) {
        this.checkId(data.id);
    }

    static validateUpdate(data: IUpdateEvaluation) {
        this.checkCriteria(data.criteria);
    }
}