import { model } from "mongoose";
import { IOutstanding, OutstandingSchema } from "../schema/outstanding.schema";

export const OutstandingBaseModel = model<IOutstanding>('Outstanding', OutstandingSchema);