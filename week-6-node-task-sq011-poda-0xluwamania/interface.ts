interface Icustomer {
    fullname: string,
    email: string, 
    gender: string,
    phone: string,
    address: string,
    notes ?: string
  }
  interface Iadmin {
   
        "email": string,
        "password": string
    
  }
  interface Iuser {
      "email": string,
      "password": string,
      "repeat_password": string
  }
  export {Icustomer, Iadmin, Iuser}