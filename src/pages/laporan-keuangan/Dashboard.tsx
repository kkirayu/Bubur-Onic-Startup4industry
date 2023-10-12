import { Modal, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button } from '@/components'
import { getListCompany } from '@/api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

export function Dashboard() {
  const {
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      company: '',
      type: 'all',
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
    if (data.company !== '') {
      navigate({
        pathname: 'journal',
        search: `?company=${data.company}&type=${data.type}&start=${moment(
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
    <div className="px-4 bg-white">
      <div className="pt-5 pb-6 pl-4 border-b mb-5">
        <h3 className="text-base font-bold uppercase leading-normal">
          lAPORAN
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2.5 pb-4">
        <div className="border rounded">
          <div className="border-b flex items-center px-6 py-4 gap-x-2.5">
            <IconLaporan />
            <div>
              <div className="text-gray-700">Laporan</div>
              <div className="text-gray-700 font-semibold">
                Journal (General Ledger)
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="mb-6">
              Menampilkan semua daftar transaksi jurnal yang telah terekam pada
              periode tertentu
            </p>
            <Modal
              title="Konfigurasi Laporan Journal"
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
                        Jenis Laporan Journal
                      </label>
                      <Select
                        options={[
                          { label: 'Semua Jurnal', value: 'all' },
                          { label: 'Jurnal Transaksi Kas', value: 'kas' },
                          {
                            label: 'Jurnal Transaksi Non Kas',
                            value: 'non-kas',
                          },
                        ]}
                        defaultValue={{ label: 'Semua Jurnal', value: 'all' }}
                        onChange={(selected: any) =>
                          setValue('type', selected.value)
                        }
                      />
                      <div className="text-xs text-gray-alurkerja-2">
                        Jenis Laporan journal
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
      </div>
    </div>
  )
}

const IconLaporan = () => (
  <svg
    width="63"
    height="64"
    viewBox="0 0 63 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Frame">
      <path
        id="Vector"
        d="M31.5 5.75L5.25 18.875L31.5 32L57.75 18.875L31.5 5.75Z"
        stroke="#0095E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M5.25 45.125L31.5 58.25L57.75 45.125"
        stroke="#0095E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_3"
        d="M5.25 32L31.5 45.125L57.75 32"
        stroke="#0095E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)
