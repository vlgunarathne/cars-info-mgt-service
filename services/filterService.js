const { db } = require('../config/firebase');
const filtersCollection = db.collection('filters');

class FilterService {
    async create(filters) {
        // Remove empty filters and add timestamp
        const cleanFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value != null && value !== '')
        );

        if (Object.keys(cleanFilters).length === 0) {
            return null; // Don't store if no filters were applied
        }

        const filterDoc = {
            ...cleanFilters,
            createdAt: new Date().toISOString()
        };

        const newFilter = await filtersCollection.add(filterDoc);
        return { id: newFilter.id, ...filterDoc };
    }

    async getAll() {
        const snapshot = await filtersCollection.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async delete(id) {
        await filtersCollection.doc(id).delete();
    }
}

module.exports = new FilterService();
