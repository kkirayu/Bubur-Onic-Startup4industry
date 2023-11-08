import { useMutation } from '@tanstack/react-query'
import { TableLowcode } from 'alurkerja-ui'
import { axiosInstance } from '@/api'
import { Dialog } from '@/components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AkunManagement = () => {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: any) => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.account',
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
        description: 'Berhasil Menghapus Akun',
        callback: () => {
          navigate('/master/akun')
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
    <>
      <section className="bg-white">
        <TableLowcode
          baseUrl={import.meta.env.VITE_API_BASEURL}
          tableName="akun"
          module="akun"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          customButtonDelete={() => <></>}
          customButtonEdit={() => <></>}
          onClickDelete={(_, id) => {
            Dialog.confirm({
              description: 'Apakah anda yakin ingin menghapus data ini?',
              callback: () => {
                mutate(id)
              },
            })
          }}
        />
      </section>
    </>
  )
}
