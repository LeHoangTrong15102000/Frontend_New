'use client'

import { COOKIES_KEY } from '@/constants/cookies-key'
import { useLoginUserMutation } from '@/services/user/user.mutation'
import { loginValidator, LoginValidatorType } from '@/services/user/user.validator'
import { setCookie } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'

const LoginPage = () => {
  const router = useRouter()
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const loginUserMutation = useLoginUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginUserMutation.mutate(
      {
        user_name: data.username,
        pass_word: data.password
      },
      {
        onSuccess: (response: any) => {
          if (!response.success) {
            toast({
              description: response.message
            })
            return
          } else {
            setUser(response.data)
            setCookie(COOKIES_KEY.USER_INFO, JSON.stringify(response.data))
            setCookie(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN, response.data.token)
            router.push('/manage/products')
          }
        },
        onError: (error: any) => {
          toast({
            description: error.message
          })
        }
      }
    )
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white p-4'>
      <div className='w-full max-w-[400px] rounded-lg p-6'>
        <div className='mb-6'>
          <h1 className='mb-2 text-2xl font-bold'>Xin chào!</h1>
          <p className='text-sm text-gray-600'>👋 Chào mừng bạn đến với HV AI, vui lòng đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='username' className='block text-sm font-medium text-black'>
                Tên đăng nhập
              </label>
              <input
                {...register('username')}
                id='username'
                type='text'
                placeholder='Your username'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none'
              />
              {errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='block text-sm font-medium text-black'>
                Mật khẩu
              </label>
              <input
                {...register('password')}
                id='password'
                type='password'
                placeholder='Your password'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none'
              />
              {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
