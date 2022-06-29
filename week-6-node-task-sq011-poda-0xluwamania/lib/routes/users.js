"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_controller_1 = require("../route-controller");
const validateUserData_1 = __importDefault(require("../validators/validateUserData"));
const validateCustomer_1 = __importDefault(require("../validators/validateCustomer"));
const adminController_1 = require("../controllers/adminController");
const userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', route_controller_1.getLoginPage);
router.post('/login', adminController_1.loginController);
router.get('/customer', validateUserData_1.default.validateToken, userController_1.getCustomers);
router.get('/createCustomer', validateUserData_1.default.validateToken, userController_1.getRegisterCustomerPage);
router.post('/createCustomer', validateUserData_1.default.validateToken, validateCustomer_1.default.validateNewCustomer, userController_1.createCustomerController);
router.get('/register', adminController_1.getRegisterPage);
router.post('/newUser', validateUserData_1.default.validateNewUser, adminController_1.createAdminController, route_controller_1.getLoginPage);
router.get('/updateCustomer', validateUserData_1.default.validateToken, userController_1.getUpdateCustomerPage);
router.post('/updateCustomer', validateUserData_1.default.validateToken, userController_1.updateCustomerController);
router.get('/deleteCustomer', validateUserData_1.default.validateToken, userController_1.getDeleteCustomerPage);
router.post('/deleteCustomer', validateUserData_1.default.validateToken, userController_1.deleteCustomerController);
router.get('/customer/:email', validateUserData_1.default.validateToken, userController_1.getCustomerByEmailPage);
router.post('/customer', validateUserData_1.default.validateToken, userController_1.getCustomerByEmailInBodyPage);
router.post('/deleteCustomer/:email', validateUserData_1.default.validateToken, userController_1.deleteCustomerByEmailController);
router.get('/customer/delete/:email', validateUserData_1.default.validateToken, userController_1.deleteCustomerByEmailController);
router.get('/updateCustomer/:email', validateUserData_1.default.validateToken, userController_1.getUpdateCustomerByEmailPage);
router.get('/customer/update/:email', validateUserData_1.default.validateToken, userController_1.getUpdateCustomerByEmailPage);
router.post('/updateCustomer/:email', validateUserData_1.default.validateToken, userController_1.updateCustomerByEmailController);
router.get('/logout', adminController_1.LogoutController);
// module.exports = router;
exports.default = router;
//# sourceMappingURL=users.js.map