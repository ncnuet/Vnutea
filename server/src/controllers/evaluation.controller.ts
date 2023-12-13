import ClassModel from "@/models/class.model";
import EvaluationModel from "@/models/evaluation.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import EvaluationValidator, { IUpdateEvaluation } from "@/validators/evaluation.validator";
export default class EvaluationController {
    private static async precheck(data: IUpdateEvaluation) {
        if (data.classID) {
            const classes = await ClassModel.get([data.classID]);
            if (classes.length === 0) throw new InputError("Invalid classID update", "classID")
        }
    }

    static async update(req: Request, res: Response) {
        const user = res.locals.user;
        const classID = req.params.clid;
        const data = <IUpdateEvaluation>req.body;

        handleError(res, async () => {
            EvaluationValidator.validateUpdate({...data, classID});
            await EvaluationController.precheck({...data, classID});

            const ack = await EvaluationModel.update({
                classID: classID,
                participant: user.uid,
                criteria: data.criteria
            })

            res.status(200).json({
                message: "success",
            })
        })
    }
}