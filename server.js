const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/users');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
//Database config
const db = require('./config/db');
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);
//Routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// server static assets if is production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
