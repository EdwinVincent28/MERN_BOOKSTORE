import express from 'express';
import {Book} from "../models/bookModel.js";

const router = express.Router();



router.post('/', async (request, response)=> {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: 'Fill all details'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        return response.send({
            message: 'book added'
        })
    }
    catch (error){
        console.log(error.message);
        return response.status(400).send({
            message: 'Fill all details'
        });
    }
});

router.get('/', async (request, response)=>{
    // console.log(request);
    try{
        const books = await Book.find({});

        return response.json(books)
    }
    catch (error){
        console.log(error.message);
    }
});

router.get('/:id', async (request, response) => {
    try{
        const {id} =  request.params;
        const book = await Book.findById(id);

        return response.json(book);
    }
    catch (error){
        console.log(error.message);
    }
});

router.put('/:id', async (request, response) => {
    try{
        const {id} = request.params;

        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: 'Fill all details'
            });
        }

        const updateBook = await Book.findByIdAndUpdate(id, request.body)
        if(updateBook){
            return response.send({
                message: "Book updated"
            });
        }
    }
    catch (error){
        console.log(error.message);
    }
});

router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;

        const deleteBook = await Book.findByIdAndDelete(id);
        if(deleteBook){
            return response.send({
                message: "Book deleted"
            })
        }
    }
    catch (error){
        console.log(error.message);
    }
});

export default router;