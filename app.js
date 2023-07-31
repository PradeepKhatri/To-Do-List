const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/todolistDB");

const itemsSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model("item" , itemsSchema);

const item1 = new Item ({name:"welcome..!"});
const item2 = new Item ({name:"click + to add"});
const item3   = new Item ({name:" hit <- this to delete"});

const defaultItems = [item1 , item2 , item3];



app.get("/", function (req, res) {

    Item.find({} , function(err,founditems){

        if(founditems.length === 0 ){
            Item.insertMany(defaultItems , {function(err) {
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved default items !!");
                }
            }});
            
            res.redirect("/");
        }else{
            res.render('list', { KindOfDay: "Today", newlistitems:founditems });   
            // console.log(founditems.name);    
        }
    })

});

app.get("/added", (req, res) => {
    res.render('list', { KindOfDay: day, newlistitems: items });
})

app.post("/", function (req, res) {
    const itemName = req.body.newItem;

    const item = new Item({
        name : itemName
    });

    item.save();
    res.redirect("/");


});

app.post("/delete" , function(req, res) {
    
    const {check} = req.body;



    Item.findByIdAndRemove(check , function(err){
        if(err){
            console.log("err");
        }else{
            console.log("successsfully deleted..");
            res.redirect("/");

        }
    });
}); 

app.listen(process.env.PORT || 3000, function () {
    console.log("Port started at port 3000");
});



