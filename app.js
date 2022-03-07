const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//If you want to show the css files in your folder then you can show using the 
//app.use(express.static("public")); where public will be the folder in your route folder which contains the css and images folder.

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", (req, res) => {
   const firstName = req.body.first;
   const lastName = req.body.last;
   const email = req.body.email;
   
   var data = {
       members : [
           {
               email_address : email,
               status : "subscribed",
               merge_fields : {
                   FNAME : firstName,
                   LNAME : lastName 
               }
           }
       ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/e6a8cecbc9/"

   const options = {
       method : 'POST',
       auth:"Akshay:5872263dd521e3a6d50115c192bebe79-us1"
   }

   //https.request is used to post the data to the external server
   const request = https.request(url,options, (response) => {
    console.log(response.statusCode);
    if(response.statusCode === 200)
    {
        res.send("Tune kar ke dikhaya!!!")
    }
    else{
        res.send("Nikal Lavde!!!")
    }
    response.on('data', (data) => {
        console.log(JSON.parse(data));
    })
   })
    request.write(jsonData);
    request.end();


})

//process.env.PORT is used, when we deploy our app to hosting provider (heroku) then that hosting provider will decide on which port to host your app
app.listen(process.env.PORT || 3000,function(){
    console.log('listening on port 3000');

})


// api key
// 5872263dd521e3a6d50115c192bebe79-us1


// unique id
// e6a8cecbc9  

//now if you have changed something in your code and you want to reflect that in your deployed heroku app....then after making the changes in the  code file go to the cmd line
// git add .
// git commit -m "Updated 2nd version"
// git push heroku master
