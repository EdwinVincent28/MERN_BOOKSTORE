import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
// import { Book } from './models/bookModel.js';
import routes from './routes/bookRoutes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response)=>{
    // console.log(request);
    return response.send("Hello World");
});

app.use("/books", routes);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Database connected...")
    app.listen(PORT, ()=> {
        console.log(`Server running on PORT: ${PORT}`)
    })
    
}).catch(
    (error)=>{
        console.log(error.message);
    }
)
