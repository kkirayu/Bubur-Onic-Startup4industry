import { InputYear, Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'
import { getListCompany } from '@/api'
import moment from 'moment'
import _ from 'underscore'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

export const CardPerubahanModal = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      year: '',
      company: ''
    },
  })


  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    moment().date(1).toDate(),
    moment().endOf('month').toDate(),
  ])

  const navigate = useNavigate()


  const { listOption: listOptionCompany, isLoading: loadingListCompany } =
    getListCompany()
  const onClickJournal = (data: FieldValues) => {
    if (data.company === '') {
      setError('company', { type: 'required', message: 'Silahkan pilih Perusahaan' })
    } else {

      navigate({
        pathname: 'perubahan-modal',
        search: `?company=${data.company}&start=${moment(
          dateRange[0]
        ).format('DD/MM/YYYY')}&end=${moment(dateRange[1]).format(
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
          <div className="text-gray-700 font-semibold">
            Perubahan Modal
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan Perubahan Modal
        </p>
        <Modal
          title="Konfigurasi Perubahan Modal"
          triggerButton={<Button>Buka Laporan</Button>}
          maxWidth="2xl"
        >
          <div className="relative">
            {/* For tricky modal to not focus on InputYear */}
            <button className="absolute"></button>
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
                      'Pilih Perusahaan'
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Tahun
                  </label>
                  <ReactDatePicker
                    className="w-full border p-2 rounded"
                    selectsRange={true}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => {
                      setDateRange(update)
                    }}
                    isClearable={true}
                  />
                  <div className="text-xs text-gray-alurkerja-2">
                    {errors?.year ? (
                      <span className="text-red-alurkerja">
                        {errors?.year.message}
                      </span>
                    ) : (
                      'Tahun Transaksi'
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
