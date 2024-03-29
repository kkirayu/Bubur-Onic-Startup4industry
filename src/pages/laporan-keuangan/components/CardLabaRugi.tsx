import { InputDate, Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'
import { getListCompany } from '@/api'
import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'

export const CardLabaRugi = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      company: '',
      date: new Date(),
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
    if (data.company !== '') {
      navigate({
        pathname: 'laba-rugi',
        search: `?company=${data.company}&start=${moment(
          dateRange[0]
        ).format('DD/MM/YYYY')}&end=${moment(dateRange[1]).format(
          'DD/MM/YYYY'
        )}`,
      })
    } else {
      setError('company', { type: 'required', message: 'company required' })
    }
  }

  return (
    <div className="border rounded">
      <div className="border-b flex items-center px-6 py-4 gap-x-2.5">
        <IconLaporan />
        <div>
          <div className="text-gray-700">Laporan</div>
          <div className="text-gray-700 font-semibold">Laba Rugi</div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan perbandingan antara coa aktiva dan pasiva pada periode
          tertentu.
        </p>
        <Modal
          title="Konfigurasi Laporan Laba Rugi"
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
                    Laba Rugi Per Tanggal
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
                    Periode Transaksi
                  </div>
                  <div className="text-xs text-gray-alurkerja-2">
                    Periode Transaksi
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
