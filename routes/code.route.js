const express = require('express');
const Nodemailer = require("nodemailer");

const TOKEN = "9a32120929ff2126431d51a9226c6007";

const router = express.Router();

router.route('/')
.post(async(req, res) => {
    const { email, sujet, message } = req.body;
    
    try {
    const transporter = Nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "73bfb97c0f0902",
          pass: "6eab73ed5788cc",
        },
      });

        const info = await transporter.sendMail({
          from: '"ASI front" <no-reply@myapp.com>',
          to: email,
          subject: sujet,
          text: message,
        });
    
        console.log("Message envoyé :", info);
        res.status(200).json({ message: "Email envoyé avec succès" });
      } catch (error) {
        console.error("Erreur:", error);
        res.status(400).json({ error: "Erreur lors de l'envoi de l'email" });
      }

});

module.exports = router