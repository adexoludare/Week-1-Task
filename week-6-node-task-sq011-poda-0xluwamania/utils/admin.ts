import fs from 'fs';
import path from 'path';

export const readData = (filePath: string) => {
    try{
        let data = fs.readFileSync(filePath, 'utf8')
        return data;
    }
    catch {
        fs.writeFile(filePath, '[]', (err)=>{
            if(err){
                return err;
            }
        });
        let data = fs.readFileSync(filePath, 'utf8')
        return data;
    } 
}

export const writeData = (filePath: string, data: string)=>{
    try {
        fs.writeFile(filePath, data,(err)=>{
            if(err){
                return err;
            }
        })
    }
    catch(error){
        return error;
    }
}
