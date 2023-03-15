export type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

export type CreateMemberResponse = {
  message: string
  error: string
}
