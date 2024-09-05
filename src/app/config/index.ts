import dotenv from 'dotenv'
import path from 'path'



dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    db_url: process.env.DB_URL,
    port: process.env.DB_PORT,
    dev_env: process.env.DEV_ENV,
    dummy_pass: process.env.DUMMY_PASS,
    jwt_secret: process.env.JWT_SECRET,
    salt_round: process.env.SALT_ROUNT,
    access_token_exp: process.env.ACC_TOKEN_EXP,
    refresh_token_exp: process.env.REF_TOKEN_EXP,
    frontend_url: process.env.FRONTEND_URL,
    central_email: process.env.NODEMAILER_EMAIL,
    mail_secret:process.env.MAIL_SECRET,
}