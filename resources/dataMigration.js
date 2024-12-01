const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { carsCollection } = require('../config/firebase');

const csvFilePath = path.join(__dirname, 'Automobile.csv');

async function migrateData() {
  const cars = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Convert fields to appropriate types
      row.mpg = parseFloat(row.mpg);
      row.displacement = parseFloat(row.displacement);
      row.acceleration = parseFloat(row.acceleration);
      row.weight = parseFloat(row.weight);
      row.cylinders = parseInt(row.cylinders, 10);
      row.horsepower = parseInt(row.horsepower, 10);
      row.model_year = parseInt(row.model_year, 10);

      cars.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      for (const car of cars) {
        try {
          await carsCollection.add(car);
          console.log(`Car added: ${car.name}`);
        } catch (error) {
          console.error(`Error adding car: ${car.name}`, error);
        }
      }
      console.log('Data migration completed.');
    });
}

migrateData();
