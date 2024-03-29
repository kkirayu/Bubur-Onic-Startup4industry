import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useCallback } from 'react'
import { formatToMoney } from '@/utils'
import { axiosInstance } from '@/api'
import { Spinner } from 'alurkerja-ui'


// Generated by https://quicktype.io

// Generated by https://quicktype.io

export interface PerubahanModalItem {
  akun_modal: AkunModal;
  storan_investor: AkunModal;
  saldo_penarikan_prive: AkunModal;
  laba_rugi: AkunModal;
  total_modal_berputar: number;
  permodalan_lainnya: AkunModal;
  total_modal: number;
}

export interface AkunModal {
  akun: Akun[];
  total: number;
}

export interface Akun {
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
}


export function ViewLaporanPerubahanModal() {
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

  const { data: report } = useQuery<PerubahanModalItem>({
    queryKey: ['laporan-perubahan-modal', companyID, startDate, endDate],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-perubahan-modal?company=${companyID}&start=${startDate}&end=${endDate}`
        )
        .then((res) => res.data?.data)
    },
  })

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-perubahan-modal/export?company=1&date=18/10/2023`,
        { responseType: 'blob' }
      )
    },
    onSuccess: (res) => {
      const fileName = `laporan-perubahan-modal.pdf`
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
          <div className="font-semibold">Laporan Perubahan Modal</div>
          <div>
            Periode {startDate} ~ {endDate}
          </div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="font-bold px-4 flex flex-col gap-2">
        <LaporanPerubahaanModalItem label="A) EQUITAS" item={report?.akun_modal}></LaporanPerubahaanModalItem>
        <LaporanPerubahaanModalItem label="B) SETORAN MODAL" item={report?.storan_investor}></LaporanPerubahaanModalItem>
        <LaporanPerubahaanModalItem label="C) PENARIKAN PRIVE" item={report?.saldo_penarikan_prive}></LaporanPerubahaanModalItem>
        <LaporanPerubahaanModalItem label="D) RUGI / LABA DITAHAN" item={report?.laba_rugi}></LaporanPerubahaanModalItem>
        <div className='w-full  flex flex-row justify-between pr-10'>
          <div className="text-gray-700 text-base ">
            TOTAL MODAL BERPUTAR
          </div>
          <div className="text-gray-700 text-base ">
            {report?.total_modal_berputar}
          </div>
        </div>
        <LaporanPerubahaanModalItem label="E) PERMODALAN LAINNYA" item={report?.permodalan_lainnya}></LaporanPerubahaanModalItem>

        <div className='w-full  flex flex-row justify-between pr-10'>
          <div className="text-gray-700 text-base ">
            TOTAL MODAL
          </div>
          <div className="text-gray-700 text-base ">
            {report?.total_modal}
          </div>
        </div>
      </div>
    </div>
  )
}
const LaporanPerubahaanModalItem = ({ item, label }: { item: AkunModal | undefined, label: String }) => {
  if (!item) return <></>
  return <>

    <div className="text-gray-700 text-lg font-bold ">
      {label}
    </div>

    <table className="w-full">
      <thead>
        <tr>
          <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-left w-[400px]">
            Modal Pemilik
          </th>
          <th className="text-gray-400 text-sm font-semibold bg-slate-100 p-3.5 text-center w-[242px]">
            Saldo
          </th>
        </tr>
      </thead>
      <tbody>
        {item?.akun.map((acc, i) => {
          return (
            <tr key={i}>
              <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y">
                {acc.kode_akun} - {acc.nama}
              </td>
              <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                {formatToMoney(acc.saldo)}
              </td>
            </tr>
          )
        })}
        <tr>
          <td className="text-zinc-800 text-xs px-3.5 py-2.5 border-y font-bold bg-slate-100">
            Total {label}
          </td>
          <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
            {formatToMoney(item?.total ? item?.total : 0)}
          </td>
        </tr>
      </tbody>
    </table>
  </>
}
