const express = require('express');
const app = express();
const morgan = require('morgan');
const userModel = require('./models/user');
const dbConnection = require('./config/db');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use((req, res, next) => {
//   console.log('This is a middleware');

//   const a = 5;
//   const b = 6;
//   console.log(a + b);

//   next();
// });

// app.get(
//   '/',
//   (req, res, next) => {
//     console.log('This is middleware function');
//     next();
//   },
//   (req, res) => {
//     res.render('index');
//   }
// );

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/about', (req, res) => {
  res.send('this is about page');
});

app.get('/profile', (req, res) => {
  res.send('this is profile page');
});

app.post('/get-form-data', (req, res) => {
  console.log(req.body);
  res.send('Data Received');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(newUser);
});

app.get('/get-users', (req, res) => {
  userModel.findOne({ username: 'c' }).then((user) => {
    res.send(user);
  });
});

app.get('/update-user', async (req, res) => {
  await userModel
    .findOneAndUpdate(
      {
        username: 'a',
      },
      {
        email: 'ab@ab',
      }
    )
    .then(res.send('user updated'));
});

app.listen(3000);
