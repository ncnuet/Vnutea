import mailer from "@/configs/mailer";
import env from "@/configs/env.config";
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export const renderTemplate = (templatePath: string, replacements: object): string => {
    const filePath = path.join(path.resolve(), templatePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    return template(replacements);
}

export async function sendMail(to: string, subject: string, body: any) {
    await mailer.sendMail({
        from: `"${env.APP_NAME}" <${env.MAIL_USER}>`,
        to, subject,
        html: body
    });
}