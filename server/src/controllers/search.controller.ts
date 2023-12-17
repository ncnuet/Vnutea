import ClassModel from "@/models/class.model";
import DepartmentModel from "@/models/department.model";
import LabModel from "@/models/lab.model";
import TeacherModel from "@/models/teacher.model";
import UserModel from "@/models/user.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import { ISearch } from "@/validators/search.validator";

export default class SearchController {
    public static async search(req: Request<ISearch>, res: Response) {
        const user = res.locals.user;
        const data = req.query;

        handleError(res, async () => {

            const [_teachers, _fav, _labs, _departments, _classes] = await Promise.all([
                TeacherModel.search(data.query),
                UserModel.getFavorites(user.uid),
                LabModel.search(data.query),
                DepartmentModel.search(data.query),
                ClassModel.search(data.query)
            ])

            const [teachers, labs, departments, classes] = await Promise.all([
                await TeacherModel.getAll(_teachers.filter(t => !!t).map(t => t.id)),
                await LabModel.getAll(_labs.filter(l => !!l).map(l => l.id)),
                await DepartmentModel.getAll(_departments.filter(d => !!d).map(d => d.id)),
                await ClassModel.getAll(_classes.filter(c => !!c).map(c => c.id)),
            ])

            const depNames = await DepartmentModel.getName(teachers.map(item => item.department))

            res.status(200).json({
                message: "success",
                data: {
                    query: data.query,
                    teachers: teachers.map(teacher => ({
                        ...teacher,
                        department: depNames.find(dep => dep.id === teacher.department),
                        liked: _fav.some(fa => fa.ref === teacher.id)
                    })),
                    labs,
                    departments,
                    classes
                }
            })
        })
    }
}