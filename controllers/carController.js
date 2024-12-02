const carService = require('../services/carService');
const filterService = require('../services/filterService');
class CarController {
    async create(req, res) {
        try {
            const id = await carService.create(req.body);
            res.status(201).send({ id });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const car = await carService.getById(req.params.id);
            if (!car) {
                res.status(404).send({ message: 'Car not found' });
            } else {
                res.status(200).send(car);
            }
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            await carService.update(req.params.id, req.body);
            res.status(200).send({ message: 'Car updated successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await carService.delete(req.params.id);
            res.status(200).send({ message: 'Car deleted successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const filters = {
                name: req.query.name,
                mpg_min: req.query.mpg_min,
                mpg_max: req.query.mpg_max,
                cylinders: req.query.cylinders,
                displacement_min: req.query.displacement_min,
                displacement_max: req.query.displacement_max,
                horsepower_min: req.query.horsepower_min,
                horsepower_max: req.query.horsepower_max,
                weight_min: req.query.weight_min,
                weight_max: req.query.weight_max,
                acceleration_min: req.query.acceleration_min,
                acceleration_max: req.query.acceleration_max,
                model_year: req.query.model_year,
                origin: req.query.origin
            };

            const sortOptions = {
                sortBy: req.query.sortBy,
                order: req.query.order
            };

            // Store filters if any were applied
            await filterService.create(filters);

            const cars = await carService.getAll(filters, sortOptions);
            res.status(200).send(cars);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new CarController();
