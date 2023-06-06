"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = require("../routes/routes");
var cors_1 = require("cors");
var Server = /** @class */ (function () {
    function Server() {
        this.apiPaths = {
            root: '/',
            login: '/uber/login',
            profile: '/uber/profile/:access_token',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }
    Server.prototype.middlewares = function () {
        // CORS
        this.app.use((0, cors_1.default)());
        // Body parsing
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        this.app.use(this.apiPaths.root, routes_1.default);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server running on port ".concat(_this.port));
        });
    };
    return Server;
}());
exports.default = Server;
