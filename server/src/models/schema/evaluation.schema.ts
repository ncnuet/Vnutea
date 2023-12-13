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
    participant: string;
    classID: string;
    criteria: ICriteria[];
    isDone: boolean;
    isOpen: boolean;
}

export interface ICriteriaSchema extends ICriteria { }
export interface IEvaluationSchema
    extends Omit<IEvaluation, "creator" | "participant" | "classID"> {
    creator: ObjectId,
    classID: ObjectId,
    participant: ObjectId,
}

export const CriteriaSchema = new Schema<ICriteriaSchema>({
    name: { type: String, required: true },
    value: { type: Number }
})

export const EvaluationSchema = new Schema<IEvaluationSchema>({
    creator: { type: Schema.Types.ObjectId, required: true },
    participant: { type: Schema.Types.ObjectId, required: true },
    classID: { type: Schema.Types.ObjectId, required: true },
    criteria: { type: [CriteriaSchema], required: true },
    isDone: { type: Schema.Types.Boolean, required: true },
    isOpen: { type: Schema.Types.Boolean, required: true }
})