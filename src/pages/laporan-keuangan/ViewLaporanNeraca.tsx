import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { formatToMoney } from '@/utils'
import { axiosInstance } from '@/api'

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
}

export interface Group {
  account_root_id_count: number
  date: string
  debit: number
  credit: number
  discount_amount_currency: number
  balance: number
  amount_residual: number
  amount_residual_currency: number
  account_root_id?: (number | string)[] | null
  items: Items[]
}

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

  const { data: report } = useQuery<ReportNeraca[]>({
    queryKey: ['laporan-neraca'],
    queryFn: async () => {
      return axiosInstance
        .get(`/laporan/laporan-neraca?company=1&date=18/10/2023`)
        .then((res) => res.data?.data)
    },
  })

  const listAccount = useMemo(() => {
    return report?.reduce((mergedItems: Items[], { group }) => {
      group.forEach((item) => {
        item.items.forEach((account) => {
          mergedItems.push(account)
        })
      })
      return mergedItems
    }, [])
  }, [report])

  const totalBalance = useMemo(() => {
    let total = 0

    listAccount?.forEach((acc) => {
      total += +acc.balance
    })

    return total
  }, [listAccount])

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
          <div className="font-semibold">Laporan Neraca</div>
          <div>Periode {date}</div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="font-bold px-4">
        <div className="flex justify-between py-4">
          <div className="text-left text-gray-alurkerja-1">Aktiva</div>
          <div className="text-right">%</div>
        </div>
        <div className="flex justify-between pl-4 py-4 text-main-blue-alurkerja">
          <div className="text-left ">Aktiva Lancar</div>
          <div className="text-right">%</div>
        </div>

        {listAccount?.map((acc, i) => (
          <div className="grid grid-cols-12 pl-8 py-4" key={i}>
            <div className="col-span-8 text-left text-gray-alurkerja-1">
              {acc.account_id?.[1]}
            </div>

            <div className="col-span-4 text-gray-alurkerja-1 grid grid-cols-2">
              <div className="text-right">{formatToMoney(acc.balance)}</div>
              <div className="text-right">0.54</div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-12 pl-4 py-4">
          <div className="col-span-8 text-left text-main-blue-alurkerja">
            Total Aktiva Lancar
          </div>
          <div className="col-span-4 text-main-blue-alurkerja grid grid-cols-2">
            <div className="text-right">{formatToMoney(totalBalance)}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
