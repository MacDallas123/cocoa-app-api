const express = require("express");
const plotController = require("../controllers/plotController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/plot', authMiddleware, plotController.all);
router.get('/plot/:id', authMiddleware, plotController.get);
router.post('/plot', authMiddleware, plotController.create);
router.put('/plot/:id', authMiddleware, plotController.update);
router.delete('/plot/:id', authMiddleware, plotController.delete);

module.exports = router;