//Jshint esversion:6
const mongoose = require('mongoose');

//--connecting the database ---
//for one --> connection , more than one --> createConnection
const persondb = mongoose.createConnection('mongodb://127.0.0.1:27017/person', { useNewUrlParser: true, useUnifiedTopology: true });
const fruitdb = mongoose.createConnection('mongodb://127.0.0.1:27017/fruit', { useNewUrlParser: true, useUnifiedTopology: true });

/// making schema  of our database using moongose  which we use 
//--values inside variable like name , age --> type ,required etc use for validating data

// ---- fruit data base schema  ---- 
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    taste:
    {
        type: String,
        required: true
    },


    rating:
    {
        type: Number,
        required: true,
        min: [1, "atleast 1 value"],
        max: [10, "atmost 10 value"]

    }
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        min: 6,
        max: 100
    },

    weight:
    {
        type: Number,
        min: [5, 'Must be at least 5 , got {VALUE} '] /// second is error show when it fail
    },

    colour:
    {
        type: String,

        enum: ['Black', 'White'],
        message:
            '{VALUE} is not support choose black and white'

    },

    favouriteFruit:                   ///embedded other schema in our current schema
    {
        type: fruitSchema,
        required: true
    },

    fruit_id: {                       //// making relation from other schema object to current schema object through object id 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fruit',
        required: true
    }
});





//// creating model  it is a constructor for constructing document  by connecting 
// it  to the respective database

const Person = persondb.model("Person", personSchema);

const Fruit = fruitdb.model("Fruit", fruitSchema);

//// making new document using model

// ----- inserting one document at a time  ---

// const Graphes = new Fruit({ name: "Graphes", taste: "sweet", rating: 10 });
// Graphes.save();
// const people = new Person({ name: "rachna", age: 22, weight: 45, colour: "Black", favouriteFruit: Graphes, fruit_id: Graphes._id });
// people.save();

///------ inserting many document at a time ----------
// const people = [{ name: 'ram', age: 20, weight: 50, color: 'blue', mental: "good" },
// { name: 'rakesh', age: 25, weight: 70, color: 'green' },
// { name: 'chintu', age: 30, weight: 80, color: 'red', iq: 10 }];

// async function insertPeople() {
//     try {
//         await Person.insertMany(people);
//         console.log("work sucessfully done")
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

//--doing function call ----
//insertPeople();


///// ------ reading the data ------

// Person.find()
//     .then(function (docs) {

//         let data = docs;
//         for (it of data) {
//             console.log(it.name);
//         }

//         mongoose.connection.close();
//     })
//     .catch(function (err) {
//         console.error("Error inserting documents:", err);
//         mongoose.connection.close();
//     });


// ---- updating value ---

// async function updating_Value() {
//     try {
//         const res = await Person.updateMany({ age: { $lte: 19 } }, { $set: { fruit_id: '6432e938620444a4ea32589e' } })
//         console.log(res);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// updating_Value();


/// ---deleting value---

// <---this is one best technique to handle promise function( repsonse, delete upadate find )  put it asynchronus function and  use with await and use try and catch
//for handling error not want  to use   connection close after that then use it in try catch block  --->  not just after function call of the asynchronus function
// ( verna async function( time leta hai excute hone me)) se phele connnection close ho jayega  (syntax neeche wale ki tarah same rhega ) --->



// async function deleting_Value() {
// try{
//     const res = await Person.deleteOne({ name: "ankush singh" })
//    console.log( "sucessfull delete ,res ")
// }
// catch(error){
//    console.log( error);
// }

// deleting_Value();

