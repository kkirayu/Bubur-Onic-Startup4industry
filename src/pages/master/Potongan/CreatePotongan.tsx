import { Input, InputDate, PendingUpload } from 'alurkerja-ui'
import { Button } from '@/components'
import React from 'react'

export const CreatePotongan = () => {
  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Buat Potongan Karyawan</h3>

      <div className="grid grid-cols-2 gap-4 px-6">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Pegawai
          </label>
          <Input />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Julmah Potongan
          </label>
          <Input prefix="RP" type="number" />
        </div>
        <div className="col-span-2">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alasan Potongan
            </label>
            <Input textArea />
          </div>
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
            Periode Potong
          </label>
          <InputDate />
        </div>
      </div>

      <div className="w-fit ml-auto flex items-center gap-4 px-6">
        <Button variant="outlined">Simpan</Button>
        <Button>Simpan dan Ajukan</Button>
      </div>
    </section>
  )
}
