const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');

const extractId = (token) => jwt.verify(token, 'secretKey');

exports.postExpense = async (req, res, next) => {
  req.body.userId = extractId(req.body.userId);
  const expense = await Expense.create(req.body);
  res.send({ newExpenseDetails: expense });
};

exports.getExpense = async (req, res, next) => {
  id = req.user.id;
  const allExpense = await Expense.findAll({ where: { userId: id } });
  res.send({ allExpenseDetails: allExpense });
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  Expense.destroy({
    where: {
      id: id,
    },
  });
};
