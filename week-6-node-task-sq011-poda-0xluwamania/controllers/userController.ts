
import { Request, Response, NextFunction } from "express";
import {createCustomer, updateCustomer, deleteCustomer, deleteCustomerByEmail, fetchCustomer, updateCustomerByEmail} from '../services/userServices'
import { readData } from "../utils/admin";
import path from 'path'
import { string } from "joi";



const filePath = path.resolve(__dirname, '../database.json')

export const createCustomerController = (req: Request, res: Response)=>{
    try {
        const token = req.cookies.token
        if(!token){
            const result = createCustomer(req.body)
            console.log(result)
            return res.render('createdCustomer', {data: result, title: 'Customers'})
        }
        // const customerList = JSON.parse(readData(filePath))
     
    } catch (error) {
        console.log(error);
        return res.render('error', {error, title: 'Error Page'})
    }
}

export const getRegisterCustomerPage = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.token;
    if(token){
        return res.render('create_customer', {title: 'Registration'})
    }
}

export const getCustomers = (req: Request, res: Response)=>{
    const customerList = JSON.parse(readData(filePath))
    return res.render('get_customer', {data: customerList})
}

export const getCustomerByEmailPage = (req: Request, res: Response)=>{
    console.log(req.params.email)
    const result = fetchCustomer(req.params.email)
    return res.render('getCustomerByEmail', {data: result})
}
export const getCustomerByEmailInBodyPage = (req: Request, res: Response)=>{
    console.log(req.body)
    const result = fetchCustomer(req.body.email)
    return res.render('getCustomerByEmail', {data: result})
}

export const getUpdateCustomerPage = (req: Request, res: Response, next: NextFunction)=>{
    return res.render('updateCustomer', {title: 'Update Customer'})
}
export const getUpdateCustomerByEmailPage = (req: Request, res: Response, next: NextFunction)=>{
    const result = fetchCustomer(req.params.email)
    console.log(req.params)
    return res.render('updateCustomerByEmail', {data: result, title: 'Update Customer'})
}

export const updateCustomerController = (req: Request, res: Response)=>{
    try {
        const result = updateCustomer(req.body)
        const customerList = JSON.parse(readData(filePath))
        console.log(result)
        return res.render('updatedCustomer', {data: result, title: 'Customers'})
    } catch (error) {
        return res.render('error', {error, title: 'Error Page'})
    }
}

export const updateCustomerByEmailController = (req: Request, res: Response)=>{
    try {
        const result = updateCustomer(req.body)
        const customerList = JSON.parse(readData(filePath))
        console.log(result)
        return res.render('updatedCustomer', {data: result, title: 'Customers'})
    } catch (error) {
        return res.render('error', {error, title: 'Error Page'})
    }
}

export const getDeleteCustomerPage = (req: Request, res: Response, next: NextFunction)=>{
    return res.render('deleteCustomer', {title: 'Delete Customer'})
}

export const deleteCustomerController = (req: Request, res: Response)=>{
    try {
        const result = deleteCustomer(req.body.email)
        const customerList = JSON.parse(readData(filePath))
        console.log(result)
        return res.render('deletedCustomer', {data: result, title: 'Customers'})
    } catch (error) {
        return res.render('error', {error, title: 'Error Page'})
    }
}
export const deleteCustomerByEmailController = (req: Request, res: Response)=>{
    try {
        const result = deleteCustomerByEmail(req.params.email)
        console.log(req.params.email)
        return res.render('deletedCustomer', {data: result, title: 'Customers'})
    } catch (error) {
        return res.render('error', {error, title: 'Error Page'})
    }
}