import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

const app = express();
// default middleares 
app.use(express.json())
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

// not found route
app.use('*', (req: Request, res: Response) => {
    try {
        res.status(404).json({
            success: false,
            message: "Route Not Found *",
            data: {}
        })
    } catch (err) {
        console.log(err);
    }
})

// error route
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(500).json({
            status: false,
            message: "There is an server side error *",
            error: err,
            stack: {}
        })
    } catch (err) {
        console.log(err);
    }
})

export default app;