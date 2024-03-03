
const express = require('express');

const {open}= require('sqlite');
const sqlite3 = require('sqlite3')
const cors = require("cors")
const path= require("path");
const dbPath= path.join(__dirname,"backend.db");

const app= express();



app.use(express.json())
app.use(cors());

let database =null;


const inittializeDbAndServer=async()=>{
    try{
        database = await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
    
        app.listen(5002,()=>{
            console.log('Listening at http://localhost:5002')
        
        })

    }catch(error){
        console.log(`DB Error :${error.message}`);
        process.exit(1);
    }
   



}

inittializeDbAndServer();


app.get('/users',async(request,response)=>{

    const sqlQuery=`SELECT * FROM Backend`
    const data= await database.all(sqlQuery);
    response.send(data)

    
})

app.get('/',(request,response)=>{
    response.send('Welcome to Tech world!')
})


module.exports= app;