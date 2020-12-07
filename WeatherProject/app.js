const express=require("express");
const app= express();
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({ extended:true }));


const https= require("https");

app.get("/",function (req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function (req,res)
{
  const city=req.body.cityName;
  var country = req.body.ountry;
  res.write("<h1 style=color:blue>The temerature is <h1>")
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid=16b108526ce385c6672e36b36ea059b0&units=metric";
https.get(url,function (response){
  response.on("data",function (data){// in binary format
    const wd=JSON.parse(data) // will convert into json
    const temp=wd.weather[0].description// the path to trmp in json file
    const temperature=wd.main.temp;
    res.write(String(temperature));
    const icon=wd.weather[0].icon
   const imageURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png"
   res.write("<img src="+imageURL+">")
    res.send();
  })
})
})






app.listen(3000,function ()
{console.log("Server is running on port 3000")
  })
