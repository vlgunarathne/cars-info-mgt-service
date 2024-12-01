const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');

router.get('/', filterController.getAll.bind(filterController));
router.delete('/:id', filterController.delete.bind(filterController));

module.exports = router;
