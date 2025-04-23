import express from "express"; // import express installed through npm
import Fruit from "../models/fruit.mjs"; // import schema from models folder

const router = express.Router();

/// Move the seed route here since it is prefaced with /fruits, just like all other routes in here. 
// Seed route - SEED the database
router.get('/seed', async (req, res) => {
  try {
      await Fruit.create([
          {
              name: 'grapefruit',
              color: 'pink',
              readyToEat: true
          },
          {
              name: 'grape',
              color: 'purple',
              readyToEat: false
          },
          {
              name: 'avocado',
              color: 'green',
              readyToEat: true
          }
      ])
      res.redirect('/fruits');
  } catch (error) {
      console.error(error);
  }
});

/// INDUCES ///
// Routes should in proper order to ensure that every endpoint created is reached

// Index - GET all fruits in collection
router.get('/', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    console.log(error);
  }
  // res.send(fruits);
});

// _New - to be handled by our Front End 

// _Delete - Delete 1 fruit by id
router.delete('/:id', async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect('/fruits'); // redirect back to fruits index
  } catch (error) {
    console.error(error);
  }
});

// _Update - PUT: update an existing fruit by id
router.put("/:id", async (req, res) => {
  try {
    // if checked, 
    if (req.body.readyToEat === "on") {
      // req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    }
    // if not checked,
    else {
      // req.body.readyToEat is undefined
      req.body.readyToEat = false; // do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/fruits"); // redirect back to fruits index
  } catch (error) {
    console.log(error);
  }
});

// _Create - POST: create a new fruit 
router.post('/', async (req, res) => {
  try {
    // if checked, 
    if (req.body.readyToEat === "on") {
      // req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    }
    // if not checked,
    else {
      // req.body.readyToEat is undefined
      req.body.readyToEat = false; // do some data correction
    }
    // takes the Fruit schema imported from "./models/fruit.mjs" and creates 1 instance of it
    await Fruit.create(req.body);

    res.redirect("/fruits"); // redirect back to fruits index
  } catch (error) {
    console.log(error);
  }
});

// _Edit - to be handled by Front End

// _Show - GET 1 fruit by its id
router.get('/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id)
    res.json(fruit)
  } catch (err) {
    console.log(err)
  }
})

export default router;