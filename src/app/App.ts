import express, { application, Request, Response } from 'express'
import cors from 'cors'
import Global_Error_Handler from './errors/global.error.handler';
import Route_Not_Found from './errors/rotue.notFound';
import router from './routes';
import cookieParser from 'cookie-parser';

const app = express();
// default middleares 
app.use(express.json())
app.use(cookieParser());
app.use(cors())


// initial route
app.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: "Successfully Run Server !",
            data: {}
        })
    } catch (err) {
        console.log(err);
    }
})

// project routes
app.use('/api/v1', router);

// not found route
app.use('*', Route_Not_Found);

// error route
app.use(Global_Error_Handler);

export default app;