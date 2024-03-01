require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/databse.js');

const User = require('./models/user.js');
const Expense = require('./models/expense.js');
const Order = require('./models/order.js');

const userRoutes = require('./routes/user.js');
const expenseRoutes = require('./routes/expense.js');
const orderRoutes = require('./routes/order.js');
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use('/user', userRoutes);
app.use('/user/expense', expenseRoutes);
app.use('/purchase', orderRoutes);

Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expense);
User.hasMany(Order);
const PORT = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
