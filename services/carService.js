const { carsCollection } = require('../config/firebase');

class CarService {
    async create(car) {
        const newCar = await carsCollection.add(car);
        return newCar.id;
    }

    async getById(id) {
        const carDoc = await carsCollection.doc(id).get();
        if (!carDoc.exists) return null;
        return carDoc.data();
    }

    async update(id, car) {
        await carsCollection.doc(id).update(car);
    }

    async delete(id) {
        await carsCollection.doc(id).delete();
    }

    async getAll(filters, sortOptions) {
        let query = carsCollection;

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                // Handle name prefix search
                if (key === 'name') {
                    // Create the end range by replacing the last character with the next one
                    const strEnd = value.slice(0, -1) + String.fromCharCode(value.slice(-1).charCodeAt(0) + 1);
                    query = query.where(key, '>=', value)
                        .where(key, '<', strEnd);
                } else if (key.endsWith('_min')) {
                    // Handle range filters
                    const fieldName = key.replace('_min', '');
                    query = query.where(fieldName, '>=', this.parseValue(fieldName, value));
                }
                else if (key.endsWith('_max')) {
                    const fieldName = key.replace('_max', '');
                    query = query.where(fieldName, '<=', this.parseValue(fieldName, value));
                }
                // Handle exact match filters
                else {
                    query = query.where(key, '==', this.parseValue(key, value));
                }
            }
        });

        // Apply sorting
        if (sortOptions.sortBy) {
            query = query.orderBy(sortOptions.sortBy, sortOptions.order || 'asc');
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    parseValue(key, value) {
        switch (key) {
            case 'mpg':
            case 'displacement':
            case 'horsepower':
            case 'weight':
            case 'acceleration':
                return parseFloat(value);
            case 'cylinders':
            case 'model_year':
                return parseInt(value);
            default:
                return value;
        }
    }
}

module.exports = new CarService();
