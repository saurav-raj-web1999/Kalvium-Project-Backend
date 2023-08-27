const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 3000;
const history = require("./db/db_model");
require("./db/connection");
const operator = {
    "plus" : '+',
    "minus" : '-',
    "into" : '*',
    "by" : '/',
    "mod" : '%'
};

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/history', async(req,res)=>{
    try {
        const data = await history.find().sort({_id:-1}).limit(20);

        res.render('history', {record : data});

    } catch (error) {
        console.log("No data found");
    }
})

app.get('*', async (req, res)=>{

    try {        
        let path = req.url;
        let arr = path.split('/');
        let expression = arr[1];

        for(let i=2;i<arr.length;i+=2){
            expression += operator[arr[i]]+arr[i+1];
        }

        let solution = eval(expression);
        solution = String(solution);

        const newData = new history({
            operation: expression,
            result: solution
        })
        const saveData = await newData.save();
        res.send(`<h1>${expression} = ${solution}</h1>`);
    } catch (error) {
        console.log(error);
    }
    
})


app.listen(port, ()=>{
    console.log(`Server running at port no ${port}`);
})