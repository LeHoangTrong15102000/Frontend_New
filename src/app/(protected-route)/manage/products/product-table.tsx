'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import DOMPurify from 'dompurify'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { formatCurrency, handleErrorApi } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/auto-pagination'
import { toast } from '@/components/ui/use-toast'
import { useDeleteProductMutation, useGetProductListQuery } from '@/queries/useProduct'
import { ProductListResType } from '@/schemaValidations/product.schema'
import AddProduct from './add-product'
import EditProduct from './edit-product'
import { getProductListAction } from '@/services/product/product.action'
import { Product } from '@/services/product/product.dto'
import { useListTeamByListTeamId, useProductTypeList, useProjectList } from '@/services/product/product.query'
import { formatDate } from '@/utils/converter'
import { useAuth } from '@/contexts/AuthContext'
import { PORTAL_API_KEY } from '@/config'

type ProductItem = ProductListResType['list'][0]

const ProductTableContext = createContext<{
  setProductIdEdit: (value: number) => void
  productIdEdit: number | undefined
  productDelete: Product | null
  setProductDelete: (value: Product | null) => void
}>({
  setProductIdEdit: (value: number | undefined) => {},
  productIdEdit: undefined,
  productDelete: null,
  setProductDelete: (value: Product | null) => {}
})

export const ProductTypeCell = (row: any) => {
  const { data: productTypes } = useProductTypeList()
  const productType = productTypes?.find((type: any) => type?.value === row.getValue('product_type'))

  return <div className='capitalize'>{productType?.text || row.getValue('product_type')}</div>
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'Id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'TÊN SẢN PHẨM',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('sku')}</div>
  },
  {
    accessorKey: 'price',
    header: 'GIÁ BÁN',
    cell: ({ row }) => <div className='capitalize'>{formatCurrency(row.getValue('price'))}</div>
  },
  {
    accessorKey: 'description',
    header: 'MÔ TẢ',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('description')}</div>
  },
  {
    accessorKey: 'product_type',
    header: 'LOẠI SẢN PHẨM',
    cell: ({ row }) => ProductTypeCell(row)
  },
  {
    accessorKey: 'project_id',
    header: 'NHÓM',
    cell: ({ row }) => {
      // const { data: projects } = useProjectList(row?.original?.user_name || '')
      // const project = projects?.find((p: any) => p.Id === row.getValue('project_id'))
      // return <div className='capitalize'>{project?.ProjectName || row.getValue('project_id')}</div>
      return <div className='capitalize'>{row.getValue('project_id')}</div>
    }
  },
  {
    accessorKey: 'team_id',
    header: 'NHÓM - TEAM',
    cell: async ({ row }) => {
      // const productListQuery = await getProductListAction({
      //   limit: 10,
      //   offset: 0,
      //   shuffle: 0
      // })
      // const products = productListQuery?.list ?? []
      // const { data: teamsByListTeamId } = useListTeamByListTeamId({
      //   lst_team_id: products.map((p: Product) => p.team_id),
      //   api_key: PORTAL_API_KEY
      // })
      // const teamName =
      //   teamsByListTeamId &&
      //   Array.isArray(teamsByListTeamId) &&
      //   teamsByListTeamId?.find((t: any) => t.Id === row.getValue('team_id'))?.TeamName

      // return <div className='capitalize'>{teamName || row.getValue('team_id') || '-'}</div>
      return <div className='capitalize'>{row.getValue('team_id') || '-'}</div>
    }
  },
  {
    accessorKey: 'active',
    header: 'TRẠNG THÁI',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('active')}</div>
    }
  },
  {
    accessorKey: 's_created_by',
    header: 'TẠO BỞI',
    cell: ({ row }) => row.getValue('s_created_by') || row.original.user_name
  },
  {
    accessorKey: 's_updated_at',
    header: 'CẬP NHẬT',
    cell: ({ row }) => formatDate(row.getValue('s_updated_at') || row.original.UpdatedAt || row.original.s_created_at)
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setProductIdEdit, setProductDelete } = useContext(ProductTableContext)
      const openEditProduct = () => {
        setProductIdEdit(row.original.Id)
      }

      const openDeleteProduct = () => {
        setProductDelete(row.original)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditProduct}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteProduct}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeleteProduct({
  productDelete,
  setProductDelete
}: {
  productDelete: Product | null
  setProductDelete: (value: Product | null) => void
}) {
  const { mutateAsync } = useDeleteProductMutation()

  const deleteProduct = async () => {
    if (productDelete) {
      try {
        await mutateAsync({ Id: productDelete.Id })
        setProductDelete(null)
        toast({
          title: 'Đã xoá sản phẩm thành công!'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }
  return (
    <AlertDialog
      open={Boolean(productDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setProductDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm <span className='bg-foreground text-primary-foreground rounded px-1'>{productDelete?.name}</span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProduct}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Số lượng item trên 1 trang
const PAGE_SIZE = 10
export default function ProductTable({ data }: { data: Product[] }) {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [productIdEdit, setProductIdEdit] = useState<number | undefined>()
  const [productDelete, setProductDelete] = useState<Product | null>(null)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE //default page size
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return (
    <ProductTableContext.Provider value={{ productIdEdit, setProductIdEdit, productDelete, setProductDelete }}>
      <div className='w-full space-y-4 p-2'>
        <EditProduct id={productIdEdit} setId={setProductIdEdit} />
        <AlertDialogDeleteProduct productDelete={productDelete} setProductDelete={setProductDelete} />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên sản phẩm'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddProduct />
          </div>
        </div>
        <div className='relative table-fixed whitespace-nowrap rounded-md border overflow-x-auto'>
          <Table className='relative min-w-[1200px]'>
            <TableHeader className='text-nowrap'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
            kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname='/manage/products'
            />
          </div>
        </div>
      </div>
    </ProductTableContext.Provider>
  )
}
