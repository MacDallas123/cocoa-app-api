const express = require("express");
const saleController = require("../controllers/saleController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/sale', authMiddleware, saleController.all);
router.get('/sale/:id', authMiddleware, saleController.get);
router.post('/sale', authMiddleware, saleController.create);
router.put('/sale/:id', authMiddleware, saleController.update);
router.delete('/sale/:id', authMiddleware, saleController.delete);

module.exports = router;