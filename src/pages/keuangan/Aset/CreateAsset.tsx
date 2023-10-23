import { useMemo, useState } from 'react'
import { Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'
import moment from 'moment'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListAccount } from '@/api'

interface PayloadCreateJournal {
  deskripsi: string
  tanggal_transaksi: string
  judul: string
  akuns?: { id: number; debit: number; credit: number; description: string }[]
}

export const CreateAsset = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm()

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Jurnal</h3>
      <div className="grid grid-cols-3 gap-4 px-10 mb-8">
        <div>
          <label htmlFor="">Nama Asset</label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">Nama Asset</span>
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Kategori Asset
          </label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">Kategori Asset</span>
          <ErrorMessage
            errors={errors}
            name=""
            render={() => (
              <p className="text-red-400 text-xs">Tanggal Required </p>
            )}
          />
        </div>

        <div>
          <label htmlFor="">Tanggal Pembelian</label>
          <Input type="date" />
          <span className="text-gray-alurkerja-2 text-xs">
            Tanggal Pembelian
          </span>
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal Mulai Depresiasi
          </label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">
            Tanggal Mulai Depresiasi
          </span>
          <ErrorMessage
            errors={errors}
            name=""
            render={() => (
              <p className="text-red-400 text-xs"> Judul Jurnal Required </p>
            )}
          />
        </div>
        <div className="col-span-2"></div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Gross Value
          </label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">Gross Value</span>
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Salvage Value
          </label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">Salvage Value</span>
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Resedual Value
          </label>
          <Input />
          <span className="text-gray-alurkerja-2 text-xs">Resedual Value</span>
        </div>

        <div className="col-span-3">
          <label
            htmlFor="deskripsi"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Deskripsi
          </label>
          <Input {...register('deskripsi', { required: true })} textArea />
          <span className="text-gray-alurkerja-2 text-xs">Deskripsi Akun</span>
          <ErrorMessage
            errors={errors}
            name="deskripsi"
            render={() => (
              <p className="text-red-400 text-xs">Deskripsi Required </p>
            )}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Supplier
          </label>
          <Select options={[]} />
          <span className="text-gray-alurkerja-2 text-xs">Resedual Value</span>
        </div>
      </div>

      <div className="w-fit flex gap-x-4 ml-auto px-6">
        <Button>Simpan</Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
