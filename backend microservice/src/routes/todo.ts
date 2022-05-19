import express, {Request, Response} from "express";
import {Todo} from "../models/todo";

const router = express.Router();

router.get('/api/todo', async (req: Request, res: Response) => {
    const todos = await Todo.find({});
    return res.status(200).send(todos);
});

router.post('/api/todo', async (req: Request, res: Response) => {
    const todo = new Todo({title: req.body.title, description: req.body.description});
    await todo.save();
    return res.status(201).send(todo);
});

export {router as todoRouter}