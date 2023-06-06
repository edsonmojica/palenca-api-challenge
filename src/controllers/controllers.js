"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.postLogin = exports.getRoot = void 0;
var validator_1 = require("validator");
var data_1 = require("../data/data");
// GET /
var getRoot = function (req, res) {
    res.send('Hello Palenca');
};
exports.getRoot = getRoot;
// POST /uber/login
var postLogin = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!validator_1.default.isEmail(email)) {
        var response = {
            message: 'INVALID_EMAIL',
            details: 'Email is not valid',
        };
        res.status(400).json(response);
        return;
    }
    if (password.length <= 5) {
        var response = {
            message: 'INVALID_PASSWORD',
            details: 'Password must be more than 5 characters',
        };
        res.status(400).json(response);
        return;
    }
    if (email === 'pierre@palenca.com' && password === 'MyPwdChingon123') {
        var access_token = 'cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5';
        var response = {
            message: 'SUCCESS',
            access_token: access_token,
        };
        res.status(200).json(response);
    }
    else {
        var response = {
            message: 'CREDENTIALS_INVALID',
            details: 'Incorrect username or password',
        };
        res.status(401).json(response);
    }
};
exports.postLogin = postLogin;
// GET /uber/profile/:access_token
var getProfile = function (req, res) {
    var access_token = req.params.access_token;
    // Verificar si el access_token existe en la base de datos de perfiles
    if (access_token in data_1.default) {
        var profile = data_1.default[access_token];
        var response = {
            message: 'SUCCESS',
            platform: 'uber',
            profile: profile,
        };
        res.json(response);
    }
    else {
        var response = {
            message: 'Invalid access token',
        };
        res.status(401).json(response);
    }
};
exports.getProfile = getProfile;
