const express = require('express');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.get('/:mob_no', accountController.getBalance);

router
  .route('/')
  .get(accountController.getAllAccounts)
  .post(accountController.createAccount);

router
  .route('/:id')
  .get(accountController.getAccount)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
