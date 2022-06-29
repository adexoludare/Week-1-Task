import { Response, Request, NextFunction } from "express";
import Joi, { string } from 'joi';
import bcrypt from "bcrypt"
import { saltRounds, JWT_SECRET } from "../env";
import jwt from "jsonwebtoken";
import { nextTick } from "process";


const validateNewUser = (req: Request, res: Response, next: NextFunction)=>{
    let {email, password, repeat_password} = req.body;

    const schema = Joi.object({
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        repeat_password: Joi.ref('password'),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
    })
    const {error, value} = schema.validate({email, password,repeat_password})
    if(error){
        console.log(error)
        return res.render('error', {error: error})
    }

    const salt = bcrypt.genSaltSync(Number(saltRounds));
    const hash = bcrypt.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next()
}

const validateUser = (req: Request, res: Response, next: NextFunction)=>{
    let {email, password} = req.body;

    const schema = Joi.object({
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
    })
    const {error, value} = schema.validate({email, password})
    if(error){
        console.log(error)
        // return res.render('error', {error: error})
        throw new Error (error.message)
    }

    // const salt = bcrypt.genSaltSync(Number(saltRounds));
    // const hash = bcrypt.hashSync(value.password, salt);
    // req.body.password = hash;
    else{req.body.email = value.email;
    next()
    }
}
export const generateToken = (email: string)=>{
    return jwt.sign({email}, `${JWT_SECRET}`, {
        expiresIn: "5h"
    })
}

export const validateToken = (req: Request,  res: Response, next: NextFunction)=>{
    try {
        const decoded = jwt.verify(req.cookies.token, `${JWT_SECRET}`);
        if(decoded){
            next()
        };
      } catch(err) {
        throw new Error('No permission')
        // res.render('error', {error: err})
      }
}
export default {validateNewUser, validateUser, validateToken}
