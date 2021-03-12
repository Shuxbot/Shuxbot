import * as admin from "firebase-admin";

const serviceAccount = require("../../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

/** Database */
export const db = admin.database();
