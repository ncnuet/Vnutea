import { ICreateTeacher, IUpdateTeacher } from "@/validators/teacher.validator";
import { TeacherBaseModel } from "./base/teacher.base";

export default class TeacherModel {
    static async create(data: ICreateTeacher) {
        const {
            name, lab, department, description, awards,
            details, contact, image, creator, user
        } = data;

        const response = await TeacherBaseModel.create(
            {
                name, lab, department, description, awards,
                details, contact, image, creator, user,
                classes: [],
                position: ["Giảng viên"]
            }
        );

        return response._id.toString();
    }

    static async delete(id: string) {
        const result = await TeacherBaseModel.deleteOne(
            { user: id }
        ).exec();

        return result.acknowledged;
    }

    static async update(id: string, data: IUpdateTeacher) {
        const {
            department, lab, description, details, contact, image
        } = data;

        const response = await TeacherBaseModel.updateOne({
            user: id
        }, {
            department, lab, description, details, contact, image
        })

        return response.acknowledged;
    }

    static async search(query: string) {
        const users = await TeacherBaseModel.search(
            {
                match: {
                    name: {
                        query: query,
                        fuzziness: "auto",
                        fuzzy_transpositions: true,
                    }
                }
            },
            {
                hydrate: true,
                hydrateOptions: { select: "name _id" }
            })

        return users.body.hits.hydrated;
    }

    static async addClass(id: string, classID: string) {
        const response = await TeacherBaseModel.updateOne(
            { user: id },
            {
                $push: {
                    classes: classID
                }
            })

        return response.acknowledged;
    }

    static async deleteClass(id: string, classID: string) {
        const response = await TeacherBaseModel.updateOne(
            { user: id },
            {
                $pull: {
                    classes: classID
                }
            })

        return response.acknowledged;
    }

    static async get(ids: string[]) {
        const result = await TeacherBaseModel.find({ user: { $in: ids } }).exec();
        return result;
    }

    static async getByDepartment(departments: string[]) {
        const result = await TeacherBaseModel.find(
            { department: { $in: departments } }
        ).exec();

        return result.map(teacher => ({
            id: teacher._id,
            name: teacher.name,
            department: teacher.department,
            awards: teacher.awards.map(award => ({
                name: award.name,
                color: award.color
            })),
            position: teacher.position,
            image: teacher.image
        }));
    }

    static async getAll() {
        const result = await TeacherBaseModel.find({}).exec();
        return result.map(teacher=>({
            id: teacher._id,
            name: teacher.name,
            awards: teacher.awards,
            department: teacher.department
        }));
    }
}