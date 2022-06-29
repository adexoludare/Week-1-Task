"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateNewUser = (req, res, next) => {
    let { email, password, repeat_password } = req.body;
    const schema = joi_1.default.object({
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: joi_1.default.ref('password'),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
    });
    const { error, value } = schema.validate({ email, password, repeat_password });
    if (error) {
        console.log(error);
        return res.render('error', { error: error });
    }
    const salt = bcrypt_1.default.genSaltSync(Number(env_1.saltRounds));
    const hash = bcrypt_1.default.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next();
};
const validateUser = (req, res, next) => {
    let { email, password } = req.body;
    const schema = joi_1.default.object({
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
    });
    const { error, value } = schema.validate({ email, password });
    if (error) {
        console.log(error);
        // return res.render('error', {error: error})
        throw new Error(error.message);
    }
    // const salt = bcrypt.genSaltSync(Number(saltRounds));
    // const hash = bcrypt.hashSync(value.password, salt);
    // req.body.password = hash;
    else {
        req.body.email = value.email;
        next();
    }
};
const generateToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, `${env_1.JWT_SECRET}`, {
        expiresIn: "5h"
    });
};
exports.generateToken = generateToken;
const validateToken = (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.cookies.token, `${env_1.JWT_SECRET}`);
        if (decoded) {
            next();
        }
        ;
    }
    catch (err) {
        throw new Error('No permission');
        // res.render('error', {error: err})
    }
};
exports.validateToken = validateToken;
exports.default = { validateNewUser, validateUser, validateToken: exports.validateToken };
//# sourceMappingURL=validateUserData.js.map