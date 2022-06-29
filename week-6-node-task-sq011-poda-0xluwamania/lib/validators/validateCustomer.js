"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateNewCustomer = (req, res, next) => {
    let { fullname, email, gender, phone, address, notes } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } }),
        fullname: joi_1.default.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        gender: joi_1.default.string()
            .min(1)
            .required(),
        phone: joi_1.default.number()
            .min(10)
            .required(),
        address: joi_1.default.ref('fullname'),
        // notes: Joi.string()
        //         .alphanum()
    });
    const { error, value } = schema.validate({ fullname, gender, phone, address, email });
    if (error) {
        // console.log(error)
        // return res.render('error', {error: error.message})
        throw new Error(error.message);
    }
    req.body.email = value.email;
    next();
};
exports.default = { validateNewCustomer };
//# sourceMappingURL=validateCustomer.js.map