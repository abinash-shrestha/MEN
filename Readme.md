# Learning MEN(MongoDB, ExpressJs, NodeJs)

## STEPS

1. create package.json file with `npm init -y`
2. retrieve npm modules from npm `npm i`

## HTTP SERVER

created basic http server with simple routes such as home, about us
http.createServer
req.url
res.end
server.listen(3000)

for live server without restarting every time on new changes `npx nodemon app.js`

## Express

```
npm i express
const express = require("express);
const app = express()
```

```
app.get('/', (req, res)=>{
    res.send('Hello World')
})
```

### Render HTML through Express [ejs]

`npm i ejs`

create a views folder in ejs and inside it create a index.ejs file

```
app.set("view engine","ejs")

app.get('/', (req,res)=>{
res.render("index)
})
```

## Middlewares

Function that sits between request and response cycle in an application

1. Built-in middlewares (Express middlewares)
2. custom middlewares
3. 3rd party middlewares

```
app.use((req, res, next) => {
console.log("This is a middleware);
const a = 5;
const b = 6;
console.log(a+b);

next(); //passes control the next middleware or route
})
```

Example of third-party middleware

- MORGAN => Logger
- `npm i morgan`

```
const morgan = require('morgan');
app.use(morgan("dev"));
```

Using middle for particular route '/- home'

```
app.get('/',
    (req, res, next) =>{
    console.log("This is middleware function)
},
    (req,res)=>{
    res.render("index")
})
```

## FORM CONTROL

- form type get and post
- use post method for data submission through form
- json and url encoded are necessary for reading data in body(req.body)
- can read data in req.query while using get method (not recommended to use get method as it exposes submitted data in url)

- ```
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
  ```
- ```
    app.post('/get-form-data',(req, res) => {
        console.log(req.body);
        res.send('data received')
    })
  ```

## Integrating Static Frontend Content

- create a public folder and create css, js files
- use static method `app.use(express.static('public'));`

## MongoDB

- `npm i mongoose`
- create models folder and create a user.js file inside it
- creating user schema and model

  - models/user.js

    ```
    const mongoose = require('mongoose')
    const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    })

    const userModel = mongoose.Model('user', userSchema);

    module.exports = userModel // import userModel in app.js //
    ```

- Connecting to database
- create config folder and db.js file inside it

  - config/db.js

    ```
    const mongoose = require("mongoose")
    const connection = mongoose.connect('mongodb://0.0.0.0/men').then(()=>{console.log('connected to database')})

    module.exports = connection // import connection in app.js //
    ```

- Getting data from form and inserting into database

  - app.js(getting data from register form)

  ```
  app.get('/register', (req, res)=>{
    res.render("register") //first create register.ejs file in views
  })

  app.post('/register', async (req, res)=>{
    const {username, email, password} = req.body
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: password
    })

    res.send('user registered') or res.send(newUser)

  })
  ```

## CRUD

- CREATE (already done above)
- READ

  - find() - reads all data unless specified which data to find
  - find({username:'a'})

    ```
    // reads all user and displays them
    app.get('get-users', (req, res)=>{
      userModel.find().then((users)=>{
        res.send(users)
      })
    })

    // finds specific user
    app.get('get-users', (req, res)=>{
      userModel.find({
        username:'a'
      }).then((users)=>res.send(users))
    })

    // finds only one user and displays the first one (created first) if multiple same username are found

    app.get('/get-users', (req, res)=>{
      userModel.findOne({
        username:'c'
        }).then((users)=>res.send  (users))
    })
    ```

- UPDATE
  - findOneAndUpdate()
  - ```
    // finds specified user and updates email of that user
    app.get('/update-user', async(req, res)=>{
      await userModel.findOneAndUpdate({
        username:'a'
      },
      {
        email:'ab@ab'
      })
    }).then(res.send('users email is updated'))
    ```
- DELETE
  -
