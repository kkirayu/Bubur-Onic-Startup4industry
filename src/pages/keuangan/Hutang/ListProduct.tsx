import { Skeleton, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button, Dialog } from '@/components'
import { SubHeader } from './Components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListProduct = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { data, refetch, isFetching } = useQuery({
    cacheTime: 0,
    queryKey: ['products'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        res_type: 'PAGINATEDLIST',
        model: 'product.template',
        method: 'web_search_read',
        args: [],
        kwargs: {
          limit: 80,
          offset: 0,
          order: '',
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            bin_size: true,
            params: {
              action: 254,
              model: 'product.template',
              view_type: 'list',
              cids: 1,
              menu_id: 115,
            },
          },
          count_limit: 10001,
          domain: [['purchase_ok', '=', true]],
          fields: [
            'activity_exception_icon',
            'default_code',
            'name',
            'list_price',
            'taxes_id',
            'supplier_taxes_id',
            'activity_exception_decoration',
          ],
        },
      })
    },
  })

  const { mutate } = useMutation({
    mutationFn: (id: string | number) => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'product.template',
        method: 'unlink',
        args: [[+id]],
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil Menghapus Product',
        callback: () => {
          refetch()
        },
      })
    },
    onError: (err: any) => {
      if (err.response.status === 422 || err.response.status === 500) {
        Dialog.error({ description: err.response.data.message })
      } else {
        Dialog.error()
      }
    },
  })

  return (
    <div>
      <section className="bg-white">
        {!isFetching && (
          <TableLowcode
            title="Product"
            data={data?.data.data.content}
            baseUrl={import.meta.env.VITE_API_BASEURL}
            specPath="/api/journal/journal"
            renderState={renderState}
            setRenderState={setRenderState}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            search={search}
            setSearch={setSearch}
            column={[
              { key: 'name', label: 'Nama' },
              { key: 'list_price', label: 'Harga' },
              { key: 'tax', label: 'Pajak Customer' },
              { key: 'vendor_tax', label: 'Pajak Vendor' },
            ]}
            onClickCreate={() => navigate('create')}
            onClickEdit={(_, id) => navigate(`${id}/edit`)}
            onClickDetail={(id) => navigate(`${id}`)}
            onClickDelete={(_, id) => {
              Dialog.confirm({
                description: 'Apakah anda yakin ingin menghapus data ini?',
                callback: () => {
                  mutate(id)
                },
              })
            }}
          />
        )}
      </section>
    </div>
  )
}
