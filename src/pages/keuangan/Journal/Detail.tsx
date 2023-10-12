import { useContext, useMemo } from 'react'
import { Input, Select, Skeleton } from 'alurkerja-ui'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Dialog, Button } from '@/components'
import { axiosInstance, getListAccount } from '@/api'
import { JournalContext } from './Layout'

export const DetailJurnal = () => {
  const { data: listAccount } = getListAccount()
  const navigate = useNavigate()
  const detailJournal = useContext(JournalContext)

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, type }: { id: number; type: 'post' | 'un-post' }) => {
      return axiosInstance.post(`/journal/journal/${id}/${type}`)
    },
    onSuccess: (data) => {
      const res = data.data
      Dialog.success({
        description: !res.posted_by
          ? 'Berhasil memposting journal'
          : 'Berhasil unpost journal',
        callback: () => {
          navigate('/keuangan/journal')
        },
      })
    },
    onError: (err: any) => {
      if (err.response.status === 422) {
        Dialog.error({ description: err.response.data.message })
      } else {
        Dialog.error()
      }
    },
  })

  const listOptionAccount = useMemo(() => {
    return listAccount?.map((acc: any) => ({
      ...acc,
      label: acc.nama,
      value: acc.id,
    }))
  }, [listAccount])

  const totalCredit = useMemo(() => {
    let total = 0
    if (detailJournal?.journal_akuns) {
      detailJournal.journal_akuns
        .filter((transaction) => transaction.posisi_akun === 'CREDIT')
        .forEach((transaction) => {
          total += +transaction.jumlah
        })
    }

    return total
  }, [detailJournal])

  const totalDebit = useMemo(() => {
    let total = 0
    if (detailJournal?.journal_akuns) {
      detailJournal.journal_akuns
        .filter((transaction) => transaction.posisi_akun === 'DEBIT')
        .forEach((transaction) => {
          total += +transaction.jumlah
        })
    }

    return total
  }, [detailJournal])

  const onSubmit = () => {
    if (detailJournal) {
      detailJournal.posted_by
        ? mutate({ id: detailJournal.id, type: 'un-post' })
        : mutate({ id: detailJournal.id, type: 'post' })
    }
  }

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Detail Jurnal</h3>
      <div className="grid grid-cols-4 gap-4 px-10 mb-8">
        <div>
          <label htmlFor="">Nomor Jurnal</label>
          <Input readOnly value={detailJournal?.kode_jurnal} />
          <span className="text-gray-alurkerja-2 text-xs">
            Parena Akun (kosongkan jika akun parent)
          </span>
        </div>
        <div>
          <label
            htmlFor="tanggal_transaksi"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal
          </label>
          <Input
            type="date"
            readOnly
            value={detailJournal?.tanggal_transaksi}
          />
          <span className="text-gray-alurkerja-2 text-xs">Kode Akun</span>
        </div>
        <div className="col-span-2"></div>
        <div>
          <label
            htmlFor="judul"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Judul Jurnal
          </label>
          <Input readOnly value={detailJournal?.judul} />
          <span className="text-gray-alurkerja-2 text-xs">
            Posisi Akun Kredit
          </span>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-3">
          <label
            htmlFor="deskripsi"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Deskripsi
          </label>
          <Input textArea readOnly value={detailJournal?.deskripsi} />
          <span className="text-gray-alurkerja-2 text-xs">Deskripsi Akun</span>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <label
            htmlFor="status"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Status Jurnal
          </label>
          <div className="flex items-center gap-4">
            {!detailJournal ? (
              <Skeleton />
            ) : (
              <>
                <Input
                  readOnly
                  value={detailJournal.posted_by ? 'Posted' : 'Draft'}
                />
                <Button loading={isLoading} onClick={() => onSubmit()}>
                  {detailJournal.posted_by ? 'Unpost' : 'Post'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-10 mb-6">
        <table className="w-full table-auto">
          <thead className="bg-[#F8F9FD]">
            <tr className="uppercase text-left">
              <th className="px-3 py-4">account</th>
              <th className="px-3 py-4">debit</th>
              <th className="px-3 py-4">credit</th>
              <th className="px-3 py-4">description</th>
              <th className="px-3 py-4">amount</th>
            </tr>
          </thead>
          <tbody>
            {detailJournal?.journal_akuns.map((transaction, i) => (
              <tr key={`account-row-${i + 1}`}>
                <td className="px-3 py-2.5">
                  <Select
                    isDisabled
                    value={listOptionAccount?.filter(
                      (acc) => acc.id === transaction.akun
                    )}
                    options={listOptionAccount}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    readOnly
                    type="number"
                    placeholder="Debit"
                    value={
                      transaction.posisi_akun === 'DEBIT'
                        ? transaction.jumlah
                        : undefined
                    }
                    disabled={transaction.posisi_akun === 'CREDIT'}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    readOnly
                    type="number"
                    placeholder="Credit"
                    disabled={transaction.posisi_akun === 'DEBIT'}
                    value={
                      transaction.posisi_akun === 'CREDIT'
                        ? transaction.jumlah
                        : undefined
                    }
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    readOnly
                    value={transaction.deskripsi}
                    placeholder="Description"
                  />
                </td>
                <td className="text-center">{transaction.jumlah}.00</td>
              </tr>
            ))}

            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Credit (Rp)</td>
              <td className="px-3 py-2.5">{totalCredit}.00</td>
            </tr>
            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Debit (Rp)</td>
              <td className="px-3 py-2.5">{totalDebit}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
