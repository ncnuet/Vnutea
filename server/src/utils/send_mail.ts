import mailer from "@/configs/mailer";
import env from "@/configs/env";
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { IQueryableUser } from "@/types/auth";

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

export async function sendForgetPasswordMail(user: IQueryableUser, token: string) {
    const body = renderTemplate(
        "/src/templates/forgot-password-email.html",
        {
            url: `${env.BACKEND}/auth/reset?token=${token}`,
            name: user.username
        });

    return await sendMail(user.email, "Khôi phục mật khẩu trên " + env.APP_NAME, body)
}

export async function startup() {
    return await sendMail(
        "fakenoname02@gmail.com",
        "Server started",
        "Server started now");
}