import { resolveSoa } from "dns";
import { Request, Response, NextFunction } from "express";
import {createAdmin, loginFunction} from '../services/adminServices'
import { readData } from "../utils/admin";
import path from 'path'
import { string } from "joi";



export const createAdminController = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const filePath = path.resolve(__dirname, '../admin.json')
        const result = createAdmin(req.body)
        const token = req.cookies.token
       
        next();
    } catch (error) {
        console.log(error)
        return res.render('error', {error, title: 'Error Page'})
    }
}
export const getRegisterPage = (req: Request, res: Response, next: NextFunction)=>{
    return res.render('newUser', {title: 'Registration'})
}

export const loginController = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const token = await loginFunction(req.body);
        if(token === undefined){
            return res.render('error', {error: "username or password incorrect"})
        }
        res.cookie('token', token)
        return res.render('home', {title: 'Registration'})  
       
    } catch (error) {
        res.render('error', {error})
    }
   
}
export const getHomepage = (req: Request, res: Response)=>{
    try{
        return res.render('home');
    }
    catch(err){
        console.log(err)
    }
}
export const LogoutController = (req: Request, res: Response)=>{
    res.cookie('token', '');
    return res.render('login');
}