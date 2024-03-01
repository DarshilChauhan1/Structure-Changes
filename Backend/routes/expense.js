const express = require('express');
const userAuth = require('../middlewares/auth');

const expenseController = require('../controllers/expense');
const router = express.Router();
router.post('/', expenseController.postExpense);
router.get('/', userAuth.authenticate, expenseController.getExpense);
router.delete('/:id', expenseController.deleteExpense);
module.exports = router;
