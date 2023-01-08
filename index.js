const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

mongoose.set('strictQuery', true);

// mongoose.Promise = global.Promise;
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true)

const user = require('./controller/user');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/', (request, response) => {
    response.status(200).json({message : "hello world", statusCode : 200})
})

app.post('/user', user.createUser);
app.get('/getusers/:limit/:offset', user.getUser);
app.get('/user/:id', user.getUserByID);
app.delete('/user/:id', user.deleteUser);

app.use('/', (request, response) => {
    response.status(400).json({message : "Not Found", statusCode : 400})
})

// mongoose.connect('mongodb://127.0.0.1:27017', (err, client) => {
//     console.log('Koneksi sukses');
//     const db = client.db('belajar');
//     client.close();
// })
mongoose.connect('mongodb://127.0.0.1:27017/belajar')
.then(() => {
    console.log('Koneksi Sukses');
}).catch(err => {
    console.log(err);
})

app.listen(port, () => {
    console.log('Listening on port ', port)
})