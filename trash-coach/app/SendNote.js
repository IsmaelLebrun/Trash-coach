const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const { readFileSync } = require("fs");

export default async function SendNote(receiver, note){

    const credentials = JSON.parse(readFileSync("../client_secret_767917204071-l4j6276cmf4gbb2dn18ith8volg0788s.apps.googleusercontent.com.json", "utf-8"));

    const client = new google.auth.GoogleAuth({
    credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/gmail.send"], // Scopes nécessaires
    });
    // Remplacez par un token actualisé ou générez un nouveau via OAuth
    oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_TOKEN_URI,
    });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "your-email@gmail.com", // Remplacez par votre e-mail Gmail
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_PRIVATE_KEY_ID,
      refreshToken: process.env.GMAIL_TOKEN_URI,
      accessToken: accessToken.token,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_CLIENT_EMAIL,
    to: receiver,
    subject: "Trash coach",
    text: note,
    html: "",
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }

}