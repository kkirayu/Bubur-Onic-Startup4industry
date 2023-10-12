import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { axiosInstance } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function ViewLaporanJournal() {
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
          <button className="px-5 flex items-center gap-1">
            <Printer />
            Cetak Laporan
          </button>
          <button className="px-5 flex items-center gap-1">
            <Upload />
            Eksport Data
          </button>
        </div>
      </div>
      <div className="mt-8 mb-4 flex items-center gap-2.5">
        <img className="w-auto min-w-[120px] h-28" src="/icon.png" alt="Res" />
        <div>
          <div className="font-semibold">Laporan journal (General Ledger)</div>
          <div>
            Periode {startDate} - {endDate}
          </div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div>
        <table className="w-full table-auto">
          <thead className="border-y border-black-alurkerja-1">
            <tr>
              <th className="text-left p-4">Tanggal</th>
              <th className="text-left p-4">Nomor Transaksi</th>
              <th className="p-4">Nilai Debit</th>
              <th className="p-4">Nilai Kredit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2.5">12/10/2013</td>
              <td className="font-semibold p-2.5">TRAN1293102839012039128</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="pl-14 pr-2.5 py-1">6400201 - Biaya Sewa Kantor</td>
              <td className="text-center">12,321,321.00</td>
              <td className="text-center">-</td>
            </tr>
            <tr className="bg-gray-alurkerja-3 border-y border-y-black-alurkerja-1">
              <td></td>
              <td></td>
              <td className="text-center p-4">1</td>
              <td className="text-center p-4">1</td>
            </tr>
            <tr>
              <td>Total Transaksi</td>
              <td>Total Transaksi</td>
              <td className="text-center">12,321,321.00</td>
              <td className="text-center">12,321,321.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
