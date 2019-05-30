const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  console.log("user.formEmail : "+user.formEmail);
  console.log("user.userPassword : "+user.userPassword);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.formEmail,
      pass: user.userPassword
    }
   
  });
var i;
console.log("user.lengthEmail : "+user.lengthEmail);
for(i=0 ; i<user.lengthEmail; i++){
  var pop = user.sendToemail.pop();
  let mailOptions = {
    from: '"Fun Of Heuristic"', // sender address
    to: pop, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };
  console.log("Check POP : "+pop);
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
  
}

// main().catch(console.error);
