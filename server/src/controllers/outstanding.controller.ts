import OutstandingModel from "@/models/outstanding.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import OutstandingValidator, { ICreateOutstanding, IUpdateOutstanding } from "@/validators/outstanding.validate";

export default class OutstandingController {
    static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateOutstanding>req.body;

        handleError(res, async () => {
            OutstandingValidator.validateCreate(data);

            const id = await OutstandingModel.create(data.image, data.ref, data.type, user.uid)

            res.status(200).send({ message: "Success", data: { id } })
        })
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            OutstandingValidator.validateDelete({ id });

            OutstandingModel.delete(id);
        })
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id;
        const user = res.locals.user;
        const data = <IUpdateOutstanding>req.body;

        handleError(res, async () => {
            OutstandingValidator.validateUpdate({ id, ...data });

            OutstandingModel.update(id, data.image, data.ref, user.uid);
        })
    }
}