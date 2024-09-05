import dotenv from 'dotenv'
import path from 'path'



dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    db_url: process.env.DB_URL,
    port: process.env.DB_PORT,
    dev_env: process.env.DEV_ENV,
    dummy_pass:process.env.DUMMY_PASS,
    jwt_secret:process.env.JWT_SECRET,
}