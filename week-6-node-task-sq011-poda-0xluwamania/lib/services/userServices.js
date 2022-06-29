"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCustomer = exports.deleteCustomerByEmail = exports.deleteCustomer = exports.updateCustomerByEmail = exports.updateCustomer = exports.createCustomer = void 0;
const path_1 = __importDefault(require("path"));
const admin_1 = require("../utils/admin");
const filePath = path_1.default.resolve(__dirname, '../database.json');
const createCustomer = (data) => {
    const { fullname, email, gender, phone, address, notes } = data;
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let customerExist = customerList.find((customer) => customer.email === email);
    if (customerExist) {
        throw new Error('User Already Exist');
    }
    const newCustomer = { fullname, email, gender, phone, address, notes };
    newCustomer.fullname = fullname;
    newCustomer.email = email;
    newCustomer.gender = gender;
    newCustomer.phone = phone;
    newCustomer.address = address;
    newCustomer.notes = notes;
    customerList.push(newCustomer);
    (0, admin_1.writeData)(filePath, JSON.stringify(customerList, null, 3));
    return newCustomer;
};
exports.createCustomer = createCustomer;
const updateCustomer = (data) => {
    const { fullname, email, gender, phone, address, notes } = data;
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let index = customerList.findIndex((customer) => customer.email === email);
    if (!customerList[index]) {
        throw new Error('No Such Customer in the Database');
    }
    customerList[index].fullname = fullname;
    customerList[index].email = email;
    customerList[index].gender = gender;
    customerList[index].phone = phone;
    customerList[index].address = address;
    customerList[index].notes = notes;
    (0, admin_1.writeData)(filePath, JSON.stringify(customerList, null, 3));
    return customerList[index];
};
exports.updateCustomer = updateCustomer;
const updateCustomerByEmail = (data) => {
    const { fullname, email, gender, phone, address, notes } = data;
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let index = customerList.findIndex((customer) => customer.email === email);
    if (!customerList[index]) {
        throw new Error('No Such Customer in the Database');
    }
    customerList[index].fullname = fullname;
    customerList[index].email = email;
    customerList[index].gender = gender;
    customerList[index].phone = phone;
    customerList[index].address = address;
    customerList[index].notes = notes;
    (0, admin_1.writeData)(filePath, JSON.stringify(customerList, null, 3));
    return customerList[index];
};
exports.updateCustomerByEmail = updateCustomerByEmail;
const deleteCustomer = (data) => {
    const email = data;
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let index = customerList.findIndex((customer) => customer.email === email);
    if (!customerList[index]) {
        throw new Error('No Such Customer in the Database');
    }
    const deletedCustomer = customerList[index];
    customerList.splice(index, 1);
    (0, admin_1.writeData)(filePath, JSON.stringify(customerList, null, 3));
    return deletedCustomer;
};
exports.deleteCustomer = deleteCustomer;
const deleteCustomerByEmail = (data) => {
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let index = customerList.findIndex((customer) => customer.email === data);
    if (!customerList[index]) {
        throw new Error('No Such Customer in the Database');
    }
    const deletedCustomer = customerList[index];
    customerList.splice(index, 1);
    (0, admin_1.writeData)(filePath, JSON.stringify(customerList, null, 3));
    return deletedCustomer;
};
exports.deleteCustomerByEmail = deleteCustomerByEmail;
const fetchCustomer = (data) => {
    const email = data;
    const customerList = JSON.parse((0, admin_1.readData)(filePath));
    let index = customerList.findIndex((customer) => customer.email === email);
    if (!customerList[index]) {
        throw new Error('No Such Customer in the Database');
    }
    const customer = customerList[index];
    return customer;
};
exports.fetchCustomer = fetchCustomer;
//# sourceMappingURL=userServices.js.map