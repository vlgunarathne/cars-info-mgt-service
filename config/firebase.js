const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '../resources/serviceAccountKey.json');
let serviceAccount;

if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
}

const isAppDefaultCred = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production';

admin.initializeApp({
    credential: !isAppDefaultCred && serviceAccount ? admin.credential.cert(serviceAccount): admin.credential.applicationDefault()
});

const db = admin.firestore();
const carsCollection = db.collection('cars');

module.exports = { db, carsCollection };
