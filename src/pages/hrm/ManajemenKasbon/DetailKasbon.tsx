import React, { useContext, useState } from 'react'
import {
  AuthContext,
  Input,
  InputYear,
  Select,
  TableLowcode,
} from 'alurkerja-ui'
import { Button, Dialog } from '@/components'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const DetailKasbon = () => {
  const axiosInstance = useContext(AuthContext)
  const { id } = useParams()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return axiosInstance.post('')
    },

    onSuccess: () => {
      Dialog.success()
    },
  })

  const onClosedKasbon = (id: number) => {
    Dialog.confirm({
      title: 'Process Kasbon',
      description:
        'Ketika di close kasbon tidak bisa di buka lagi dan akan di lanjutkan ke team keuangan',
      callback: () => {
        mutate(id)
      },
    })
  }

  return (
    <section className="bg-white rounded p-6">
      <h3 className="text-sm font-semibold font-['Poppins'] leading-tight">
        Detail Kasbon
      </h3>
      <div className="p-5 grid grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Bulan
          </label>
          <Select
            options={[
              { label: 'Januari', value: 1 },
              { label: 'Februari', value: 2 },
              { label: 'Maret', value: 3 },
              { label: 'April', value: 4 },
              { label: 'Mei', value: 5 },
              { label: 'Juni', value: 6 },
              { label: 'Juli', value: 7 },
              { label: 'Agustus', value: 8 },
              { label: 'September', value: 9 },
              { label: 'Oktober', value: 10 },
              { label: 'November', value: 11 },
              { label: 'Desember', value: 12 },
            ]}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tahun
          </label>
          <InputYear />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal Max Pengembalian Kasbon
          </label>
          <Input type="date" />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Status Kasbon
          </label>
          <div className="flex">
            <Input className="rounded-r-none" />
            <Button
              className="whitespace-nowrap rounded-l-none"
              onClick={() => onClosedKasbon(+id!!)}
            >
              Close Kusbon
            </Button>
          </div>
        </div>
      </div>
      <TableLowcode
        title="Pegawai Yang Mengambil"
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
          { key: 'claim_date', label: 'Tanggal Claim' },
          { key: 'total_kasbon  ', label: 'Jumlah Kasbon' },
        ]}
        customButtonCreate={() => <></>}
        canFilter={false}
        canSearch={false}
      />
    </section>
  )
}
