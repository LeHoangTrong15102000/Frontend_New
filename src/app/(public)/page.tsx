import { API_ROUTES } from '@/constants/api-route'
import { PAGE_ROUTES } from '@/constants/route'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      Home Page
      <div>
        <Link href={`${PAGE_ROUTES.AUTH.LOGIN}`}>Nhấn vào để đi đến trang đăng nhập.</Link>
      </div>
    </div>
  )
}

export default page
