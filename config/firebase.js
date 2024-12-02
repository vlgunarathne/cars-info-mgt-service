const admin = require('firebase-admin');
// const serviceAccount = require('../resources/serviceAccountKey.json');

const isAppDefaultCred = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production';

admin.initializeApp({
    credential: admin.credential.applicationDefault() // admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const carsCollection = db.collection('cars');

module.exports = { db, carsCollection };
