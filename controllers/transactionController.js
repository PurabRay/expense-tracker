
const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  try {
    const { filter, selectedDate, type } = req.body;

    // Prepare the query object
    const query = filter !== 'custom' 
      ? {
          date: { $gt: moment().subtract(Number(filter), 'd').toDate() },
          userid: req.body.userid
        }
      : {
          date: { $gte: selectedDate[0], $lte: selectedDate[1] },
          userid: req.body.userid
        };

    // Apply the type filter after the main query
    if (type !== 'all') {
      query.type = type;  // Add type filter to query only if it's not 'all'
    }

    // Fetch transactions using the query
    const transactions = await transactionModel.find(query);
    
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send('transaction created');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction };
