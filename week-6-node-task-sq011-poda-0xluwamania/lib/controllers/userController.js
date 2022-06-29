"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerByEmailController = exports.deleteCustomerController = exports.getDeleteCustomerPage = exports.updateCustomerByEmailController = exports.updateCustomerController = exports.getUpdateCustomerByEmailPage = exports.getUpdateCustomerPage = exports.getCustomerByEmailInBodyPage = exports.getCustomerByEmailPage = exports.getCustomers = exports.getRegisterCustomerPage = exports.createCustomerController = void 0;
const userServices_1 = require("../services/userServices");
const admin_1 = require("../utils/admin");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, '../database.json');
const createCustomerController = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            const result = (0, userServices_1.createCustomer)(req.body);
            console.log(result);
            return res.render('createdCustomer', { data: result, title: 'Customers' });
        }
        // const customerList = JSON.parse(readData(filePath))
    }
    catch (error) {
        console.log(error);
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.createCustomerController = createCustomerController;
const getRegisterCustomerPage = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.render('create_customer', { title: 'Registration' });
    }
};
exports.getRegisterCustomerPage = getRegisterCustomerPage;
const getCustomers = (req, res) => {
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    return res.render('get_customer', { data: customerList });
};
exports.getCustomers = getCustomers;
const getCustomerByEmailPage = (req, res) => {
    console.log(req.params.email);
    const result = (0, userServices_1.fetchCustomer)(req.params.email);
    return res.render('getCustomerByEmail', { data: result });
};
exports.getCustomerByEmailPage = getCustomerByEmailPage;
const getCustomerByEmailInBodyPage = (req, res) => {
    console.log(req.body);
    const result = (0, userServices_1.fetchCustomer)(req.body.email);
    return res.render('getCustomerByEmail', { data: result });
};
exports.getCustomerByEmailInBodyPage = getCustomerByEmailInBodyPage;
const getUpdateCustomerPage = (req, res, next) => {
    return res.render('updateCustomer', { title: 'Update Customer' });
};
exports.getUpdateCustomerPage = getUpdateCustomerPage;
const getUpdateCustomerByEmailPage = (req, res, next) => {
    const result = (0, userServices_1.fetchCustomer)(req.params.email);
    console.log(req.params);
    return res.render('updateCustomerByEmail', { data: result, title: 'Update Customer' });
};
exports.getUpdateCustomerByEmailPage = getUpdateCustomerByEmailPage;
const updateCustomerController = (req, res) => {
    try {
        const result = (0, userServices_1.updateCustomer)(req.body);
        const customerList = JSON.parse((0, admin_1.readData)(filePath));
        console.log(result);
        return res.render('updatedCustomer', { data: result, title: 'Customers' });
    }
    catch (error) {
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.updateCustomerController = updateCustomerController;
const updateCustomerByEmailController = (req, res) => {
    try {
        const result = (0, userServices_1.updateCustomer)(req.body);
        const customerList = JSON.parse((0, admin_1.readData)(filePath));
        console.log(result);
        return res.render('updatedCustomer', { data: result, title: 'Customers' });
    }
    catch (error) {
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.updateCustomerByEmailController = updateCustomerByEmailController;
const getDeleteCustomerPage = (req, res, next) => {
    return res.render('deleteCustomer', { title: 'Delete Customer' });
};
exports.getDeleteCustomerPage = getDeleteCustomerPage;
const deleteCustomerController = (req, res) => {
    try {
        const result = (0, userServices_1.deleteCustomer)(req.body.email);
        const customerList = JSON.parse((0, admin_1.readData)(filePath));
        console.log(result);
        return res.render('deletedCustomer', { data: result, title: 'Customers' });
    }
    catch (error) {
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.deleteCustomerController = deleteCustomerController;
const deleteCustomerByEmailController = (req, res) => {
    try {
        const result = (0, userServices_1.deleteCustomerByEmail)(req.params.email);
        console.log(req.params.email);
        return res.render('deletedCustomer', { data: result, title: 'Customers' });
    }
    catch (error) {
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.deleteCustomerByEmailController = deleteCustomerByEmailController;
//# sourceMappingURL=userController.js.map