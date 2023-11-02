import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useCallback } from 'react'
import { formatToMoney } from '@/utils'
import { axiosInstance } from '@/api'
import { Spinner } from 'alurkerja-ui'

interface ReportNeraca {
  key: string
  value: string
  group: Group[]
}
export interface Items {
  account_id_count: number
  date: string
  debit: number
  credit: number
  discount_amount_currency: number
  balance: number
  amount_residual: number
  amount_residual_currency: number
  account_id?: (number | string)[] | null
  saldo: Saldo
}

export interface Saldo {
  dataAwal: SaldoItem
  dataAkhir: SaldoItem
  selisih: number
}

export interface SaldoItem {
  tanggal: string
  saldo: number
}

export interface Group {
  account_root_id_count: number
  date: string
  debit: number
  credit: number
  discount_amount_currency: number
  balance: number
  total_awal: number
  total_akhir: number
  tanggal_awal: number
  tanggal_akhir: number
  amount_residual: number
  amount_residual_currency: number
  account_root_id?: (number | string)[] | null
  items: Items[]
}

export function ViewLaporaNeraca() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')

  const { data } = useQuery({
    queryKey: ['company', companyID],
    queryFn: async () => {
      return axiosInstance
        .get(`/saas/perusahaan/${companyID}`)
        .then((res) => res.data?.data)
    },
  })

  const { data: report } = useQuery<ReportNeraca[]>({
    queryKey: ['laporan-neraca'],
    queryFn: async () => {
      return axiosInstance
        .get(`/laporan/laporan-neraca?company=${companyID}&start=${startDate}&end=${endDate}`)
        .then((res) => res.data?.data)
    },
  })

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-neraca/export?company=1&date=18/10/2023`,
        { responseType: 'blob' }
      )
    },
    onSuccess: (res) => {
      const fileName = `Laporan-Neraca.pdf`
      const blob = new Blob([res.data], { type: 'application/pdf' })

      // Buat URL objek untuk file PDF
      const url = window.URL.createObjectURL(blob)

      // Buat elemen <a> untuk mengunduh file
      const a = document.createElement('a')
      a.href = url
      a.download = fileName

      // Klik elemen <a> untuk memulai unduhan
      a.click()

      // Hapus URL objek setelah pengunduhan selesai
      window.URL.revokeObjectURL(url)
    },
  })

  return (
    <div className="px-4 pb-6 bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-base font-bold uppercase leading-normal">
          lAPORAN
        </h3>
        <div className="flex items-center divide-black-alurkerja-1 divide-x-2">
          <button className="px-5 flex items-center gap-1">
            <RefreshCcw size={16} /> Refresh Data
          </button>
          {/* <button className="px-5 flex items-center gap-1">
            <Printer />
            Cetak Laporan
          </button> */}
          <button
            className="px-5 flex items-center gap-1"
            onClick={() => exportLaporan()}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : <Upload />}
            Eksport Data
          </button>
        </div>
      </div>
      <div className="mt-8 mb-4 flex items-center gap-2.5">
        <img className="w-auto min-w-[120px] h-28" src="/icon.png" alt="Res" />
        <div>
          <div className="font-semibold">Laporan Neraca</div>
          <div>Periode {startDate } ~ {endDate}</div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="font-bold px-4">
        {report?.map((neraca, i) => (
          <Fragment key={i}>
            <div className="text-gray-700 text-base font-bold ">
              {neraca.value}
            </div>

            {neraca.group.map((group, i) => (
              <div className="mb-6" key={i}>
                <div className="text-gray-700 text-sm font-normal">
                  ({group.account_root_id?.[1]})
                </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-left w-[400px]">
                        Keterangan / Uraian
                      </th>
                      <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-center w-[242px]">
                        Saldo Awal
                      </th>
                      <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-center w-[242px]">
                        Selama Periode
                      </th>
                      <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-center w-[242px]">
                        Saldo Akhir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((acc, i) => {
                      return (
                        <tr>
                          <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y">
                            |---{acc.account_id?.[1]}
                          </td>
                          <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                            {formatToMoney(acc.saldo.dataAwal.saldo)}
                          </td>
                          <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                            {formatToMoney(acc.saldo.selisih)}
                          </td>
                          <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                            {formatToMoney(acc.saldo.dataAkhir.saldo)}
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td className="text-zinc-800 text-xs px-3.5 py-2.5 border-y font-bold bg-slate-100">
                        Total {group.account_root_id?.[1]}
                      </td>
                      <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                        {formatToMoney(group.total_awal)}
                      </td>
                      <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                        {formatToMoney(group.total_akhir)}
                      </td>
                      <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                        {formatToMoney(group.balance)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            {i !== report.length - 1 && (
              <div className="w-full h-px border border-slate-200 my-6" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
