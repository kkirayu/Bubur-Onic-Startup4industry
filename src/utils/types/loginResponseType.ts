export interface LoginResponseType {
  data: {
    access_token: string
    created_at: Date
    email: string
    email_verified_at: Date
    id: number
    name: string
    updated_at: Date
  }
  message: string
}
