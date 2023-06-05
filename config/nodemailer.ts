const { EMAIL, EMAIL_PWD } = process.env;
import { createTransport } from 'nodemailer';

export const getTransporter = async () => createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: { user: EMAIL, pass: EMAIL_PWD },
  tls: {
    // secureProtocol: "TLSv1_method",
    rejectUnauthorized: true
  },
});