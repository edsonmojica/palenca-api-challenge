import request from 'supertest';
import { getRoot, postLogin, getProfile } from './src/controllers/controllers';
import express from 'express';

const app = express();
app.get('/', getRoot);
app.post('/uber/login', postLogin);
app.get('/uber/profile/:access_token', getProfile);

describe('GET /', () => {
  it('should return "Hello Palenca"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Palenca');
  });
});

describe('POST /uber/login', () => {
  it('should return a success response with access_token', async () => {
    const response = await request(app)
      .post('/uber/login')
      .send({ email: 'pierre@palenca.com', password: 'MyPwdChingon123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'SUCCESS');
    expect(response.body).toHaveProperty('access_token');
  });

  it('should return an error response for invalid email', async () => {
    const response = await request(app)
      .post('/uber/login')
      .send({ email: 'invalidemail', password: 'MyPwdChingon123' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'INVALID_EMAIL');
  });

  it('should return an error response for invalid password', async () => {
    const response = await request(app)
      .post('/uber/login')
      .send({ email: 'pierre@palenca.com', password: '123' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'INVALID_PASSWORD');
  });

  it('should return an error response for incorrect credentials', async () => {
    const response = await request(app)
      .post('/uber/login')
      .send({ email: 'test@test.com', password: 'password123' });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'CREDENTIALS_INVALID');
  });
});

describe('GET /uber/profile/:access_token', () => {
  it('should return the profile for a valid access_token', async () => {
    const response = await request(app).get(
      '/uber/profile/cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'SUCCESS');
    expect(response.body).toHaveProperty('platform', 'uber');
    expect(response.body).toHaveProperty('profile');
  });

  it('should return an error response for an invalid access_token', async () => {
    const response = await request(app).get('/uber/profile/invalid_token');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid access token');
  });
});
