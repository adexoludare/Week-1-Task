
import {Iuser, Iadmin} from '../interface'
import path from 'path'
import {readData, writeData} from "../utils/admin"
import { getCustomerByEmailPage } from '../controllers/userController'
import bcrypt from "bcrypt"
import {generateToken} from "../validators/validateUserData"




const filePath: string = path.resolve(__dirname, "../admin.json")
export const createAdmin = (data: Iadmin) =>{
    const adminList: Iadmin[] = JSON.parse(readData(filePath));
    console.log(adminList);
    let userExist = adminList.find((admin)=> admin.email === data.email)
    if(userExist){
        throw new Error('User Already Exist')
    }
    adminList.push({email: data.email, password: data.password})
    writeData(filePath, JSON.stringify(adminList, null, 3));
    console.log(adminList)
    return ({email: data.email, password: data.password});
}

export const loginFunction = async (data: Iadmin)=>{
    const {email, password} = data;
    const adminList: Iadmin[] = JSON.parse(readData(filePath));
    const admin = adminList.find((admin) => admin.email === email);
    if(!admin){
        throw new Error('User does not Exist')
    }
    let truthy = await bcrypt.compare(password, admin.password);
    console.log(truthy)
    if(truthy){
        const token = generateToken(email);
        return token
    }
    throw new Error ("Username or Password Incorrect");
    
}

