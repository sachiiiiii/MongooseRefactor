// importing things installed through npm
import express from 'express'; // do we still need this after moving routes? Yes, for the app.use() & app.get() remaining

import mongoose from 'mongoose';
import dotenv from 'dotenv';
// initialize dotenv so it can be used
dotenv.config();

// do we still need this after moving routes? Yes, for the seed route
// import Fruit from './models/fruit.mjs'; // points to the schema in models

import Fruits from "./routes/fruits.mjs"; // points to the routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware 
app.use(express.urlencoded());
app.use(express.json());

// Mongoose Connection: connecting to the database in Compass
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});

// Mock data
// const fruits = ["apple", "banana", "pear"] // not needed anymore since we are now creating a new a database in MongoDB and manipulating it

// Fruit Routes
app.use("/fruits", Fruits);

/// ROUTES ///
app.get('/', (req, res) => {
    res.send('Welcome to the Fruits API!');
})

// // Seed route - SEED the database
// app.get('/fruits/seed', async (req, res) => {
//     try {
//         await Fruit.create([
//             {
//                 name: 'grapefruit',
//                 color: 'pink',
//                 readyToEat: true
//             },
//             {
//                 name: 'grape',
//                 color: 'purple',
//                 readyToEat: false
//             },
//             {
//                 name: 'avocado',
//                 color: 'green',
//                 readyToEat: true
//             }
//         ])
//         res.redirect('/fruits');
//     } catch (error) {
//         console.error(error);
//     }
// });

/// INDUCES ///
// Routes should in proper order to ensure that every endpoint created is reached

// // _Index - GET all fruits in collection
// // can also write "api/fruits"
// app.get('/fruits', async (req, res)=>{
//     try{
//         const fruits = await Fruit.find();
//         res.json(fruits);
//     }catch (error) {
//         console.log(error);
//     }
//     // res.send(fruits);
// });

// // _New - to be handled by our Front End

// // _Delete - DELETE 1 fruit by id
// app.delete('/fruits/:id', async (req, res)=>{
//     try {
//         await Fruit.findByIdAndDelete(req.params.id)
//         res.redirect('/fruits'); // redirect back to fruits index
//     } catch(error) {
//         console.error(error);
//       }
// });

// // _Update - PUT: update an existing fruit by id
// app.put("/fruits/:id", async (req, res) => {
//     try {
//         // if checked, 
//         if (req.body.readyToEat === "on") {
//             // req.body.readyToEat is set to 'on'
//             req.body.readyToEat = true; //do some data correction
//         }
//         // if not checked,
//         else {
//             // req.body.readyToEat is undefined
//             req.body.readyToEat = false; // do some data correction
//         }
//         // fruits.push(req.body);
//         await Fruit.findByIdAndUpdate(req.params.id, req.body);

//         res.redirect("/fruits"); // redirect back to fruits index
//     } catch (error) {
//         console.log(error);
//     }
// });

// // _Create - POST: create a new fruit 
// app.post('/fruits/', async (req, res) => {
//     try {
//         // if checked, 
//         if (req.body.readyToEat === "on") {
//             // req.body.readyToEat is set to 'on'
//             req.body.readyToEat = true; //do some data correction
//         }
//         // if not checked,
//         else {
//             // req.body.readyToEat is undefined
//             req.body.readyToEat = false; // do some data correction
//         }
//         // takes the Fruit schema imported from "./models/fruit.mjs" and creates 1 instance of it
//         await Fruit.create(req.body);

//         res.redirect("/fruits"); // redirect back to fruits index
//     } catch (error) {
//         console.log(error);
//     }
// });

// // _Edit - to be handled by Front End

// // _Show - GET 1 fruit by its id
// app.get('/fruits/:id', async (req, res) =>{
//     try{
//         const fruit = await Fruit.findById(req.params.id);
//         res.json(fruit);
//     } catch(error) {
//         console.log(error);
//     }
// })

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

// App.listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})