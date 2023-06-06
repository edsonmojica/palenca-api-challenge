"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.postLogin = exports.getRoot = void 0;
const validator_1 = __importDefault(require("validator"));
const data_1 = __importDefault(require("../data/data"));
// GET /
const getRoot = (req, res) => {
    res.send('Hello Palenca');
};
exports.getRoot = getRoot;
// POST /uber/login
const postLogin = (req, res) => {
    const { email, password } = req.body;
    if (!validator_1.default.isEmail(email)) {
        const response = {
            message: 'INVALID_EMAIL',
            details: 'Email is not valid',
        };
        res.status(400).json(response);
        return;
    }
    if (password.length <= 5) {
        const response = {
            message: 'INVALID_PASSWORD',
            details: 'Password must be more than 5 characters',
        };
        res.status(400).json(response);
        return;
    }
    if (email === 'pierre@palenca.com' && password === 'MyPwdChingon123') {
        const access_token = 'cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5';
        const response = {
            message: 'SUCCESS',
            access_token: access_token,
        };
        res.status(200).json(response);
    }
    else {
        const response = {
            message: 'CREDENTIALS_INVALID',
            details: 'Incorrect username or password',
        };
        res.status(401).json(response);
    }
};
exports.postLogin = postLogin;
// GET /uber/profile/:access_token
const getProfile = (req, res) => {
    const { access_token } = req.params;
    // Verificar si el access_token existe en la base de datos de perfiles
    if (access_token in data_1.default) {
        const profile = data_1.default[access_token];
        const response = {
            message: 'SUCCESS',
            platform: 'uber',
            profile: profile,
        };
        res.json(response);
    }
    else {
        const response = {
            message: 'Invalid access token',
        };
        res.status(401).json(response);
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=controllers.js.map