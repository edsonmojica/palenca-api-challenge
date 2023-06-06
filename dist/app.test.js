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
const supertest_1 = __importDefault(require("supertest"));
const controllers_1 = require("./src/controllers/controllers");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', controllers_1.getRoot);
app.post('/uber/login', controllers_1.postLogin);
app.get('/uber/profile/:access_token', controllers_1.getProfile);
describe('GET /', () => {
    it('should return "Hello Palenca"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello Palenca');
    }));
});
describe('POST /uber/login', () => {
    it('should return a success response with access_token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/uber/login')
            .send({ email: 'pierre@palenca.com', password: 'MyPwdChingon123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'SUCCESS');
        expect(response.body).toHaveProperty('access_token');
    }));
    it('should return an error response for invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/uber/login')
            .send({ email: 'invalidemail', password: 'MyPwdChingon123' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'INVALID_EMAIL');
    }));
    it('should return an error response for invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/uber/login')
            .send({ email: 'pierre@palenca.com', password: '123' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'INVALID_PASSWORD');
    }));
    it('should return an error response for incorrect credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/uber/login')
            .send({ email: 'test@test.com', password: 'password123' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'CREDENTIALS_INVALID');
    }));
});
describe('GET /uber/profile/:access_token', () => {
    it('should return the profile for a valid access_token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/uber/profile/cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'SUCCESS');
        expect(response.body).toHaveProperty('platform', 'uber');
        expect(response.body).toHaveProperty('profile');
    }));
    it('should return an error response for an invalid access_token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/uber/profile/invalid_token');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid access token');
    }));
});
//# sourceMappingURL=app.test.js.map