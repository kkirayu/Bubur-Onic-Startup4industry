import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { formatToMoney, formatToMoneyInverted } from '@/utils'
import { axiosInstance } from '@/api'
import { Spinner } from 'alurkerja-ui'
import _ from 'underscore'

interface LabaRugiReportItem {
  key: string;
  value: Value[];
  total: number;
  isInverted: boolean;
}

interface Value {
  id: number;
  nama: string;
  deskripsi: string;
  perusahaan_id: number;
  cabang_id: number;
  parent_kategori_akun: number;
  created_at: null;
  updated_at: null;
  created_by: null;
  updated_by: null;
  deleted_by: null;
  deleted_at: null;
  prefix_akun: string;
  total_awal: number;
  total_akhir: number;
  akun: Akun[];
}

interface Akun {
  id: number;
  kode_akun: string;
  perusahaan_id: number;
  cabang_id: number;
  nama: string;
  deskripsi: string;
  kategori_akun_id: number;
  is_kas: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: null;
  deleted_by: null;
  deleted_at: null;
  saldo: number;
  saldo_awal: number;
}
export function ViewLaporaLabaRugi() {
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

  const { data: report } = useQuery<LabaRugiReportItem[]>({
    queryKey: ['laporan-laba-rugi', companyID, startDate, endDate],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-laba-rugi?company=${companyID}&start=${startDate}&end=${endDate}`
        )
        .then((res) => res.data?.data)
    },
  })

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-laba-rugi/export?company=1&date=18/10/2023`,
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
          <div className="font-semibold">Laporan Laba Rugi</div>
          <div>
            Periode {startDate} ~ {endDate}
          </div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="px-4">
        {report?.map((neraca, i) => {
          let total = 0
          return (
            <Fragment key={i}>
              <div className="text-gray-700 text-base font-bold ">
                {neraca.key === 'Kewajiban' ? 'Pasiva' : neraca.key}
              </div>
              {neraca.value.map((group, i) => {
                // total += group.total_akhir
                return (
                  <div className="mb-4" key={i}>
                    <div className="text-gray-700 text-sm font-normal">
                      {group.nama}
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
                          {group.akun.map((acc, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y">
                                  {acc.kode_akun} - {acc.nama}
                                </td>
                                <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                                  {formatToMoney(acc.saldo_awal)}
                                </td>
                                <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                                  {formatToMoney(
                                    acc.saldo - acc.saldo_awal
                                  )}
                                </td>
                                <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                                  {formatToMoney(acc.saldo)}
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td className="text-zinc-800 text-xs px-3.5 py-2.5 border-y font-bold bg-slate-100">
                              Total {group.nama}
                            </td>
                            <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                              {formatToMoney(group.total_awal)}
                            </td>
                            <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                              {formatToMoney(
                                group.total_akhir - group.total_awal
                              )}
                            </td>
                            <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                              {formatToMoney(group.total_akhir)}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                )
              }

              )}
              <div className="mb-6">
                Total {neraca.key} : {formatToMoney(neraca.total)}
              </div>
            </Fragment>
          )
        })}
        <hr className="mb-4" />

        <table>

          {report?.map((neraca, i) => {
            return <>
              <tr>
                <td>

                  <div className="font-semibold text-main-blue-alurkerja p-1">
                    Total {neraca.key}
                  </div>
                </td>
                <td>

                  <div>
                    {formatToMoneyInverted(neraca.total)}</div>
                </td>
              </tr>
            </>
          })}
          <tr>
            <td>
              <div className="font-semibold text-main-blue-alurkerja p-1">
                Laba Bersih/Rugi
              </div>
            </td>
            <td>
              <div>
                {formatToMoneyInverted(
                  _.reduce(
                    report || [],
                    (memo, item) => memo + (item.isInverted ? item.total * -1 : item.total ),
                    0
                  )
                )}
              </div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  )
}
