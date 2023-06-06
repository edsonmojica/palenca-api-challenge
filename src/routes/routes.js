"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers/controllers");
var router = (0, express_1.Router)();
router.get('/', controllers_1.getRoot);
router.post('/uber/login', controllers_1.postLogin);
router.get('/uber/profile/:access_token', controllers_1.getProfile);
exports.default = router;
