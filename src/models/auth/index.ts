import { JwtPayload } from 'jwt-decode';

import { PROFILE_TYPE } from '@/store/states/profile';

export interface SignInParams {
   email: string;
   password: string;
}

export interface SignInResponse {
   accessToken: string;
   refreshToken: string;
}

export interface SignUpUserParams {
   email: string;
   password: string;
   name: string;
   birthday: string;
}

export interface SignUpCompanyParams {
   cnpj: string;
   email: string;
   password: string;
   name: string;
   phone: string;
}

export interface SignUpResponse {
   accessToken: string;
}

export interface AccessToken extends JwtPayload {
   email: string;
   exp: number;
   iat: number;
   sub: string;
   userType: PROFILE_TYPE;
}
