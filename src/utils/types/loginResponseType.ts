export interface LoginUserType {
  access_token: string
  created_at: Date
  email: string
  email_verified_at: Date
  id: number
  name: string
  updated_at: Date
}

export interface LoginResponseType {
  data: LoginUserType
  message: string
}
