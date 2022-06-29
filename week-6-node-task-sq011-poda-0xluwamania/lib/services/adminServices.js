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
exports.loginFunction = exports.createAdmin = void 0;
const path_1 = __importDefault(require("path"));
const admin_1 = require("../utils/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validateUserData_1 = require("../validators/validateUserData");
const filePath = path_1.default.resolve(__dirname, "../admin.json");
const createAdmin = (data) => {
    const adminList = JSON.parse((0, admin_1.readData)(filePath));
    console.log(adminList);
    let userExist = adminList.find((admin) => admin.email === data.email);
    if (userExist) {
        throw new Error('User Already Exist');
    }
    adminList.push({ email: data.email, password: data.password });
    (0, admin_1.writeData)(filePath, JSON.stringify(adminList, null, 3));
    console.log(adminList);
    return ({ email: data.email, password: data.password });
};
exports.createAdmin = createAdmin;
const loginFunction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const adminList = JSON.parse((0, admin_1.readData)(filePath));
    const admin = adminList.find((admin) => admin.email === email);
    if (!admin) {
        throw new Error('User does not Exist');
    }
    let truthy = yield bcrypt_1.default.compare(password, admin.password);
    console.log(truthy);
    if (truthy) {
        const token = (0, validateUserData_1.generateToken)(email);
        return token;
    }
    throw new Error("Username or Password Incorrect");
});
exports.loginFunction = loginFunction;
//# sourceMappingURL=adminServices.js.map