"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateCustomer = exports.getDeleteCustomer = exports.getCreateCustomer = exports.updateCustomerByEmail = exports.deleteCustomerByEmail = exports.getCustomerPage = exports.getCustomer = exports.getLoginPage = exports.updateCustomer = exports.deleteCustomer = exports.createCustomer = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let customers;
fs_1.default.readFile(path_1.default.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return err;
    }
    else
        customers = JSON.parse(data);
});
// let customers: Icustomer[];
//  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//       } 
//       else customers = JSON.parse(data);
// })
//need to confirm res and req data type for functions in express
//how to deploy public in the app.get of '/' ==> return '/customer' after succesful login
// '/' customer should have a createCustomer link which displays a form of the customer details and has a submit button which triggers app.post of '/createCustomer'
//deploy createCustomer() in app.post of '/createCustomer' ==> returns '/customer'
//deploy deleteCustomer() in app.post of '/customer/email' using the customer.email parameter to check customer and splice it ==> returns '/customer'
const createCustomer = (req, res) => {
    //  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
    //     if(err){
    //         console.log(err)
    //         return res.render('error')
    //       } 
    //       else customers = JSON.parse(data);
    // })
    const { fullname, email, gender, phone, address, notes } = req.body; // get all the details from the form coming in a post request at '/'
    let newCustomer = {
        fullname: '',
        email: '',
        gender: '',
        phone: '',
        address: ''
    };
    newCustomer.address = address;
    newCustomer.fullname = fullname;
    newCustomer.gender = gender;
    newCustomer.phone = phone;
    newCustomer.notes = notes;
    let emails = customers.map((c) => c.email);
    if (!emails.includes(email)) {
        customers.push(newCustomer);
        fs_1.default.writeFile(path_1.default.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err) => {
            if (err) {
                return res.status(400).json({ success: false, msg: 'Could Not Write to Database' });
            }
            else {
                return res.render('/get_customer', { data: customers, title: 'Create Customer' });
            }
        });
    }
    else {
        return res.render('/create_customer_valid', { title: 'Create Customer' });
    }
    //   if (!name) {
    //     return res
    //       .status(400)
    //       .json({ success: false, msg: 'please provide name value' })
    //   }
    //   res.status(201).send({ success: true, person: name })
};
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => {
    // let customers: Icustomer[];
    const { fullname, email, gender, phone, address, notes } = req.body; // get all the details from the form coming in a post request at '/'
    //  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
    //     if(err){
    //         console.log(err)
    //       } 
    //       else customers = JSON.parse(data);
    //     })
    // const {email} = req.body.email;   // get all the details from the form coming in a post request at '/'
    let index = customers.findIndex((c) => {
        c.email === email;
    });
    if (index) {
        customers[index].fullname = fullname;
        customers[index].gender = gender;
        customers[index].phone = phone;
        customers[index].address = address;
        customers[index].notes = notes;
        fs_1.default.writeFile(path_1.default.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err) => {
            if (err) {
                return res.status(400).json({ success: false, msg: 'Could Not Write to Database' });
            }
            else {
                return res.render('/get_customer', { data: customers, title: 'Update Customer' }); //html of customers showing emailed customer has been deleted
            }
        });
    }
    else {
        res.render('/updateCustomer', { title: "Update Customer Page" });
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => {
    // let customers: Icustomer[];
    //  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
    //     if(err){
    //         console.log(err)
    //         let errorD = 'Cannot read Database'
    //         return res.render('error', {error: errorD})
    //       } 
    //       else customers = JSON.parse(data);
    //     })
    const { email } = req.body.email; // get all the details from the form coming in a post request at '/'
    let index = customers.findIndex((c) => {
        c.email === email;
    });
    if (index) {
        customers.splice(index, 1);
        fs_1.default.writeFile(path_1.default.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err) => {
            if (err) {
                // return res.status(400).json({ success: false, msg: 'Could Not Write to Database' })
                return res.render('error', { error: err });
            }
            else {
                return res.render('/get_customer', { data: customers, title: 'Delete Customer' }); //html of customers showing emailed customer has been deleted
            }
        });
    }
    else {
        return res.render('/deleteCustomer', { title: "Delete Customer Page" });
    }
};
exports.deleteCustomer = deleteCustomer;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: 'please provide name value' })
//   }
//   res.status(201).send({ success: true, person: name })
//   }
const getLoginPage = (function (req, res, next) {
    res.render('login', { title: "Login" });
});
exports.getLoginPage = getLoginPage;
const getCustomer = (function (req, res, next) {
    let { email } = req.params;
    let index = customers.findIndex((c) => {
        c.email === email;
    });
    let customer = customers[index];
    if (!customer) {
        return res.render('error', { error: 'Cannot find Customer with email in database' });
    }
    res.render('getCustomer', { title: "Customer Page", data: customer });
});
exports.getCustomer = getCustomer;
const getCustomerPage = ((req, res, next) => {
    if (customers.length < 1) {
        return res.render('error', { error: 'Database of Customers Empty' });
    }
    else
        res.render('get_customer', { data: customers, title: 'Get Customer' });
});
exports.getCustomerPage = getCustomerPage;
const deleteCustomerByEmail = ((req, res, next) => {
    let { email } = req.params;
    let index = customers.findIndex((c) => {
        c.email === email;
    });
    if (!index) {
        return res.render('error', { error: 'No user with such email available in the Database', title: 'error' });
    }
    else {
        customers.splice(index, 1);
        fs_1.default.writeFile(path_1.default.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err) => {
            if (err) {
                return res.render('error', { error: 'Could Not Write to Database', title: 'Error' });
            }
            else {
                return res.render('/get_customer', { data: customers, title: 'get customer' }); //html of customers showing emailed customer has been deleted
            }
        });
    }
});
exports.deleteCustomerByEmail = deleteCustomerByEmail;
const updateCustomerByEmail = ((req, res, next) => {
    let { email } = req.params;
    let { fullname, gender, phone, address, notes } = req.body;
    let index = customers.findIndex((c) => {
        c.email === email;
    });
    customers[index].fullname = fullname;
    customers[index].gender = gender;
    customers[index].phone = phone;
    customers[index].address = address;
    customers[index].notes = notes;
    fs_1.default.writeFile(path_1.default.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err) => {
        if (err) {
            return res.render('error', { error: 'Could Not Write to Database', title: "Create Customer Page" });
        }
        else {
            return res.render('/get_customer', { data: customers, title: "Create Customer Page" }); //html of customers showing emailed customer has been deleted
        }
    });
});
exports.updateCustomerByEmail = updateCustomerByEmail;
const getCreateCustomer = ((req, res, next) => {
    return res.render('/create_customer', { title: "Create Customer Page" });
});
exports.getCreateCustomer = getCreateCustomer;
const getDeleteCustomer = ((req, res, next) => {
    return res.render('/deleteCustomer', { title: "Delete Customer Page" });
});
exports.getDeleteCustomer = getDeleteCustomer;
const getUpdateCustomer = ((req, res, next) => {
    return res.render('/updateteCustomer', { title: "Update Customer Page" });
});
exports.getUpdateCustomer = getUpdateCustomer;
//# sourceMappingURL=route-controller.js.map