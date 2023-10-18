import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import clsx from 'clsx'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export function ViewLaporanBukuBesar() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const categoryAccountID = searchParams.get('group')
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

  const { data: currentCategoryAccount } = useQuery({
    queryKey: ['category-account', categoryAccountID],
    queryFn: async () => {
      return axiosInstance
        .get(`/akun/kategori-akun/${categoryAccountID}`)
        .then((res) => res.data?.data)
    },
  })

  const { data: report } = useQuery({
    queryKey: ['laporan-buku-besar'],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-buku-besar?company=1&group=asset&start=01/10/2023&end=18/10/2023`
        )
        .then((res) => res.data?.data)
    },
  })

  const totalDebit = useMemo(() => {
    let total = 0
    const mergedData = report?.reduce((result: any, currentObject: any) => {
      return result.concat(currentObject.items)
    }, [])

    mergedData?.forEach((transaction: any) => {
      total += +transaction.debit
    })

    return total
  }, [report])

  const totalCredit = useMemo(() => {
    let total = 0
    const mergedData = report?.reduce((result: any, currentObject: any) => {
      return result.concat(currentObject.items)
    }, [])

    mergedData?.forEach((transaction: any) => {
      total += +transaction.credit
    })

    return total
  }, [report])

  const totalSaldo = useMemo(() => {
    let total = 0

    report?.forEach((account: any) => {
      total += +account.balance
    })

    return total
  }, [report])

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
          {currentCategoryAccount?.nama}
        </div>
        <table className="w-full table-auto">
          <thead className="border-y border-black-alurkerja-1">
            <tr>
              <th className="text-left p-4">Tanggal</th>
              <th className="text-left p-4">
                No. Transaksi - Keterangan Transaksi
              </th>
              <th className="p-4 text-right">Nilai Debit</th>
              <th className="p-4 text-right">Nilai Kredit</th>
              <th className="p-4 text-right">Saldo COA</th>
            </tr>
          </thead>
          <tbody>
            {report?.map((item: any, i: number) => (
              <Fragment key={i}>
                <tr>
                  <td className="px-4 pt-4 text-main-blue-alurkerja">
                    {item.date}
                  </td>
                  <td className="px-4 pt-4 text-main-blue-alurkerja font-bold">
                    {item?.account_id[1]}
                  </td>
                </tr>
                {item?.items?.map((transaction: any, i: number) => {
                  return (
                    <tr key={i}>
                      <td className="px-4 text-right text-main-blue-alurkerja"></td>
                      <td className="px-4">{transaction?.move_name}</td>
                      <td className="px-4 text-right">
                        {formatToMoney(transaction.debit)}
                      </td>
                      <td className="px-4 text-right">
                        {formatToMoney(transaction.credit)}
                      </td>
                      <td className="px-4 text-right">
                        {formatToMoney(transaction.balance)}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="border-b"></td>
                  <td className="p-4 border-b font-bold">Total</td>
                  <td className="p-4 border-b text-right font-bold">
                    {formatToMoney(item.debit)}
                  </td>
                  <td className="p-4 text-right border-b font-bold">
                    {formatToMoney(item.credit)}
                  </td>
                  <td className="border-b"></td>
                </tr>
              </Fragment>
            ))}

            <tr className="bg-gray-alurkerja-3">
              <td></td>
              <td className="p-4 text-left font-bold text-black-alurkerja-1">
                Total Debit/Kredit
              </td>
              <td className="p-4 text-right">{formatToMoney(totalDebit)}</td>
              <td className="p-4 text-right">{formatToMoney(totalCredit)}</td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <div></div>
          <div className="flex items-center gap-6">
            <div>Nilai Mutasi : {formatToMoney(totalDebit - totalCredit)}</div>
            <div>Saldo Akhir : {formatToMoney(totalSaldo)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
