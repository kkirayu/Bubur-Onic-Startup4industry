import { Select, Input, PendingUpload, InputDate } from 'alurkerja-ui'
import { Button, Dialog } from '@/components'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export const CreatePotongan = () => {
  const navigate = useNavigate()

  const saveAndSubmit = () => {
    Dialog.confirm({ title: 'Simpan dan Ajukan', callback: () => {} })
  }

  const save = () => {
    navigate('/karyawan/potongan')
  }

  return (
    <section>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/karyawan/potongan"
      >
        <ArrowLeft />
        Kembali
      </Link>

      <div className="rounded bg-white pb-6">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <h3 className="text-gray-700 text-base font-semibold">
            Buat Potongan Karyawan
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Pegawai
            </label>
            <Select options={[]} />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Total Gaji
            </label>
            <Input prefix="Rp." />
          </div>
          <div className="col-span-2">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alasan Pengajuan
            </label>
            <Input textArea />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Bukti
            </label>
            <PendingUpload />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Periode Tagihan
            </label>
            <InputDate />
          </div>
        </div>

        <div className="w-fit ml-auto flex items-center gap-4 px-6">
          <Button color="gray" onClick={save}>
            Simpan
          </Button>
          <Button onClick={saveAndSubmit}>Simpan dan Ajukan</Button>
        </div>
      </div>
    </section>
  )
}
