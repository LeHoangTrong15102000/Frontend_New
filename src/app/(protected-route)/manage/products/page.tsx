import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import ProductTable from './product-table'
import { getProductListAction } from '@/services/product/product.action'

// type Props = {
//   params: Promise<{ locale: Locale }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params;
//   const t = await getTranslations({
//     locale: params.locale,
//     namespace: 'Dishes'
//   })

//   const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/dishes`

//   return {
//     title: t('title'),
//     description: t('description'),
//     alternates: {
//       canonical: url
//     },
//     robots: {
//       index: false
//     }
//   }
// }

export default async function ProductsPage() {
  const productListQuery = await getProductListAction({
    limit: 10,
    offset: 0,
    shuffle: 0
  })
  const data = productListQuery?.list ?? []

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Sản phẩm</CardTitle>
            <CardDescription>Quản lý sản phẩm</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ProductTable data={data ?? []} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
