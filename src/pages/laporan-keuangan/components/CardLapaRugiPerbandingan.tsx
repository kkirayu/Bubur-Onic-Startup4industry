import { InputYear, Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'
import { getListCompany } from '@/api'
import moment from 'moment'
import _ from 'underscore'

export const CardLabaRugiPerbandingan = () => {
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

  const navigate = useNavigate()


  const { listOption: listOptionCompany, isLoading: loadingListCompany } =
    getListCompany()
  const onClickJournal = (data: FieldValues) => {
    if (data.year === '') {
      setError('year', { type: 'required', message: 'Silahkan pilih tahun' })
    } else if (data.company === '') {
      setError('company', { type: 'required', message: 'Silahkan pilih Perusahaan' })
    } else {

      navigate({
        pathname: 'laba-rugi-perbandingan',
        search: `?company=${data.company}&start=01/01/${data.year}&end=31/12/${data.year}`,
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
            Laba Rugi Perbandingan
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan perbandingan antara coa aktiva dan pasiva pada periode
          tertentu.
        </p>
        <Modal
          title="Konfigurasi Laporan Laba Rugi Perbandingan"
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
                  <Select
                    options={_.range(2010, moment().year() +  1).map((year) => ({
                      label: year,
                      value: year,
                    })
                    )}
                    onChange={(value: any) => {
                      setValue('year', value.value ?? '')
                    }}
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
