const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var pincode=0;
const cityschema = mongoose.Schema({
    pin: Number,
    cities: [String, String, String, String, String]
});

const city = mongoose.model("city", cityschema);
const city1 = new city({
    pin: 382424,
    cities: ["a", "b", "c", "d", "e"]
});
const city2 = new city({
    pin: 382421,
    cities: ["f", "g", "h", "i", "j"]
});
const city3 = new city({
    pin: 382425,
    cities: ["k", "l", "m", "n", "o"]
});
const city4 = new city({
    pin: 382426,
    cities: ["p", "q", "r", "s", "t"]
});
const city5 = new city({
    pin: 382427,
    cities: ["u", "v", "w", "x", "y"]
});

const available_cities = [city1, city2, city3, city4, city5];
/*city.insertMany(available_cities,function(err){
    console.log(err);
});*/
app.get("/selectcenter", function (req, res) {
    city.find({ pin: pincode}, function (err, foundata) {
        res.render("selectcenter", {avcen: foundata});
        console.log(foundata)
    })
});



app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/help", function (req, res) {
    res.render("help");
});
app.get("/login", function (req, res) {
    res.render("log-in");
});
app.get("/stats", function (req, res) {
    res.render("stats");
});
app.get("/reach_us", function (req, res) {
    res.render("reach_us");
});
app.get("/connect", function (req, res) {
    res.render("connect");
});
app.get("/donate", function (req, res) {
    res.render("donate");
});

app.get("/selectcenter", function (req, res) {
    res.render("selectcenter");
});
app.get("/register", function (req, res) {
    res.render("register");
})

const pschema = mongoose.Schema({
    phone: Number,
    pass: String,
    repassw: String,
});
const pdata = mongoose.model("people", pschema);

app.post("/register", function (req, res) {
    var ppldata = new pdata({
        phone: req.body.number,
        pass: req.body.password,
        repassw: req.body.repass,
    });
    console.log(ppldata);
    ppldata.save();
    console.log(ppldata);
    res.redirect("/");
});
var no = 0;

app.post("/login", function (req, res) {
    no = req.body.number;
    var entry = req.body.password;
    /*pdata.findOne({phone: no},function(err,foundone){
    if(err)
    {
        console.log(err); 
    }
    else{
        if(foundone){
            if(foundone.password==entry){
                
            }
        }
    }  
});*/
    res.redirect("/account");
});

const memSchema = mongoose.Schema({
    phone: Number,
    first: String,
    last: String,
    pincode: Number,
    aadhar: Number
});
var num = 0;
const mem = mongoose.model("mem", memSchema);
app.get("/account", function (req, res) {
    mem.find({phone:no}, function (err, result) {
        if (err)
            console.log(err);
        else {
            res.render("account",{newdatainput: result});
        }

    });
});
app.post("/account", function (req, res) {
    num = no;
    var first = req.body.fn;
    var last = req.body.sn;
    pincode = req.body.pc;
    var aadhar = req.body.adn;
    var family = new mem({
        phone: num,
        first: first,
        last: last,
        pincode: pincode,
        aadhar: aadhar
    });
    family.save();
    res.redirect("/account");
});

app.listen(3000);