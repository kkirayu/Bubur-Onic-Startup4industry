import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'
import { FieldValues } from 'react-hook-form'
import { Dialog } from '@/components'

export const ListAsset = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { data } = useQuery({
    cacheTime: 0,
    queryKey: ['category-asset'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.asset.asset',
        method: 'web_search_read',
        args: [],
        kwargs: [],
        res_type: 'PAGINATEDLIST',
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: any) => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.asset.asset',
        method: 'unlink',
        args: [[id]],
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            default_move_type: 'in_invoice',
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil Menghapus Asset',
        callback: () => {
          navigate('/keuangan/aset')
        },
      })
    },
    onError: (err: any) => {
      if (err.response.status === 422) {
        Dialog.error({ description: err.response.data.message })
      } else {
        Dialog.error()
      }
    },
  })

  return (
    <section className="bg-white">
      {data && (
        <TableLowcode
          title="Manage Asset"
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
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nama Barang' },
            { key: 'category_id', label: 'Kategori Barang' },
            { key: 'value', label: 'Harga' },
            { key: 'value_residual', label: 'Resedual' },
            { key: 'date', label: 'Tanggal Pembelian' },
          ]}
          customCell={({ defaultCell, name, value }) => {
            if (name === 'category_id') {
              return value.length > 0 ? value[1] : '-'
            } else if (name === 'value' || name === 'value_residual') {
              return formatToMoney(value)
            }
            return defaultCell
          }}
          customButtonCreate={() => (
            <>
              <Button
                className="bg-blue-400 text-white"
                onClick={() => navigate('create')}
                size="sm"
              >
                Tambah Asset
              </Button>
            </>
          )}
          onClickEdit={(_, id) => navigate(id + '/edit')}
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
  )
}
