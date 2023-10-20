import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useCallback } from 'react'
import { formatToMoney } from '@/utils'
import { axiosInstance } from '@/api'

export function ViewLaporaLabaRugi() {
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

  const { data: report } = useQuery<any[]>({
    queryKey: ['laporan-laba-rugi'],
    queryFn: async () => {
      return axiosInstance
        .get(`/laporan/laporan-laba-rugi?company=1&date=18/10/2023`)
        .then((res) => res.data?.data)
    },
  })

  return (
    <div className="px-4 pb-6 bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-base font-bold uppercase leading-normal">
          LAPORAN
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
          <div className="font-semibold">Laporan Laba Rugi</div>
          <div>Periode {date}</div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="px-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Keterangan</th>
              <th className="text-left p-2 border-b">Saldo Awal</th>
              <th className="text-left p-2 border-b">Saldo Akhir</th>
              <th className="text-left p-2 border-b">Selisi Saldo</th>
            </tr>
          </thead>
          <tbody>
            {report?.map((item, i) => (
              <Fragment key={i}>
                <tr>
                  <td className="font-semibold text-main-blue-alurkerja p-1">
                    {item.value}
                  </td>
                </tr>
                {item.group.map((accRoot: any, i: number) => (
                  <Fragment key={i}>
                    <tr>
                      <td className="p-1 font-semibold">
                        {accRoot.account_root_id[1]}{' '}
                        <span className="font-normal text-sm">
                          ({accRoot.tanggal_awal} s/d {accRoot.tanggal_akhir})
                        </span>
                      </td>
                    </tr>
                    {accRoot.items.map((transaction: any, i: number) => (
                      <tr key={i}>
                        <td className="px-4 py-1">
                          |--{transaction.account_id[1]}
                        </td>
                        <td>
                          {formatToMoney(transaction.saldo.dataAwal.saldo)}
                        </td>
                        <td>
                          {formatToMoney(transaction.saldo.dataAkhir.saldo)}
                        </td>
                        <td>{formatToMoney(transaction.saldo.selisih)}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
