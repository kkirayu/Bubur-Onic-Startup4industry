import { InputYear, Modal } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IconLaporan } from '@/assets'
import { Button } from '@/components'

export const CardNeracaAkhir = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      year: '',
    },
  })

  const navigate = useNavigate()

  const onClickJournal = (data: FieldValues) => {
    if (data.year !== '') {
      navigate({
        pathname: 'neraca-akhir',
        search: `?start=01-01-${data.year}&end=31-12-${data.year}`,
      })
    } else {
      setError('year', { type: 'required', message: 'Silahkan pilih tahun' })
    }
  }

  return (
    <div className="border rounded">
      <div className="border-b flex items-center px-6 py-4 gap-x-2.5">
        <IconLaporan />
        <div>
          <div className="text-gray-700">Laporan</div>
          <div className="text-gray-700 font-semibold">Neraca Akhir</div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-6">
          Menampilkan perbandingan antara coa aktiva dan pasiva pada periode
          tertentu.
        </p>
        <Modal
          title="Konfigurasi Laporan Neraca Akhir"
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
                    Tahun
                  </label>
                  <InputYear
                    onChange={(value) => {
                      setValue('year', value ?? '')
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
