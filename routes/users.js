const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/users', authMiddleware, userController.all);
router.get('/users/:id', authMiddleware, userController.get);
router.post('/users', authMiddleware, userController.create);
router.put('/users/:id', authMiddleware, userController.update);
router.delete('/users/:id', authMiddleware, userController.delete);
router.delete('/delete-account', authMiddleware, userController.deleteAccount);

module.exports = router;