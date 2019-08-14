const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'PostApp', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/dist'));
}

// Add models
require('./models/Posts');
// Add routes
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://shivamk898:shivam1234@ds137483.mlab.com:37483/heroku_2n97gk47");
mongoose.set('debug', true);

app.listen(port, () => console.log(`Server started on port ${port}`));