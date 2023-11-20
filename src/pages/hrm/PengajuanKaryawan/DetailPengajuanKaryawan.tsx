import { Input } from 'alurkerja-ui'
import { Button } from '@/components'
import React from 'react'

export const DetailPengajuanKaryawan = () => {
  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">
        Detail Pengajuan Karyawan
      </h3>

      <div className="grid grid-cols-3 gap-4 px-6">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Pegawai
          </label>
          <Input />
        </div>

        <div className="col-span-2"></div>

        <div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alasan Pinjam
            </label>
            <Input textArea />
          </div>
        </div>
        <div className="col-span-2"></div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Jumlah
          </label>
          <Input prefix="Rp." type="number" />
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Jumlah
          </label>
          <Input suffix="Bulan" type="number" />
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Periode Awal
          </label>
          <Input type="date" />
        </div>
      </div>

      <div className="w-fit ml-auto flex items-center gap-4 p-6">
        <Button color="gray">Simpan</Button>
        <Button>Simpan dan Ajukan</Button>
      </div>
    </section>
  )
}
