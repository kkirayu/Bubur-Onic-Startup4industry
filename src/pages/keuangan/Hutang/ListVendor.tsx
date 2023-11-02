import { FormLowcodeLite, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Search, RefreshCcw } from 'lucide-react'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListVendor = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { data } = useQuery({
    queryKey: ['vendor'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'res.partner',
        method: 'web_search_read',
        res_type: 'PAGINATEDLIST',
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
              action: 262,
              model: 'res.partner',
              view_type: 'kanban',
              cids: 1,
              menu_id: 115,
            },
            res_partner_search_mode: 'supplier',
            default_is_company: true,
            default_supplier_rank: 1,
          },
          count_limit: 10001,
          domain: [['supplier_rank', '>', 0]],
          fields: [
            'activity_exception_decoration',
            'activity_exception_icon',
            'activity_state',
            'activity_summary',
            'activity_type_icon',
            'activity_type_id',
            'id',
            'color',
            'display_name',
            'title',
            'email',
            'parent_id',
            'is_company',
            'function',
            'phone',
            'street',
            'street2',
            'zip',
            'city',
            'country_id',
            'mobile',
            'state_id',
            'category_id',
            'avatar_128',
            'type',
            'active',
            '__last_update',
            'activity_ids',
          ],
        },
      })
    },
  })

  return (
    <div>
      <section className="bg-white">
        {data && (
          <TableLowcode
            layout="fixed"
            title="Vendor"
            baseUrl={import.meta.env.VITE_API_BASEURL}
            specPath="/api/journal/journal"
            data={data?.data.data.content}
            renderState={renderState}
            setRenderState={setRenderState}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            search={search}
            setSearch={setSearch}
            column={[{ key: 'display_name', label: 'Nama' }]}
            onClickCreate={() => navigate('create')}
          />
        )}
      </section>
    </div>
  )
}
