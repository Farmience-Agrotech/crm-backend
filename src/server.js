const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const cors = require('cors');

const { inventoryRouter } = require("./routes/inventoryRoute.js");
const app = express();

//Set Up the Assets Folder
app.use(express.static(path.join(__dirname, 'public')));

// DEV ENV
const db = "mongodb://localhost:27017"

// PRODUCTION ENV
// const db = "mongodb+srv://adithyamn_db_user:mG5bagOZVei3skGF@farmience-crm.1bula4s.mongodb.net/?appName=farmience-crm"


    mongoose
      .connect(
        db
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use('/', require('./api/api.js'));
app.use("/products", require("./routes/productRoute.js"));
app.use("/inventory", require("./routes/inventoryRoute.js"));
app.use("/orders", require("./routes/orderRoute.js"));
app.use("/users", require("./routes/userRoute.js"));


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));