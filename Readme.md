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
  -
