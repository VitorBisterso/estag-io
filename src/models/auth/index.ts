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
