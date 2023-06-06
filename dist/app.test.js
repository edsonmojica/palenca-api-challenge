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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
describe('app tests', () => {
    describe('POST /uber/login', () => {
        it('responds with 200 and a success message for a valid email and password', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/uber/login')
                .send({ email: 'pierre@palenca.com', password: 'MyPwdChingon123' });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('SUCCESS');
            expect(response.body.access_token).toBeTruthy();
        }));
        it('responds with 400 and an error message for an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/uber/login')
                .send({ email: 'invalid_email', password: 'password' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('INVALID_EMAIL');
            expect(response.body.details).toBe('Email is not valid');
        }));
        it('responds with 400 and an error message for a password with less than 6 characters', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/uber/login')
                .send({ email: 'valid_email@example.com', password: '12345' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('INVALID_PASSWORD');
            expect(response.body.details).toBe('Password must be more than 5 characters');
        }));
        it('responds with 401 and an error message for an incorrect email or password', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/uber/login').send({
                email: 'incorrect_email@example.com',
                password: 'incorrect_password',
            });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('CREDENTIALS_INVALID');
            expect(response.body.details).toBe('Incorrect username or password');
        }));
    });
    describe('GET /uber/profile/:access_token', () => {
        it('responds with 200 and the user profile for a valid access token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/uber/profile/cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('SUCCESS');
            expect(response.body.platform).toBe('uber');
            expect(response.body.profile).toBeTruthy();
        }));
        it('responds with 401 and an error message for an invalid access token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/uber/profile/invalid_access_token');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid access token');
        }));
    });
    describe('GET /', () => {
        it('responds with Hello Palenca', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello Palenca');
        }));
    });
});
//# sourceMappingURL=app.test.js.map