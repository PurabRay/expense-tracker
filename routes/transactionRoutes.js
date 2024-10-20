const express = require('express');
const { addTransaction } = require('../controllers/transactionController');
const {getAllTransaction } = require('../controllers/transactionController');

const router=express.Router();
router.post('/add-transaction',addTransaction)
router.post("/get-transaction",getAllTransaction)//as we are passing the id here currently
module.exports=router