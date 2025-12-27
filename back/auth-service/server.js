import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

//Load Environment Variables
dotenv.config();

const app = express();
const port = process.env.PORT;

const startServer = async() => {
    try {
        await connectDB(); //Connection to DB

        //route
        app.get('/', (req, res) => {
            res.send("Authentification service is present!")
            console.log("request:", req)
        });

        //Server port is open
        app.listen(port, () => {
            console.log(`Authentication server is listening on port ${port}`)
        });

    } catch(error) {
        console.log("Error while starting server:", error);
        process.exit(1);
    }
};

startServer()

