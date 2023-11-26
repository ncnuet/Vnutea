import { InputError, Response } from "@/types/controller";

export default async function handleError<T = void>(res: Response, func: () => Promise<T>) {
    try {
        await func();
    } catch (error) {
        console.log(error);
        if (error instanceof InputError) {
            res.status(400).json({ message: error.message, name: error.field });
        } else {
            res.sendStatus(500);
        }
    }
}