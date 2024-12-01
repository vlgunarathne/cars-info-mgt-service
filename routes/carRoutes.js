const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/', carController.create.bind(carController));
router.get('/:id', carController.getById.bind(carController));
router.put('/:id', carController.update.bind(carController));
router.delete('/:id', carController.delete.bind(carController));
router.get('/', carController.getAll.bind(carController));

module.exports = router;
