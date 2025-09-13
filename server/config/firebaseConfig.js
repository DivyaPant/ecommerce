var admin = require("firebase-admin");

var base64String = process.env.FIREBASE_CONFIG;

const decodedString = Buffer.from(base64String, "base64").toString("utf-8");

// Parse back to JSON object
const serviceAccount = JSON.parse(decodedString);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;