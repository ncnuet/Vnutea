import { Response } from "@/types/controller";

export default async function handleError<T = void>(res: Response, func: () => Promise<T>) {
    try {
        await func();
    } catch (error) {
        console.log(error);
        if (error.cause) {
            res.status(400).json({ message: error.message, name: error.cause });
        } else {
            res.sendStatus(500);
        }
    }
}