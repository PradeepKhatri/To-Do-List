const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27117/todolistDB");

const itemsSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model("item" , itemsSchema);

const item1 = new Item ({name:"welcome..!"});
const item2 = new Item ({name:"click + to add"});
const item3   = new Item ({name:" hit <- this to delete"});

const defaultItems = [item1 , item2 , item3];

Item.insertMany(defaultItems , function(err) {
    if(err){
        console.log(err);
    }else{
        console.log("Successfully saved default items !!");
    }
});


app.get("/", function(req,res) {

    res.render('list' , {KindOfDay: "Today", newlistitems : items});
});

app.get("/added",(req,res) => {
    res.render('list', {KindOfDay: day, newlistitems: items});
})

app.post("/" , function(req , res) {
    var item = req.body.newItem;
    
    items.push(item);

    res.redirect("/added");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Port started at port 3000");
});

