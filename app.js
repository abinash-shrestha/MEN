const express = require('express');
const app = express();
const morgan = require('morgan');

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

app.listen(3000);
