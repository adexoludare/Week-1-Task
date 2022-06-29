import { Response, Request, NextFunction } from "express";
import Joi from 'joi';
import bcrypt from "bcrypt"
import { saltRounds } from "../env";

const validateNewCustomer = (req: Request, res: Response, next: NextFunction)=>{
    let { fullname ,email, gender, phone,address, notes } = req.body;

    const schema = Joi.object({
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } }),
        fullname: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        gender: Joi.string()
                .min(1)
                .required(),
        phone: Joi.number()
                   .min(10) 
                   .required(),
        address: Joi.ref('fullname'),
        // notes: Joi.string()
        //         .alphanum()
    })
    const {error, value} = schema.validate({fullname, gender, phone, address, email})
    if(error){
        // console.log(error)
        // return res.render('error', {error: error.message})
        throw new Error(error.message)
    }

    req.body.email = value.email;
    next()
}
export default {validateNewCustomer}