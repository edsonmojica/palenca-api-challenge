"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getRoot);
router.post('/uber/login', controllers_1.postLogin);
router.get('/uber/profile/:access_token', controllers_1.getProfile);
exports.default = router;
//# sourceMappingURL=routes.js.map