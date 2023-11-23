import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import clsx from 'clsx'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'
import { Spinner } from 'alurkerja-ui'
import _ from 'underscore'
import moment from 'moment'

export function ViewLaporanBukuBesar() {
  const [searchParams] = useSearchParams()

  const companyID = searchParams.get('company')
  const group = searchParams.get('group')
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  const coa = searchParams.get('coa')

  const { data: currentCompany } = useQuery({
    queryKey: ['company', companyID],
    queryFn: async () => {
      return axiosInstance
        .get(`/saas/perusahaan/${companyID}`)
        .then((res) => res.data?.data)
    },
  })

  const { data: report } = useQuery({
    queryKey: ['laporan-buku-besar', group, startDate, endDate, coa, companyID],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-buku-besar?company=${companyID}&group=${group}&coa=${coa}&start=${startDate}&end=${endDate}`
        )
        .then((res) => res.data?.data)
    },
  })

  const totalDebit = useMemo(() => {
    if (report) {
      return _.reduce(
        report.report,
        (total, n) => {
          console.log(n, "yang ini")
              return (total += n.posisi_akun == 'DEBIT' ? +n.jumlah : 0 )
        },
        0
      )
    }
    return 0
  }, [report])

  const totalCredit = useMemo(() => {
    if (report) {
      return _.reduce(
        report.report,
        (total, n) => {
              return (total += n.posisi_akun == 'CREDIT' ? +n.jumlah : 0)
        },
        0
      )
    }
    return 0
  }, [report])

  // const totalSaldo = useMemo(() => {
  //   let total = 0
  //   if (report) {
  //     return _.reduce(
  //       report.report,
  //       (total, n) => {
  //         console.log(n)
  //         return (total += +n.balance)
  //       },
  //       0
  //     )
  //   }
  //   return 0
  // }, [report])

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-buku-besar/export?company=1&group=asset&start=01/10/2023&end=18/10/2023`,
        { responseType: 'blob' }
      )
    },
    onSuccess: (res) => {
      const fileName = `Laporan-Buku-Besar.pdf`
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

  let balance_in_line = report?.saldoAwal

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
          <div className="font-semibold">Laporan Buku Besar</div>
          <div>
            Periode {startDate} - {endDate}
          </div>
          <div>{currentCompany?.nama}</div>
        </div>
      </div>
      <div>
        {report ? (
          <>
            <div className="bg-gray-alurkerja-3 text-gray-alurkerja-1 font-bold p-4 uppercase">
              {report.akun.display_name}
            </div>
            <table className="w-full table-auto">
              <thead className="border-y border-black-alurkerja-1">
                <tr>
                  <th className="text-left p-4">Tanggal</th>
                  <th className="text-left p-4">No. Transaksi</th>
                  <th className="text-left p-4">Keterangan</th>
                  <th className="p-4 text-right">Nilai Debit</th>
                  <th className="p-4 text-right">Nilai Kredit</th>
                  <th className="p-4 text-right">Saldo</th>
                  <th className="text-center p-4">Akun Lawan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b">
                    {moment(startDate).format('YYYY-MM-DD')}
                  </td>
                  <td className="border-b">00000</td>
                  <td className="border-b">Saldo Awal</td>
                  <td className="p-4 border-b text-right">
                    {formatToMoney(0)}
                  </td>
                  <td className="p-4 text-right border-b">
                    {formatToMoney(0)}
                  </td>
                  <td className="p-4 text-right border-b">
                    {formatToMoney(balance_in_line)}
                  </td>
                  <td className="px-4 pt-4 text-main-blue-alurkerja text-center">
                    -
                  </td>
                </tr>
                      {report.report.map((item: any, i: number) => {
                        if (item.posisi_akun === 'DEBIT') {
                          balance_in_line -= item.jumlah
                        } else {
                          balance_in_line += item.jumlah
                        }
                        return (
                          <Fragment key={i}>
                            <tr>
                              <td className="border-b">{item.tanggal_transaksi}</td>

                              <td className="border-b">
                                {item.kode_jurnal}
                              </td>

                              <td className="border-b">
                                {item.deskripsi}
                              </td>

                              <td className="p-4 border-b text-right ">
                                {formatToMoney(
                                  item.posisi_akun == 'DEBIT' ? item.jumlah : 0
                                )}
                              </td>
                              <td className="p-4 text-right border-b ">
                                {formatToMoney(
                                  item.posisi_akun == 'CREDIT' ? item.jumlah : 0
                                )}
                              </td>
                              <td className="p-4 text-right border-b ">
                                {formatToMoney(item.saldo_di_line)}
                              </td>
                              <td className="px-4 text-main-blue-alurkerja text-left">
                                ({item?.akun_instance.kode_akun}) {item?.akun_instance.nama}
                              </td>
                            </tr>
                          </Fragment>
                        )
                      })}

                <tr className="bg-gray-alurkerja-3">
                  <td
                    colSpan={3}
                    className="p-4 text-left font-bold text-black-alurkerja-1"
                  >
                    Total Debit/Kredit
                  </td>
                  <td className="p-4 text-right">
                    {formatToMoney(totalDebit)}
                  </td>
                  <td className="p-4 text-right">
                    {formatToMoney(totalCredit)}
                  </td>
                  <td colSpan={2} className="p-4"></td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-between p-4">
              <div></div>
              <div className="flex items-center gap-6">
                <div>Saldo Awal : {formatToMoney(report?.saldoAwal)}</div>
                <div>
                  Nilai Mutasi : {formatToMoney(report.saldoAkhir - report.saldoAwal)}
                </div>
                <div>Saldo Akhir : {formatToMoney(report.saldoAkhir)}</div>
              </div>
            </div>
          </>
        ) : (
          <>Mengambil Data</>
        )}
      </div>
    </div>
  )
}
