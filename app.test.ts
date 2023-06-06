import request from 'supertest';
import express from 'express';
import router from './src/routes/routes';

const app = express();
app.use(express.json());
app.use(router);

describe('app tests', () => {
  describe('POST /uber/login', () => {
    it('responds with 200 and a success message for a valid email and password', async () => {
      const response = await request(app)
        .post('/uber/login')
        .send({ email: 'pierre@palenca.com', password: 'MyPwdChingon123' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('SUCCESS');
      expect(response.body.access_token).toBeTruthy();
    });

    it('responds with 400 and an error message for an invalid email', async () => {
      const response = await request(app)
        .post('/uber/login')
        .send({ email: 'invalid_email', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('INVALID_EMAIL');
      expect(response.body.details).toBe('Email is not valid');
    });

    it('responds with 400 and an error message for a password with less than 6 characters', async () => {
      const response = await request(app)
        .post('/uber/login')
        .send({ email: 'valid_email@example.com', password: '12345' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('INVALID_PASSWORD');
      expect(response.body.details).toBe(
        'Password must be more than 5 characters'
      );
    });

    it('responds with 401 and an error message for an incorrect email or password', async () => {
      const response = await request(app).post('/uber/login').send({
        email: 'incorrect_email@example.com',
        password: 'incorrect_password',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('CREDENTIALS_INVALID');
      expect(response.body.details).toBe('Incorrect username or password');
    });
  });

  describe('GET /uber/profile/:access_token', () => {
    it('responds with 200 and the user profile for a valid access token', async () => {
      const response = await request(app).get(
        '/uber/profile/cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5'
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('SUCCESS');
      expect(response.body.platform).toBe('uber');
      expect(response.body.profile).toBeTruthy();
    });

    it('responds with 401 and an error message for an invalid access token', async () => {
      const response = await request(app).get(
        '/uber/profile/invalid_access_token'
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid access token');
    });
  });

  describe('GET /', () => {
    it('responds with Hello Palenca', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello Palenca');
    });
  });
});
