import { ObjectId, Schema } from "mongoose"
type Modify<T, R> = Omit<T, keyof R> & R;

export enum ESatisfactionLevel {
    VERY_GOOD = 5,
    GOOD = 4,
    MEDIUM = 3,
    BAD = 2,
    VERY_BAD = 1
}

export interface ICriteria {
    name: string
    value: ESatisfactionLevel
}

export interface IEvaluation {
    creator: string;
    classID: string;
    criteria: ICriteria[];
}

export interface ICriteriaSchema extends ICriteria { }
export interface IEvaluationSchema extends Modify<IEvaluation, { creator: ObjectId, classID: ObjectId }> { }

export const CriteriaSchema = new Schema<ICriteriaSchema>({
    name: { type: String, required: true },
    value: { type: Number }
})

export const EvaluationSchema = new Schema<IEvaluationSchema>({
    creator: { type: Schema.Types.ObjectId, required: true },
    classID: { type: Schema.Types.ObjectId, required: true },
    criteria: { type: [CriteriaSchema], required: true },
})