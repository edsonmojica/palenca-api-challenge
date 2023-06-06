// Login interfaces
interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponseSuccess {
  message: 'SUCCESS';
  access_token: string;
}

interface LoginResponseError {
  message: 'CREDENTIALS_INVALID';
  details: string;
}

// Profile interfaces
interface Profile {
  country: string;
  city_name: string;
  worker_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_prefix: string;
  phone_number: string;
  rating: string;
  lifetime_trips: number;
}

interface UberProfileResponse {
  message: 'SUCCESS';
  platform: 'uber';
  profile: Profile;
}

interface ErrorResponse {
  message: string;
}

export {
  LoginRequestBody,
  LoginResponseSuccess,
  LoginResponseError,
  Profile,
  UberProfileResponse,
  ErrorResponse,
};
