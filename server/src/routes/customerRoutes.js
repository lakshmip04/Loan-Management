const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// Customer routes
router.route('/')
    .post(createCustomer)
    .get(getAllCustomers);

router.route('/:id')
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router; 