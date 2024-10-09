



// import some dependencies/packages

const express = require('express');

const app = express();

const mysql = require('mysql2');

const cors = require('cors');    //cross origin resource sharing

const dotenv = require('dotenv');

app.use(express.json());

app.use(cors());

dotenv.config();

// CONNECTING TO DATABASE

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// checking for connection

db.connect((err) => {
  // if no connection 
    if(err) return console.log("Error connecting to MySQL");
  // if connection
    console.log("Connected to MySQL as id: ", db.threadId);
})


// GET METHOD GOES HERE

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// GET METHOD EXAMPLE BELOW

app.get('/data', (req, res) => {
  // retrieve data from database

  db.query('SELECT* FROM patients', (err, results) =>{
    if(err){
      console.error(err);
      res.status(500).send('Error Retrieving Data')
    } else{
      // Display the patient records to the browser

      res.render('data', {results:results});
    }
  });
}); 

// STOP GET METHOD GOES HERE


// START THE SERVER

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  
  // SEND MESSAGE TO BROWSER

  console.log('Sending message to the browser...')

  app.get('/', (req, res) => {
    res.send('Connected....server started successfully')
  })
})