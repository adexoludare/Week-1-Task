import express from 'express'
import {Request, Response, NextFunction, Router } from "express";


import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getLoginPage,
  getCustomer,
  getCustomerPage,
  deleteCustomerByEmail,
  updateCustomerByEmail,
  getCreateCustomer, getDeleteCustomer, getUpdateCustomer
 } from "../route-controller"
 import {authorizer} from "../authorization"
 import userValidators from '../validators/validateUserData';
 import customerValidators from '../validators/validateCustomer'
 import {createAdminController, getRegisterPage, loginController, getHomepage, LogoutController} from '../controllers/adminController'
 import { createCustomerController, getRegisterCustomerPage, getCustomers, getUpdateCustomerPage, updateCustomerController,getDeleteCustomerPage, deleteCustomerController, getUpdateCustomerByEmailPage, deleteCustomerByEmailController, updateCustomerByEmailController, getCustomerByEmailPage, getCustomerByEmailInBodyPage } from '../controllers/userController';
import validateUserData from '../validators/validateUserData';
 
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});
router.get('/login', getLoginPage);
router.post('/login', loginController);
router.get('/customer', userValidators.validateToken, getCustomers);
router.get('/createCustomer', userValidators.validateToken, getRegisterCustomerPage);
router.post('/createCustomer', userValidators.validateToken, customerValidators.validateNewCustomer, createCustomerController);
router.get('/register', getRegisterPage)
router.post('/newUser', userValidators.validateNewUser, createAdminController, getLoginPage)
router.get('/updateCustomer', userValidators.validateToken, getUpdateCustomerPage)
router.post('/updateCustomer', userValidators.validateToken, updateCustomerController);
router.get('/deleteCustomer', userValidators.validateToken, getDeleteCustomerPage);
router.post('/deleteCustomer', userValidators.validateToken, deleteCustomerController);
router.get('/customer/:email', userValidators.validateToken, getCustomerByEmailPage);
router.post('/customer', userValidators.validateToken, getCustomerByEmailInBodyPage);
router.post('/deleteCustomer/:email', userValidators.validateToken, deleteCustomerByEmailController);
router.get('/customer/delete/:email', userValidators.validateToken, deleteCustomerByEmailController);
router.get('/updateCustomer/:email', userValidators.validateToken, getUpdateCustomerByEmailPage);
router.get('/customer/update/:email', userValidators.validateToken, getUpdateCustomerByEmailPage);
router.post('/updateCustomer/:email', userValidators.validateToken, updateCustomerByEmailController)
router.get('/logout', LogoutController);

// module.exports = router;
export default router