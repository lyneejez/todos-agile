const express = require("express")

const todosRoutes = require('./routes/todos')
const usersRoutes = require('./routes/users')
const categoriesRoutes = require('./routes/categories')


const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/todos', todosRoutes);

const port = 3000;

app.listen(port,(req, res) =>console.log(`listening at port ${port}`));