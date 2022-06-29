// import { IncomingMessage, ServerResponse } from "http";
import { Iadmin } from "./interface";
import path from 'path';
import fs from 'fs'
import {Request, Response, NextFunction} from 'express'

let admin: Iadmin[];
 fs.readFile(path.resolve(__dirname, './admin.json'), 'utf-8', (err, data) => {
    if(err){
        console.log(err)
        // return res.render('error', {error: err})
      } 
      else admin = JSON.parse(data);
})

const authorizer = (req: Request, res: Response, next: NextFunction) => {
    let username: string = req.body.email;
    let password: string = req.body.password;
    let repeat_password: string = req.body.repeat_password;
    if(username === admin[0].email && password === admin[0].password){
       return next();
    }
        else if(password !== repeat_password) {
           return res.render('login_password', {title: 'Login'})
        }    
}

const register = ((req: Request, res: Response, next: NextFunction)=>{
   let {email, password, repeat_password} = req.body;

})
export {authorizer}
