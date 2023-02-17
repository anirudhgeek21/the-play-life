//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/", function (req, res) {
 res.sendFile(__dirname + "/index.html");
});





app.post("/",function(req,res){
  const fname= req.body.fname;
  const email= req.body.email;
  const age= req.body.age;
  const referral = req.body.referral;




  const client = require("@mailchimp/mailchimp_marketing");

  client.setConfig({
    apiKey: "2ead5c48109962a1b3ca86686dcd5c8b-us11",
    server: "us11",
  });

  const run = async () => {
    const response = await client.lists.batchListMembers("de56cea4d8", {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields:{
              FNAME: fname,
              AGE: age,
              REFERRAL: referral
            }
      }],
    });
    ;
  };

  run();

  res.sendFile(__dirname + "/success.html")


})



app.post("/success.html",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});




// apikey
// 2ead5c48109962a1b3ca86686dcd5c8b-us11

// list idea
// de56cea4d8
