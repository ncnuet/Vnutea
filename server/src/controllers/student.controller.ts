import { InputError, Request, Response } from "@/types/controller";
import { ICreateStudent, IUpdateStudent } from "@/validators/student.validator";

export default class StudentController {
    private static async precheck(data: IUpdateStudent | ICreateStudent) {

    }

    static async updateByAdmin(req: Request, res: Response) {
    }
}