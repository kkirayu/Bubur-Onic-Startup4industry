import { Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'
import { getListCompany } from '@/api'
import moment from 'moment'

export const CardBukuBesar = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      company: '',
      group: '',
    },
  })

  const navigate = useNavigate()
  const { listOption: listOptionCompany, isLoading: loadingListCompany } =
    getListCompany()

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ])

  const onClickJournal = (data: FieldValues) => {
    if (data.company === '') {
      setError('company', { type: 'required', message: 'company required' })
    }
    if (data.group === '') {
      setError('group', { type: 'required', message: 'group COA required' })
    }
    if (data.company !== '' && data.group !== '') {
      navigate({
        pathname: 'buku-besar',
        search: `?company=${data.company}&group=${data.group}&start=${moment(
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
          <div className="text-gray-700 font-semibold">Buku besar</div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan coa keuangan dengan history transaksi pada periode
          tertentu.
        </p>
        <Modal
          title="Konfigurasi Laporan Buku Besar"
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
                    Group COA
                  </label>
                  <Select
                    invalid={errors.group ? true : false}
                    options={[
                      { label: 'Asset', value: 'asset' },
                      { label: 'Liability', value: 'liability' },
                      { label: 'Equity', value: 'equity' },
                      { label: 'Income', value: 'income' },
                      { label: 'Expense', value: 'expense' },
                      { label: 'Off Balance', value: 'off_balance' },
                    ]}
                    onChange={(selected: any) => {
                      setValue('group', selected.value)
                      clearErrors('group')
                    }}
                  />
                  <div className="text-xs text-gray-alurkerja-2">
                    {errors?.group ? (
                      <span className="text-red-alurkerja">
                        {errors?.group.message}
                      </span>
                    ) : (
                      'Group Coa Yang ingin ditampilkan'
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Periode Transaksi
                  </label>
                  <DatePicker
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
