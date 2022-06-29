"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizer = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let admin;
fs_1.default.readFile(path_1.default.resolve(__dirname, './admin.json'), 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        // return res.render('error', {error: err})
    }
    else
        admin = JSON.parse(data);
});
const authorizer = (req, res, next) => {
    let username = req.body.email;
    let password = req.body.password;
    let repeat_password = req.body.repeat_password;
    if (username === admin[0].email && password === admin[0].password) {
        return next();
    }
    else if (password !== repeat_password) {
        return res.render('login_password', { title: 'Login' });
    }
};
exports.authorizer = authorizer;
const register = ((req, res, next) => {
    let { email, password, repeat_password } = req.body;
});
//# sourceMappingURL=authorization.js.map