import React, { useState } from 'react'
import { Button, Dialog } from '@/components'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Modal, TableLowcode } from 'alurkerja-ui'

export const EditPengajuanGaji = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any } | undefined>()
  const [search, setSearch] = useState<string>()

  const onChange = () => {
    navigate('edit')
  }

  return (
    <section>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/hrm/pengajuan-gaji-karyawan"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="rounded bg-white pb-6">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <h3 className="text-gray-700 text-base font-semibold">
            Detail Gaji Karyawan
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-4 p-6">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Jumlah Pegawai
            </label>
            <Input disabled />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Total Gaji
            </label>
            <Input prefix="Rp." disabled />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Total Bonus
            </label>
            <Input prefix="Rp." disabled />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Total Potongan
            </label>
            <Input prefix="Rp." disabled />
          </div>
        </div>

        <div className="px-6">
          <TableLowcode
            readonly
            title="Detail Gaji Karyawan"
            baseUrl="https://kpm-sys.merapi.javan.id"
            specPath="/api/crud/takwim"
            renderState={renderState}
            setRenderState={setRenderState}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            search={search}
            setSearch={setSearch}
            column={[
              { label: 'Nama Pegawai', key: 'id' },
              { label: 'Gaji Pokok', key: 'id' },
              { label: 'Bonus', key: 'id' },
              { label: 'Potongan', key: 'id' },
              { label: 'Potongan Lainnya', key: 'id' },
              { label: 'Komponen Gaji Lainnya', key: 'id' },
              { label: 'Total Gaji', key: 'id' },
            ]}
          />
        </div>

        <div className="w-fit ml-auto flex items-center gap-4 px-6">
          <Button color="gray">Simpan</Button>
          <Modal
            title="Ajukan"
            triggerButton={
              <Button onClick={onChange}>Simpan dan Ajukan</Button>
            }
          >
            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor=""
                  className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                  Deskripsi Pengajuan
                </label>
                <Input textArea />
              </div>
              <div className="w-fit ml-auto">
                <Button>Simpan dan Ajukan</Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  )
}
