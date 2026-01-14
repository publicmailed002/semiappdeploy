import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let resendClient = null;
if (!process.env.API_KeyRsend) {
  // eslint-disable-next-line no-console
  console.warn('API_KeyRsend not set — Resend disabled');
} else {
  resendClient = new Resend(process.env.API_KeyRsend);
}

export { resendClient };

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROMNAME,
};