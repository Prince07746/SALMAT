const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mysql = require('mysql2/promise');
const { error } = require('console');

// dotenv for hiding files

require('dotenv').config();



// https://special-virtualappeal-preview.raisely.com/
// https://www.raisely.com/donor-management


// create express app and port 


const app = express();
const port = 3030; 







// Midleware for parsing

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// midleware for static pages
app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname,'outil')));

app.use(express.static(path.join(__dirname,'outil','media')));

app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'BDI')));
 // midlleware for cookies and settling the view
 app.use(cookieParser());
 app.set('view engine','ejs');





// create MYSQL connection pool
const pool = mysql.createPool({
host: process.env.host,
user: process.env.user,
password: process.env.password,
database: process.env.database,
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
})

/*
// ==== TEST THE CONNECTION
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database!');
    connection.release();
  })
  .catch(error =>{
    console.log('Error connecting to MySQL database:', error);
  });

*/


// Middleware for authentication
// ==========================================================================================================================================================================
// Function to check if user is authenticated based on cookies and database
const isAuthenticated = async (cookies) => {

    if (cookies && cookies.authenticated === 'true') {
      // User is authenticated via cookie, proceed with checking database
      const email = cookies.email;
      const password = cookies.password;
      if (email && password) {
        // Authenticate user via database
        const [rows, fields] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
          // User found in database
          return true;
        }
      }
    }
  
    // User not authenticated or not found in database
    return false;
  };
  

// Route for handling login and creating authentication cookie
app.post('/login', async (req, res) => {
    try {
      // Retrieve email and password from the request body
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).send('email and password are required');
      }
  
      // Authenticate user via database
      const [rows, fields] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
  
      if (rows.length > 0) {
        console.log(rows);
        // User found in database, set authentication cookie
        res.cookie('authenticated', 'true');
        res.cookie('email', email); // Optionally store username in cookie
        res.cookie('password', password); // Optionally store password in cookie
        res.redirect("/");
      } else {
        // User not found in database
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get("/login",async (req,res)=>{
  
  try{
      // Check if user is authenticated
      const authenticated = await isAuthenticated(req.cookies);
      if (authenticated) {
      res.redirect("/")
      }
      else{
     res.render("login",{name:"prince"});
      }
  }  catch (error){
    res.send("Error , we are working on the issue")
  }
  
  
  });
  
  app.post('/signup', async (req, res) => {
  
    try {
      // Retrieve form data from the request body
      const { nom, email, password, number } = req.body;
  
      // Check if all required fields are provided
      if (!nom || !email || !password || !number) {
        return res.status(400).send('Name, email, password, and phone number are required');
      }
      // Check if user is authenticated
      const authenticated = await isAuthenticated(req.cookies);
      if (authenticated) {
        // If user is already authenticated, redirect to home page
        res.redirect('/');
      } else {
        // Check if the email already exists in the database
        const [existingUsers, _] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
          // If email already exists, return error
          return res.status(400).send('email already exists');
        }
        // Insert user information into the database
        const [result, fields] = await pool.query('INSERT INTO user (NomUtilisateur, email, password, number) VALUES (?, ?, ?, ?)', [nom, email, password, number]);
  
        // Check if insertion was successful
        if (result.affectedRows === 1) {
          // Render signup success page or redirect to login page
          res.redirect("/login");
        } else {
          // Insertion failed
          res.status(500).send('Failed to sign up');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  app.get('/signup', async (req, res) => {
    try {
    
  // Check if user is authenticated
  const authenticated = await isAuthenticated(req.cookies);
  if (authenticated) {
    // If user is already authenticated, redirect to home page
    res.redirect('/');
  } else {
     
    res.render("signup");
  
  
  }
  
  
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  
  
  
  // Route for handling logout and destroying authentication cookie
  app.get('/logout', (req, res) => {
    try {
      // Clear authentication cookie
      res.clearCookie('authenticated');
      res.clearCookie('username');
      res.clearCookie('password');
      
      // Redirect to home page or any other appropriate page after logout
      res.redirect('/');
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  




// =============================================================================================================================================================================









// ROUTE APP ----------------- ROUTE APP --------------- ROUTE APP ------------------


app.get("/", (req,res)=>{




res.render("home")



})

app.get("/wedo", (req,res)=>{




res.render("wedo")



})

app.get("/about", (req,res)=>{




res.render("about")



})



























//************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */



app.listen(port,(error)=>{
    if(error){
        console.log("error lunching the server")
    }
    console.log(`SERVER UP at port ${port}`);
})










// ******************************************************************************************************************