import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { ESatisfactionLevel, ICriteria, IEvaluation } from "@/models/schema/evaluation.schema";

export interface ICreateEvaluation
    extends Pick<IEvaluation, "classID" | "creator"> { }

export interface IUpdateEvaluation
    extends Pick<IEvaluation, "classID" | "participant" | "criteria"> { }

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

    static validateUpdate(data: IUpdateEvaluation) {
        this.checkCriteria(data.criteria);
    }
}