import { useMutation } from '@tanstack/react-query'
import { createProductAction } from './product.action'
import { CreateProductRequestDto } from './product.dto'
import { toast } from '@/components/ui/use-toast'

export const createProductMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateProductRequestDto) => createProductAction(payload),
    onSuccess: (data) => {
      toast({
        description: 'Tạo sản phẩm thành công'
      })
      return data
    },
    onError: (error: any) => {
      toast({
        description: 'Tạo sản phẩm thất bại'
      })
    }
  })
}
