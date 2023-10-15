import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { axiosInstance } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function ViewLaporaNeraca() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const date = searchParams.get('date')

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
          <div>Periode {date}</div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="font-bold px-4">
        <div className="flex justify-between py-4">
          <div className="text-left text-gray-alurkerja-1">Aktiva</div>
          <div className="text-right">%</div>
        </div>
        <div className="flex justify-between pl-4 py-4">
          <div className="text-left text-gray-alurkerja-1">Aktifa Lancar</div>
          <div className="text-red-alurkerja text-right">%</div>
        </div>
        <div className="flex justify-between pl-8 py-4">
          <div className="text-left  text-red-alurkerja">
            Kas dan Setara Kas
          </div>
          <div className="text-red-alurkerja text-right">%</div>
        </div>

        {Array.from(Array(3), (i) => (
          <div className="flex justify-between pl-12 py-4" key={i}>
            <div className="text-left text-gray-alurkerja-1">
              1001001 - kas Kecil
            </div>

            <div className="text-gray-alurkerja-1 grid grid-cols-2">
              <div>150.000.000</div>
              <div className="text-right">0.54</div>
            </div>
          </div>
        ))}

        <div className="flex justify-between pl-8 py-4">
          <div className="text-left text-gray-alurkerja-1">
            Total Kas dan Setara Kas
          </div>
          <div className="text-gray-alurkerja-1 grid grid-cols-2">
            <div>150.000.000</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
