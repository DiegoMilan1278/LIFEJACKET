const express = require('express');
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000


///routes 
app.get('/', (req, res) => {
    res.send("<h1>Welcome to my API</h1>");
});

///Connection MongoDB
mongoose
    .connect("mongodb+srv://LifeJacket:lifejacket123@cluster0.yrvnibf.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(() => console.error(error));

app.listen(port, () => console.log('The server listining on port', port));
