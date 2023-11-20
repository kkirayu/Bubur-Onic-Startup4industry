import { Input, InputDate, PendingUpload } from 'alurkerja-ui'
import { Button } from '@/components'
import React from 'react'

export const DetailPotongan = () => {
  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Ubah Potongan Karyawan</h3>

      <div className="grid grid-cols-2 gap-4 px-6">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Pegawai
          </label>
          <Input value={'Shaddam'} />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Jumlah Potongan
          </label>
          <Input prefix="RP" type="number" value={1000} />
        </div>
        <div className="col-span-2">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alasan Potongan
            </label>
            <Input textArea value={'lorem'} />
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
        <Button color="gray">Simpan</Button>
        <Button>Simpan dan Ajukan</Button>
      </div>
    </section>
  )
}
