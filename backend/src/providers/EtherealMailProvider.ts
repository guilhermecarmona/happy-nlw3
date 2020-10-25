import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  file: string;
  variables: TemplateVariables;
}

interface SendMailData {
  to: string;
  subject: string;
  templateData: ParseMailTemplate;
}

export default class EtherealMailProvider {
  private client: Transporter;
  constructor() {}

  private async setClient() {
    if (this.client) return;
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    this.client = transporter;
    return;
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: SendMailData): Promise<void> {
    await this.setClient();
    const message = await this.client.sendMail({
      from: {
        name: 'Equipe Happy',
        address: 'equipe@happy.com.br',
      },
      to,
      subject,
      html: await this.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

  private async parse({ file, variables }: ParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
