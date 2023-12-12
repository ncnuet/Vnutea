import ClassModel from "@/models/class.model";
import DepartmentModel from "@/models/department.model";
import LabModel from "@/models/lab.model";
import TeacherModel from "@/models/teacher.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import { ISearch } from "@/validators/search.validator";

export default class SearchController {
    public static async search(req: Request<ISearch>, res: Response) {
        const data = req.query;

        handleError(res, async () => {
            const [users, labs, departments, classes] = await Promise.all([
                TeacherModel.search(data.query),
                LabModel.search(data.query),
                DepartmentModel.search(data.query),
                ClassModel.search(data.query)
            ])

            res.status(200).json({
                message: "success",
                data: {
                    query: data.query,
                    users, labs, departments, classes
                }
            })
        })
    }
}