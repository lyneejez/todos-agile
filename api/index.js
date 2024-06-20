const express= require("express")
const app = express();

const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.get('/',(req, res)=> {
    res.json({ "welcome": "welcome to our api"})
});

app.listen(port, (req, res) => console.log(`running on port ${port}`))