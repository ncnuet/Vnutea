import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import ClassValidator, { ICreateClass } from "@/validators/class.validator";
import ClassModel from "@/models/class.model";
import StudentModel from "@/models/student.model";
import TeacherModel from "@/models/teacher.model";
import CommentValidator, { ICreateComment } from "@/validators/comment.validator";

export default class ClassController {
    private static async precheck(data: ICreateClass) {
        if (data.students) {
            const students = await StudentModel.get(data.students);
            if (students.length != data.students.length) throw new InputError("Invalid students ref", "students");
        }
        if (data.teacher) {
            const teachers = await TeacherModel.get([data.teacher]);
            if (teachers.length === 0) throw new InputError("Invalid teachers ref", "teachers");
        }
    }

    public static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateClass>req.body;
        console.log(req.body);


        handleError(res, async () => {
            ClassValidator.validateCreate(data);
            await ClassController.precheck(data);
            const id = await ClassModel.create({
                classID: data.classID,
                creator: user.uid,
                description: data.description,
                name: data.name,
                students: data.students,
                teacher: data.teacher
            })
            res.status(200).json({
                message: "Created successfully",
                data: { id }
            });
        })
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            ClassValidator.validateDelete({ id });
            const ack = await ClassModel.delete(id);

            res.status(200).send(
                {
                    message: ack ? "Deleted successfully" : "Unable to delete",
                    data: { id }
                })
        })
    }

    static async addComment(req: Request, res: Response) {
        const id = req.params.id;
        const user = res.locals.user;
        const data = <ICreateComment>req.body

        handleError(res, async () => {
            CommentValidator.validateCreate({ ...data, id });
            const comment_ack = await ClassModel.addComment(id, {
                creator: user.uid,
                content: data.content
            });

            res.status(200).json({
                message: comment_ack ? "Created comment successfully" : "Unable to create comment"
            })
        })
    }

    static async deleteComment(req: Request, res: Response) {
        const { id, cid } = req.params;
        const user = res.locals.user;

        handleError(res, async () => {
            CommentValidator.validateDelete({ id, cid });
            const comment_ack = await ClassModel.deleteComment(id, {
                creator: user.uid,
                cid: cid
            })

            res.status(200).json({
                message: comment_ack ? "Deleted comment successfully" : "Unable to delete comment"
            })
        })
    }
}