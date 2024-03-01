let listGroup = document.querySelector('.List-group');
const div = document.getElementById('premium');
function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById('amount').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;
  let myExpense = {
    amount: amount,
    description: description,
    category: category,
    userId: localStorage.getItem('token'),
  };
  axios
    .post('http://localhost:3000/user/expense', myExpense)
    .then((response) => {
      getExpense(response.data.newExpenseDetails);
    })
    .catch((error) => {
      console.error('Error adding expense:', error);
    });
}
function getExpense(myExpense) {
  let newListElement = document.createElement('li');
  newListElement.textContent = `${myExpense.amount}    ${myExpense.description}    ${myExpense.category}             `;
  let editbtn = document.createElement('button');
  // editbtn
  editbtn.textContent = 'Edit';
  //deletebtn
  let deletebtn = document.createElement('button');
  deletebtn.textContent = 'Delete';
  newListElement.appendChild(editbtn);
  newListElement.appendChild(deletebtn);
  listGroup.appendChild(newListElement);

  editbtn.onclick = () => {
    document.getElementById('amount').value = myExpense.amount;
    document.getElementById('description').value = myExpense.description;
    document.getElementById('category').value = myExpense.category;
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:3000/user/expense/${myExpense.id}`);
  };

  deletebtn.onclick = () => {
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:3000/user/expense/${myExpense.id}`);
  };
}

const premiumBtn = document.getElementById('buyPremium');
premiumBtn.onclick = async (e) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:3000/purchase/premiummember',
    { headers: { Authorization: token } }
  );
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async (response) => {
      await axios.post(
        'http://localhost:3000/purchase/updatetransactionstatus',
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      alert('You are a premium user now');
    },
  };
  const rzp = await new Razorpay(options);
  rzp.open();
  e.preventDefault();
  rzp.on('payment.failed', (response) => {
    alert('Something went wrong');
  });
};

window.onload = async () => {
  const token = localStorage.getItem('token');
  const expense = await axios.get('http://localhost:3000/user/expense', {
    headers: { Authorization: token },
  });
  expense.data.allExpenseDetails.forEach((response) => {
    getExpense(response);
  });
};
