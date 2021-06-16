const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views','./views');
mongoose.connect("mongodb://localhost:27017/peopledb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const pschema=mongoose.Schema({
    phone: Number,
    pass: String,
    repassw: String,
    remps: String
});
const pdata=mongoose.model("people",pschema);


app.use(bodyParser.urlencoded({extended: true}));
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/",function(req,res){
    res.render("index");
});
app.get("/help",function(req,res){
    res.render("help");
});
app.get("/login",function(req,res){
    res.render("log-in");
});
app.get("/stats",function(req,res){
    res.render("stats");
});
app.get("/reach_us",function(req,res){
    res.render("render");
});
app.get("/connect",function(req,res){
    res.render("connect");
});
app.get("/donate",function(req,res){
    res.render("donate");
});
app.post("/register",function(req,res){
    var ppldata=new pdata({
        phone: req.body.number,
        pass: req.body.password,
        repassw: req.body.repass,
        remps: req.body.remember_me
    });
    console.log(ppldata);
    ppldata.save(function(err){
        if(err) throw err;
    });
    res.redirect("/");
});

app.listen(3000);