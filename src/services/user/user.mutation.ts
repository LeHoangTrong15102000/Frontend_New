import { useMutation } from '@tanstack/react-query'
import { loginUserAction } from './user.action'
import { LoginRequestDto } from './user.dto'

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginRequestDto) => {
      return await loginUserAction(payload)
    }
  })
}
