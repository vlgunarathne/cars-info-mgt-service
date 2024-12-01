const admin = require('firebase-admin');
const serviceAccount = require('../resources/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const carsCollection = db.collection('cars');

module.exports = { db, carsCollection };
