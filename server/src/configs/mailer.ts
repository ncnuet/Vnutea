import * as nodemailer from "nodemailer";
import config from "./env";

const mailer = nodemailer.createTransport({
    pool: true,
    service: config.MAIL_SERVICE,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    }
});

export default mailer;