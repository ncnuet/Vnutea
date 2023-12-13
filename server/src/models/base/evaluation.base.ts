import { model } from "mongoose";
import { EvaluationSchema, IEvaluationSchema } from "../schema/evaluation.schema";

export const EvaluationBaseModel = model<IEvaluationSchema>('Evaluation', EvaluationSchema);