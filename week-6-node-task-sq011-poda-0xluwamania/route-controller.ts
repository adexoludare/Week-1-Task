import {Request, Response, NextFunction}  from 'express';
import path from 'path';
// const app = express();
import { Icustomer } from "./interface"
import fs from 'fs'
import { IncomingMessage, ServerResponse } from 'http';
let customers: Icustomer[]

fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
  if(err){
      console.log(err)
      return  err
     
    } 
    else customers = JSON.parse(data);
})

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
const createCustomer = (req: Request,res: Response) => {
//  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//         return res.render('error')
//       } 
//       else customers = JSON.parse(data);
// })
  const { fullname ,email, gender, phone,address, notes } = req.body;   // get all the details from the form coming in a post request at '/'
  let newCustomer: Icustomer = {
      fullname: '',
      email: '',
      gender: '',
      phone: '',
      address: ''
  }
  newCustomer.address = address;
  newCustomer.fullname = fullname;
  newCustomer.gender = gender;
  newCustomer.phone = phone;
  newCustomer.notes = notes;
  let emails: string[] = customers.map((c: Icustomer) => c.email)
  if(!emails.includes(email)){
    customers.push(newCustomer);
    fs.writeFile(path.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err)=>{
        if(err){
            return res.status(400).json({ success: false, msg: 'Could Not Write to Database' })
        }
        else {
           return res.render('/get_customer', {data: customers, title: 'Create Customer'});
            
        }
    })
  }
  else{
    return res.render('/create_customer_valid', {title: 'Create Customer'})
  }
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: 'please provide name value' })
//   }
//   res.status(201).send({ success: true, person: name })
}

const updateCustomer = (req: Request,res: Response) => {
    // let customers: Icustomer[];
  const { fullname ,email, gender, phone,address, notes } = req.body;   // get all the details from the form coming in a post request at '/'

//  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//       } 
//       else customers = JSON.parse(data);
//     })
    // const {email} = req.body.email;   // get all the details from the form coming in a post request at '/'
    let index = customers.findIndex((c: Icustomer) =>{
        c.email === email
    })
    if(index){
      customers[index].fullname = fullname;
      customers[index].gender = gender;
      customers[index].phone = phone;
      customers[index].address = address;
      customers[index].notes = notes;
          fs.writeFile(path.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err)=>{
              if(err){
                  return res.status(400).json({ success: false, msg: 'Could Not Write to Database' })
              }
              else {
                  return res.render('/get_customer', {data: customers, title: 'Update Customer'});//html of customers showing emailed customer has been deleted
              }
          })
    }
    else {
      res.render('/updateCustomer', {title: "Update Customer Page"})
    }
    }

    const deleteCustomer = (req: Request,res: Response) => {
      // let customers: Icustomer[];
  //  fs.readFile(path.resolve(__dirname, './database.json'), 'utf-8', (err, data) => {
  //     if(err){
  //         console.log(err)
  //         let errorD = 'Cannot read Database'
  //         return res.render('error', {error: errorD})
  //       } 
  //       else customers = JSON.parse(data);
  //     })
      const {email} = req.body.email;   // get all the details from the form coming in a post request at '/'
      let index = customers.findIndex((c: Icustomer) =>{
          c.email === email
      })
      if(index){
        customers.splice(index, 1)
           fs.writeFile(path.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err)=>{
               if(err){
                   // return res.status(400).json({ success: false, msg: 'Could Not Write to Database' })
                   return res.render('error', {error: err})
               }
               else {
                   return res.render('/get_customer', {data: customers, title: 'Delete Customer'});//html of customers showing emailed customer has been deleted
               }
           })
      }
      else {
        return res.render('/deleteCustomer', {title: "Delete Customer Page"})
      }
      }
  //   if (!name) {
  //     return res
  //       .status(400)
  //       .json({ success: false, msg: 'please provide name value' })
  //   }
  //   res.status(201).send({ success: true, person: name })
//   }



const getLoginPage = ( function(req:Request, res: Response, next: NextFunction){
  res.render('login', {title: "Login"})
})




const getCustomer = ( function(req:Request, res: Response, next: NextFunction){
  let {email} = req.params
  let index = customers.findIndex((c: Icustomer) =>{
    c.email === email
})
let customer: Icustomer = customers[index]
if(!customer){
  return res.render('error', {error: 'Cannot find Customer with email in database'})
}
  res.render('getCustomer', {title: "Customer Page", data: customer})
})



const getCustomerPage = ((req: Request, res: Response, next: NextFunction) =>{
  if(customers.length < 1){
    return res.render('error', {error: 'Database of Customers Empty'})
  }
    else res.render('get_customer', {data: customers, title: 'Get Customer'})
})



const deleteCustomerByEmail = ((req: Request, res: Response,next: NextFunction)=> {
  let {email} = req.params;
  let index = customers.findIndex((c: Icustomer) =>{
    c.email === email
})
if(!index){
  return res.render('error', {error: 'No user with such email available in the Database', title: 'error'})}
  else {
customers.splice(index, 1)
fs.writeFile(path.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err)=>{
  if(err){
    return res.render('error', {error: 'Could Not Write to Database', title: 'Error'})
  }
  else {
      return res.render('/get_customer', {data: customers, title: 'get customer'});//html of customers showing emailed customer has been deleted
  }
})
  }

})



const updateCustomerByEmail = ((req: Request, res: Response, next: NextFunction)=>{
  let {email} = req.params;
  let {fullname, gender,phone,address,notes} = req.body
  let index = customers.findIndex((c: Icustomer) =>{
    c.email === email
})
customers[index].fullname = fullname;
  customers[index].gender = gender;
  customers[index].phone = phone;
  customers[index].address = address;
  customers[index].notes = notes;
      fs.writeFile(path.join(__dirname, '.database.json'), JSON.stringify(customers, null, 3), 'utf8', (err)=>{
          if(err){
            return res.render('error', {error: 'Could Not Write to Database', title: "Create Customer Page"})
          }
          else {
              return res.render('/get_customer', {data: customers, title: "Create Customer Page"});//html of customers showing emailed customer has been deleted
          }
      })
})

const getCreateCustomer = ((req: Request, res: Response, next: NextFunction) => {
  return res.render('/create_customer', {title: "Create Customer Page"})
})

const getDeleteCustomer = ((req: Request, res: Response, next: NextFunction) => {
  return res.render('/deleteCustomer', {title: "Delete Customer Page"})
})
const getUpdateCustomer = ((req: Request, res: Response, next: NextFunction) => {
  return res.render('/updateteCustomer', {title: "Update Customer Page"})
})


export {
 createCustomer,
 deleteCustomer,
 updateCustomer,
 getLoginPage,
 getCustomer,
 getCustomerPage,
 deleteCustomerByEmail,
 updateCustomerByEmail,
 getCreateCustomer,
 getDeleteCustomer,
 getUpdateCustomer
}