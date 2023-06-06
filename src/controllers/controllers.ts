import express, { Request, Response } from 'express';
import validator from 'validator';
import {
  ErrorResponse,
  LoginRequestBody,
  LoginResponseError,
  LoginResponseSuccess,
  UberProfileResponse,
} from '../interfaces/interfaces';
import profiles from '../data/data';

// GET /
export const getRoot = (req: Request, res: Response) => {
  res.send('Hello Palenca');
};

// POST /uber/login
export const postLogin = (req: Request, res: Response) => {
  const { email, password } = req.body as LoginRequestBody;
  if (!validator.isEmail(email)) {
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
    const response: LoginResponseSuccess = {
      message: 'SUCCESS',
      access_token: access_token,
    };
    res.status(200).json(response);
  } else {
    const response: LoginResponseError = {
      message: 'CREDENTIALS_INVALID',
      details: 'Incorrect username or password',
    };
    res.status(401).json(response);
  }
};

// GET /uber/profile/:access_token
export const getProfile = (
  req: Request<{ access_token: string }>,
  res: Response<UberProfileResponse | ErrorResponse>
) => {
  const { access_token } = req.params;
  // Verificar si el access_token existe en la base de datos de perfiles
  if (access_token in profiles) {
    const profile = profiles[access_token];
    const response: UberProfileResponse = {
      message: 'SUCCESS',
      platform: 'uber',
      profile: profile,
    };
    res.json(response);
  } else {
    const response: ErrorResponse = {
      message: 'Invalid access token',
    };
    res.status(401).json(response);
  }
};
