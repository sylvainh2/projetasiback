const express = require('express');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

// const TOKEN = "6b32cd0920302ff20364fa7856987fa5";
const TOKEN = "9a32120929ff2126431d51a9226c6007";

const router = express.Router();

router.route('/')
.post(async(req, res) => {
    const { email, sujet, message } = req.body;

    const transport = Nodemailer.createTransport(
        MailtrapTransport({
          token: TOKEN,
          testInboxId:3182220,
        })
      );
      
    const sender = {
    address: "hello@demomailtrap.com",
    name: "Mailtrap Test",
    };
    //ici il faut mettre l'email de l'adhérant
    const recipients = [
    "sylvaincrouzierpro@gmail.com",
    ];

    transport
    .sendMail({
    from: sender,
    to: recipients,
    subject: sujet,
    text: message,
    category: "Integration Test",
    sandbox: true
    })
    .then(()=>{
    console.log, console.error;
    res.status(200).json({message:"email envoyé"});
    }
    );
});

module.exports = router