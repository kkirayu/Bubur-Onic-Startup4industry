import { Input, Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'
import { getListCompany } from '@/api'

export const CardNeraca = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      company: '',
      date: '',
    },
  })

  const navigate = useNavigate()
  const { listOption: listOptionCompany, isLoading: loadingListCompany } =
    getListCompany()

  const onClickJournal = (data: FieldValues) => {
    if (data.date === '') {
      setError('date', { type: 'required', message: 'date required' })
    }
    if (data.company === '') {
      setError('company', { type: 'required', message: 'company required' })
    }

    if (data.company !== '' && data.date !== '') {
      navigate({
        pathname: 'neraca',
        search: `?company=${data.company}&date=${moment(data.date).format(
          'DD/MM/YYYY'
        )}`,
      })
    }
  }

  return (
    <div className="border rounded">
      <div className="border-b flex items-center px-6 py-4 gap-x-2.5">
        <IconLaporan />
        <div>
          <div className="text-gray-700">Laporan</div>
          <div className="text-gray-700 font-semibold">Neraca</div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan perbandingan antara coa aktiva dan pasiva pada periode
          tertentu.
        </p>
        <Modal
          title="Konfigurasi Laporan Neraca"
          triggerButton={<Button>Buka Laporan</Button>}
          maxWidth="2xl"
        >
          <div>
            <div className="border-b">
              <div className="p-6 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor=""
                    className="after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Journal Dari Perusahaan
                  </label>
                  <Select
                    invalid={errors.company ? true : false}
                    isLoading={loadingListCompany}
                    options={listOptionCompany}
                    onChange={(selected: any) => {
                      setValue('company', selected.value)
                      clearErrors('company')
                    }}
                  />
                  <div className="text-xs text-gray-alurkerja-2">
                    {errors?.company ? (
                      <span className="text-red-alurkerja">
                        {errors?.company.message}
                      </span>
                    ) : (
                      'Journal Dari Perusahaan Yang di handle'
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Neraca per Tanggal
                  </label>
                  <Input
                    type="date"
                    invalid={errors.date ? true : false}
                    onChange={(selected: any) => {
                      setValue('date', selected.value)
                      clearErrors('date')
                    }}
                  />
                  <div className="text-xs text-gray-alurkerja-2">
                    {errors?.date ? (
                      <span className="text-red-alurkerja">
                        {errors?.date.message}
                      </span>
                    ) : (
                      'Periode Transaksi'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <Button variant="outlined">Cancel</Button>
              <Button onClick={() => handleSubmit(onClickJournal)()}>
                Lihat Laporan
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
