const express = require('express');
const router = express.Router() 

const {getAllProduct, getAllProductStatic} = require('../controllers/product')

router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductStatic)


module.exports = router  