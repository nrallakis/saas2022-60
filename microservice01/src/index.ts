import express from 'express';
import {json} from "body-parser";
import {todoRouter} from "./routes/todo";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/energy_data'

const app = express();
app.use(json());
app.use(todoRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

mongoose.connect(dbUri, () => {
    console.log('Connected to MongoDB database');
});