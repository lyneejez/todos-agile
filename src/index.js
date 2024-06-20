const express = require("express")
const app = express();
 
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json());


const port = 5000;
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)})

const apiURL = "http://localhost:3000/api";

app.get("/",(req,res)=>{
    res.json({"welcome": "hello yah"})
});

app.get("/todos",(req,res)=>{
    fetch(apiURL+'/todos').then(res => res.json()).then((todos) =>{
        res.render('template', {todos, main_content: 'todos/index'})
    });
});


app.get("/create",(req,res)=>{
    fetch(apiURL+'/users').then(res => res.json()).then((users) => {
        fetch(apiURL+'/categories').then(res => res.json()).then((categories) =>{
            res.render('template', {categories, users, main_content: 'todos/create'})
        });
    });
});


app.post("/create",function(req,res){
    fetch(`${apiURL}/todos/create`,{
        method:'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(res =>res.json()).then((results)=>{
        res.redirect("/")
    })
})


app.get("/:id/edit",function(req,res){
    const id = req.params.id
    fetch(`${apiURL}/todos/${id}`).then((res)=>res.json()).then(todos => {
        const todo = todos[0]
        fetch(apiURL + '/users').then(res=> res.json()).then((users)=> {
            fetch(apiURL + '/categories').then(res => res.json()).then((categories)=>{
                res.render('template',{todo,users,categories,main_content: "todos/edit"});
            })
        })

    }).catch(err =>{
        console.log({err})
    return res.send(err.toString())

    })
})


app.post("/:id/edit", function(req,res){
    fetch(`${apiURL}/todos/${req.params.id}/edit`,{
        method:'Patch',
        headers: {
            'Accept':'application/json',
            'content-type':'application/json'
        },
         body:JSON.stringify(req.body)
}).then(res =>res.json()).then((results)=>{
    res.redirect("/")
    })
})

app.get("/:id/completed", function(req,res) {
    // /:id/completed

    fetch(`${apiURL}/todos/${req.params.id}/completed`,{
        method:'PATCH',
        headers: {
            'Accept':'application/json',
            'content-type':'application/json'
        }
}).then(res =>res.json()).then((results)=>{
    res.redirect("/")
    })
})



app.get("/:id/delete", function(req,res){
    fetch(`${apiURL}/todos/${req.params.id}`,{
        method:'DELETE',
    })
.then(response =>{
    if(response.ok){
        return response.json();
    }
    throw new error("error deleting an item");
}).then((results)=>{
    res.redirect("/")
    })
    .catch(err =>{
        console.error(err);
        res.status(5000).send(err.toString());
    });
});
