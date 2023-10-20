import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { axiosInstance } from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import { formatToMoney } from '@/utils'
import { Spinner } from 'alurkerja-ui'

export function ViewLaporanJournal() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const type = searchParams.get('type')
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

  const { data: report } = useQuery({
    queryKey: ['laporan-journal'],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-journal?company=${companyID}&type=${type}&start=${startDate}&end=${endDate}`
        )
        .then((res) => res.data?.data)
    },
  })

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-journal/export?company=${companyID}&type=${type}&start=${startDate}&end=${endDate}`,
        { responseType: 'blob' }
      )
    },
    onSuccess: (res) => {
      const fileName = `Laporan-Journal.pdf`
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

  const totalDebit = useMemo(() => {
    let total = 0
    if (report) {
      report.forEach((item: any) => {
        total += +item.total_debit
      })
    }

    return total
  }, [report])

  const totalKredit = useMemo(() => {
    let total = 0
    if (report) {
      report.forEach((item: any) => {
        total += +item.total_kredit
      })
    }

    return total
  }, [report])

  return (
    <div className="px-4 pb-12 bg-white">
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
          <div className="font-semibold">Laporan journal </div>
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
            {report?.map((item: any, i: number) => (
              <Fragment key={i}>
                <tr>
                  <td className="p-2.5">{item.tanggal_transaksi}</td>
                  <td className="font-semibold p-2.5">{item.kode_jurnal}</td>
                  <td></td>
                  <td></td>
                </tr>
                {item.journal_akuns?.map((akuns: any, i: number) => {
                  const accountName = akuns.akun
                    ? akuns.akun?.kode_akun + ' - ' + akuns.akun?.nama
                    : '-'
                  return (
                    <tr key={i}>
                      <td></td>
                      <td className="pl-14 pr-2.5 py-1">{accountName}</td>
                      <td className="text-center">
                        {akuns.posisi_akun === 'DEBIT'
                          ? formatToMoney(akuns.jumlah)
                          : '-'}
                      </td>
                      <td className="text-center">
                        {akuns.posisi_akun === 'CREDIT'
                          ? formatToMoney(akuns.jumlah)
                          : '-'}
                      </td>
                    </tr>
                  )
                })}

                <tr className="bg-gray-alurkerja-3 border-y border-y-black-alurkerja-1">
                  <td></td>
                  <td></td>
                  <td className="text-center p-4">
                    {formatToMoney(item.total_debit)}
                  </td>
                  <td className="text-center p-4">
                    {formatToMoney(item.total_debit)}
                  </td>
                </tr>
              </Fragment>
            ))}
            <tr>
              <td>Total Transaksi</td>
              <td>Total Transaksi</td>
              <td className="text-center">{formatToMoney(totalDebit)}</td>
              <td className="text-center">{formatToMoney(totalKredit)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
