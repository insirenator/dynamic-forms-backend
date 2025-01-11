import Handlebars from "handlebars";
import nodemailer from "nodemailer";

import * as templates from "./templates";
import appVars from "@/config/env";


class Emailer {
    private templates: Record<string, HandlebarsTemplateDelegate>;
    private transporter: nodemailer.Transporter;
    constructor() {
        this.templates = this.loadTemplates();
        this.transporter = this.configureEmailTransport();
    }

    // Load all the email templates ( .tpl files only) from the `templatesPath`
    private loadTemplates() {
        const contents: Record<string, HandlebarsTemplateDelegate> = {};

        for (let [templateName, templateContent] of Object.entries(templates)) {
            contents[templateName] = Handlebars.compile(templateContent);
        }

        return contents;
    }

    private configureEmailTransport() {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: appVars.gmail.appEmail,
                pass: appVars.gmail.appPassword,
            }
        })
    }

    public async getTemplate(templateName: string) {
        const layoutTemplate = this.templates["layout"];
        const template = this.templates[templateName];
        const body = layoutTemplate({ contents: template({ name: "Shakeeb" }) });
        const message = {
            from: process.env.GMAIL_APP_EMAIL,
            to: "arsshakeeb149@gmail.com",
            subject: "Sign Up Mail From Me!",
            html: body,
        };

        await this.transporter.sendMail(message);

        return body;
    }
}

export default new Emailer();
