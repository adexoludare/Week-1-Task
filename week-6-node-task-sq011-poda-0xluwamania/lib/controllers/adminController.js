"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = exports.getHomepage = exports.loginController = exports.getRegisterPage = exports.createAdminController = void 0;
const adminServices_1 = require("../services/adminServices");
const path_1 = __importDefault(require("path"));
const createAdminController = (req, res, next) => {
    try {
        const filePath = path_1.default.resolve(__dirname, '../admin.json');
        const result = (0, adminServices_1.createAdmin)(req.body);
        const token = req.cookies.token;
        next();
    }
    catch (error) {
        console.log(error);
        return res.render('error', { error, title: 'Error Page' });
    }
};
exports.createAdminController = createAdminController;
const getRegisterPage = (req, res, next) => {
    return res.render('newUser', { title: 'Registration' });
};
exports.getRegisterPage = getRegisterPage;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, adminServices_1.loginFunction)(req.body);
        if (token === undefined) {
            return res.render('error', { error: "username or password incorrect" });
        }
        res.cookie('token', token);
        return res.render('home', { title: 'Registration' });
    }
    catch (error) {
        res.render('error', { error });
    }
});
exports.loginController = loginController;
const getHomepage = (req, res) => {
    try {
        return res.render('home');
    }
    catch (err) {
        console.log(err);
    }
};
exports.getHomepage = getHomepage;
const LogoutController = (req, res) => {
    res.cookie('token', '');
    return res.render('login');
};
exports.LogoutController = LogoutController;
//# sourceMappingURL=adminController.js.map