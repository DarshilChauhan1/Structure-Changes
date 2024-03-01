const Razorpay = require('razorpay');
const Order = require('../models/order');

exports.purchasePremium = async (req, res) => {
  const { RZP_KEY_ID, RZP_KEY_SECRET } = process.env;
  try {
    var rzp = new Razorpay({
      key_id: RZP_KEY_ID,
      key_secret: RZP_KEY_SECRET,
    });
    var option = {
      amount: 2500,
      currency: 'INR',
    };
    rzp.orders.create(option, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: 'PENDING' })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        });
    });
  } catch (error) {}
};

exports.updatetransactionstatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderid: order_id } })
      .then((order) => {
        order
          .update({ paymentid: payment_id, status: 'SUCCESSFUL' })
          .then(() => {
            req.user.update({ ispremiumuser: true }).then(() => {
              return res
                .status(202)
                .json({ success: true, message: 'Transaction successful' });
            });
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    throw new Error(error);
  }
};
