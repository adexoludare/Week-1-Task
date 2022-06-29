import {Icustomer} from '../interface'
import path from 'path'
import {readData, writeData} from "../utils/admin"
const filePath = path.resolve(__dirname, '../database.json')

export const createCustomer = (data: Icustomer)=>{
    const { fullname ,email, gender, phone,address, notes } = data;
    const customerList: Icustomer[] = JSON.parse(readData(filePath))
    let customerExist = customerList.find((customer)=> customer.email === email)
    if(customerExist){
        throw new Error('User Already Exist')
    }
    const newCustomer: Icustomer = { fullname ,email, gender, phone,address, notes }
    newCustomer.fullname = fullname;
    newCustomer.email = email;
    newCustomer.gender = gender;
    newCustomer.phone = phone;
    newCustomer.address = address;
    newCustomer.notes = notes; 
    customerList.push(newCustomer);
    writeData(filePath, JSON.stringify(customerList, null, 3));
    return newCustomer;
}

export const updateCustomer = (data: Icustomer) => {
    const { fullname ,email, gender, phone,address, notes } = data;
    const customerList: Icustomer[] = JSON.parse(readData(filePath))
    let index = customerList.findIndex((customer)=> customer.email === email)
    if(!customerList[index]){
        throw new Error('No Such Customer in the Database')
    }
    customerList[index].fullname = fullname;
    customerList[index].email = email;
    customerList[index].gender = gender;
    customerList[index].phone = phone;
    customerList[index].address = address;
    customerList[index].notes = notes; 
    writeData(filePath, JSON.stringify(customerList, null, 3));
    return customerList[index];
}

export const updateCustomerByEmail = (data: Icustomer) => {
    const { fullname ,email, gender, phone,address, notes } = data;
    const customerList: Icustomer[] = JSON.parse(readData(filePath))
    let index = customerList.findIndex((customer)=> customer.email === email)
    if(!customerList[index]){
        throw new Error('No Such Customer in the Database')
    }
    customerList[index].fullname = fullname;
    customerList[index].email = email;
    customerList[index].gender = gender;
    customerList[index].phone = phone;
    customerList[index].address = address;
    customerList[index].notes = notes; 
    writeData(filePath, JSON.stringify(customerList, null, 3));
    return customerList[index];
}

export const deleteCustomer = (data: string) => {
    const email = data;
    const customerList: Icustomer[] = JSON.parse(readData(filePath));
    let index = customerList.findIndex((customer)=> customer.email === email);
    if(!customerList[index]){
        throw new Error('No Such Customer in the Database')
    }
    const deletedCustomer: Icustomer = customerList[index] 
    customerList.splice(index, 1);
    writeData(filePath, JSON.stringify(customerList, null, 3));
    return deletedCustomer;
}

export const deleteCustomerByEmail = (data: string) => {
    const customerList: Icustomer[] = JSON.parse(readData(filePath));
    let index = customerList.findIndex((customer)=> customer.email === data);
    if(!customerList[index]){
        throw new Error('No Such Customer in the Database')
    }
    const deletedCustomer: Icustomer = customerList[index] 
    customerList.splice(index, 1);
    writeData(filePath, JSON.stringify(customerList, null, 3));
    return deletedCustomer;
}

export const fetchCustomer = (data: string) => {
    const email = data;
    const customerList: Icustomer[] = JSON.parse(readData(filePath));
    let index = customerList.findIndex((customer)=> customer.email === email);
    if(!customerList[index]){
        throw new Error('No Such Customer in the Database')
    }
    const customer: Icustomer = customerList[index];
    return customer;
}