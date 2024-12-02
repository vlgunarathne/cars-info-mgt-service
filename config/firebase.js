const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
const carsCollection = db.collection('cars');

module.exports = { db, carsCollection };
