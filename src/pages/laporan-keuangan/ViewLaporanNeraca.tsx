import { useSearchParams } from 'react-router-dom'
import { RefreshCcw, Printer, Upload } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useCallback } from 'react'
import { formatToMoney } from '@/utils'
import { axiosInstance } from '@/api'
import { Spinner } from 'alurkerja-ui'

// Generated by https://quicktype.io

interface LaporanNeracaReportNeraca {
  value: string;
  key:   LaporanNeracaDatumKey[];
}

interface LaporanNeracaDatumKey {
  value:       string;
  key:         LaporanNeracaKeyKey[];
  total_awal:  number;
  total_akhir: number;
}

interface LaporanNeracaKeyKey {
  account_id_count:         number;
  date:                     string;
  debit:                    number;
  credit:                   number;
  discount_amount_currency: boolean | number;
  balance:                  number;
  amount_residual:          number;
  amount_residual_currency: number;
  account_id:               Array<number | string>;
  balance_start:            number;
  journals:                 LaporanNeracaJournal[];
}

interface LaporanNeracaJournal {
  id:                       number;
  analytic_precision:       number;
  move_id:                  Array<number | string>;
  date:                     string;
  company_id:               Array<CompanyIDEnum | number>;
  journal_id:               Array<JournalIDEnum | number>;
  move_name:                string;
  account_id:               Array<number | string>;
  partner_id:               Array<number | string> | boolean;
  ref:                      boolean | string;
  product_id:               boolean;
  name:                     boolean | string;
  tax_ids:                  any[];
  amount_currency:          number;
  currency_id:              Array<CompanyCurrencyIDEnum | number>;
  debit:                    number;
  credit:                   number;
  tax_tag_ids:              any[];
  discount_date:            boolean;
  discount_amount_currency: number;
  tax_line_id:              boolean;
  date_maturity:            boolean | string;
  balance:                  number;
  matching_number:          boolean;
  amount_residual:          number;
  amount_residual_currency: number;
  analytic_distribution:    boolean;
  move_type:                MoveType;
  parent_state:             ParentState;
  account_type:             AccountType;
  statement_line_id:        boolean;
  company_currency_id:      Array<CompanyCurrencyIDEnum | number>;
  is_same_currency:         boolean;
  is_account_reconcile:     boolean;
  sequence:                 number;
}

 enum AccountType {
  AssetCash = "asset_cash",
  AssetCurrent = "asset_current",
  AssetFixed = "asset_fixed",
  AssetReceivable = "asset_receivable",
  LiabilityCurrent = "liability_current",
}

 enum CompanyCurrencyIDEnum {
  Idr = "IDR",
}

 enum CompanyIDEnum {
  MyCompany = "My Company",
}

 enum JournalIDEnum {
  CustomerInvoices = "Customer Invoices",
  MiscellaneousOperations = "Miscellaneous Operations",
}

export enum MoveType {
  Entry = "entry",
  OutInvoice = "out_invoice",
}

export enum ParentState {
  Posted = "posted",
}

export function ViewLaporaNeraca() {
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

  const { data: report } = useQuery<LaporanNeracaReportNeraca[]>({
    queryKey: ['laporan-neraca', companyID, startDate, endDate],
    queryFn: async () => {
      return axiosInstance
        .get(
          `/laporan/laporan-neraca?company=${companyID}&start=${startDate}&end=${endDate}`
        )
        .then((res) => res.data?.data)
    },
  })

  const { mutate: exportLaporan, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.get(
        `/laporan/laporan-neraca/export?company=1&date=18/10/2023`,
        { responseType: 'blob' }
      )
    },
    onSuccess: (res) => {
      const fileName = `Laporan-Neraca.pdf`
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
          <div className="font-semibold">Laporan Neraca</div>
          <div>
            Periode {startDate} ~ {endDate}
          </div>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className="font-bold px-4">
        {report?.map((neraca, i) => (
          <Fragment key={i}>
            <div className="text-gray-700 text-base font-bold ">
              {neraca.value}
            </div>
            {neraca.key.map((group, i) => (
              <div className="mb-6" key={i}>
                <div className="text-gray-700 text-sm font-normal">
                  {group.value}
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
                     {group.key.map((acc, i) => {
                       return (
                         <tr>
                           <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y">
                             {acc.account_id?.[1]} 
                           </td>
                           <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                             {formatToMoney(acc.balance_start)}
                           </td>
                           <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                             {formatToMoney(acc.balance - acc.balance_start)}
                           </td>
                           <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y text-center">
                             {formatToMoney(acc.balance)}
                           </td>
                         </tr>
                       )
                     })}
                     <tr>
                       <td className="text-zinc-800 text-xs px-3.5 py-2.5 border-y font-bold bg-slate-100">
                         Total {group.value}
                       </td>
                       <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                         {formatToMoney(group.total_awal)}
                       </td>
                       <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                         {formatToMoney(group.total_akhir -group.total_awal)}
                       </td>
                       <td className="text-zinc-800 text-xs font-normal px-3.5 py-2.5 border-y bg-slate-100 text-center">
                         {formatToMoney(group.total_akhir)}
                       </td>
                     </tr>
                   </tbody>
                 </table>
                </div>
              </div>
            ))}

          </Fragment>
        ))}
      </div>
    </div>
  )
}
