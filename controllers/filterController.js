const filterService = require('../services/filterService');

class FilterController {
  async getAll(req, res) {
    try {
      const filters = await filterService.getAll();
      res.status(200).send(filters);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      await filterService.delete(req.params.id);
      res.status(200).send('Filter deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new FilterController();
