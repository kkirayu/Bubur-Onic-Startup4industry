import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { axiosInstance } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function ViewLaporanBukuBesar() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const accountID = searchParams.get('group')
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')

  const { data: currentCompany } = useQuery({
    queryKey: ['company', companyID],
    queryFn: async () => {
      return axiosInstance
        .get(`/saas/perusahaan/${companyID}`)
        .then((res) => res.data?.data)
    },
  })

  const { data: currentAccount } = useQuery({
    queryKey: ['account', accountID],
    queryFn: async () => {
      return axiosInstance
        .get(`/akun/akun/${accountID}`)
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
          <div className="font-semibold">Laporan Buku Besar</div>
          <div>
            Periode {startDate} - {endDate}
          </div>
          <div>{currentCompany?.nama}</div>
        </div>
      </div>
      <div>
        <div className="bg-gray-alurkerja-3 text-gray-alurkerja-1 font-bold p-4">
          {currentAccount?.kode_akun} - {currentAccount?.nama}
        </div>
        <table className="w-full table-auto">
          <thead className="border-y border-black-alurkerja-1">
            <tr>
              <th className="text-left p-4">Tanggal</th>
              <th className="text-left p-4">
                No. Transaksi - Keterangan Transaksi
              </th>
              <th className="p-4">Nilai Debit</th>
              <th className="p-4">Nilai Kredit</th>
              <th className="p-4">Saldo COA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4">-</td>
              <td className="p-4">Saldo Awal 01/11/2023</td>
              <td className="p-4">-</td>
              <td className="p-4">-</td>
              <td className="p-4">17.500.000</td>
            </tr>
            <tr>
              <td className="p-4 text-main-blue-alurkerja">12/12/2023</td>
              <td className="p-4 text-main-blue-alurkerja font-bold">
                TR-3.1023.0002 - Amortisasi sewa dibayar dimuka
                <div className="text-gray-alurkerja-1 font-normal">
                  (Amortasi Sewa Dibayar Dimuka)
                </div>
              </td>
              <td className="p-4">-</td>
              <td className="p-4">12.321.321</td>
              <td className="p-4">5.178.679</td>
            </tr>
            <tr className="bg-gray-alurkerja-3">
              <td></td>
              <td className="p-4 text-center font-bold text-black-alurkerja-1">
                Total Debit/Kredit
              </td>
              <td className="p-4">0.00</td>
              <td className="p-4">12.321.321</td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <div>
            <div>Saldo Awal : 17.500.000.00</div>
          </div>
          <div className="flex items-center gap-4">
            <div>Nilai Mutasi : (12.321.321.00)</div>
            <div>Saldo Akhir : 5.178.679.00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
