import TeacherModel from "@/models/teacher.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import { ISearch } from "@/validators/search.validator";

export default class SearchController {
    public static async search(req: Request<ISearch>, res: Response) {
        const data = req.query;

        handleError(res, async () => {
            const users = await TeacherModel.search(data.query);
            res.status(200).json({ message: "success", data: { query: data.query, users } })
        })
    }
}