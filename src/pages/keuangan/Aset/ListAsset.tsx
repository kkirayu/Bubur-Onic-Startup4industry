import { useQuery } from '@tanstack/react-query'
import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListAsset = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { data } = useQuery({
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

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Manage Asset
      </div>
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
                return value[1]
              } else if (name === 'value' || name === 'value_residual') {
                return formatToMoney(value)
              }
              return defaultCell
            }}
            onClickCreate={() => navigate('create')}
            onClickEdit={(_, id) => navigate(id + '/edit')}
          />
        )}
      </section>
    </div>
  )
}
