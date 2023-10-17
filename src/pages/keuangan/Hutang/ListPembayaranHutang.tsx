import { Modal, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Button } from '@/components'
export const ListPembayaranHutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const convertToJournal = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Konfirmasi',
      text: 'Apakah anda yakin untuk konversi ke penjurnalan ?',
      reverseButtons: true,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Batalkan',
      confirmButtonText: 'Lanjutkan',
      buttonsStyling: false,
      customClass: {
        cancelButton:
          'text-main-blue-alurkerja border border-main-blue-alurkerja px-[15px] py-2.5 text-base rounded mr-4',
        confirmButton:
          'bg-main-blue-alurkerja text-white disabled:bg-gray-alurkerja-2 px-[15px] py-2.5 text-base rounded',
      },
    })
  }

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Pembayaran Hutang
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Data Pembayaran Piutang"
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/journal/journal"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          customButtonDetail={() => (
            <Modal
              title="Detail Pembayaran Hutang"
              triggerButton={
                <button className="bg-green-alurkerja text-white h-7 w-7 inline-flex items-center justify-center text-base p-2 rounded">
                  <Eye size={10} />
                </button>
              }
              maxWidth="6xl"
            >
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 divide-x border-b">
                  <div className="p-[50px] space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Nomor Transaksi
                      </div>
                      <div className="text-main-blue-alurkerja text-sm font-semibold">
                        PAYMENT-2023-04-08/0001
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Tanggal Transaksi
                      </div>
                      <div className="text-sm font-semibold">08/04/2023</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Nama Supplier
                      </div>
                      <div className="text-sm font-semibold">
                        Karya Masyarakat Mandiri
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Akun Kas
                      </div>
                      <div className="text-sm font-semibold">
                        Bank Syariah Indonesia-7146680342
                      </div>
                    </div>
                  </div>
                  <div className="p-[50px] space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Jenis Pembayaran
                      </div>
                      <div className="text-sm font-semibold">Transfer</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Nama Bank
                      </div>
                      <div className="text-sm font-semibold">
                        Bank Syariah Indonesia
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Nomor Rekening
                      </div>
                      <div className="text-sm font-semibold">7146680342</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Nama Pemilik Rekening
                      </div>
                      <div className="text-sm font-semibold">
                        PT. Karya Masyarakat Mandiri
                      </div>
                    </div>
                  </div>
                  <div className="p-[50px] space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Catatan
                      </div>
                      <div className="text-sm font-semibold">-</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">
                        Invoice
                      </div>
                      <div className="text-sm font-semibold">
                        <div className="text-sky-500 text-sm font-semibold underline">
                          Invoice 1234.pdf
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-[50px]">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-3.5 text-gray-400 text-sm font-semibold">
                          No. Invoice
                        </th>
                        <th className="p-3.5 text-gray-400 text-sm font-semibold">
                          Tanggal Invoice
                        </th>
                        <th className="p-3.5 text-gray-400 text-sm font-semibold">
                          Tanggal Jatuh Tempo
                        </th>
                        <th className="p-3.5 text-gray-400 text-sm font-semibold">
                          Nominal Bayar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-zinc-800 text-xs px-3.5 py-5">
                          Data1
                        </td>
                        <td className="text-zinc-800 text-xs px-3.5 py-5">
                          Data1
                        </td>
                        <td className="text-zinc-800 text-xs px-3.5 py-5">
                          Data1
                        </td>
                        <td className="text-zinc-800 text-xs px-3.5 py-5">
                          Data1
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full h-12 bg-slate-100 rounded-bl rounded-br justify-end items-center gap-3.5 inline-flex px-6">
                    <div className="text-gray-700 text-sm font-semibold">
                      Total Pembayaran :
                    </div>
                    <div className="text-gray-700 text-sm font-semibold ">
                      0.00
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t">
                  <div className="w-fit ml-auto">
                    <Button color="orange" onClick={() => convertToJournal()}>
                      Konversi ke Penjurnalan
                    </Button>
                  </div>
                </div>
              </>
            </Modal>
          )}
          column={[
            { key: 'name', label: 'No. Pembayaran' },
            { key: 'name', label: 'Tanggal Bayar' },
            { key: 'name', label: 'Jam Pembayaran' },
            { key: 'name', label: 'Akun Kas' },
            { key: 'name', label: 'Total' },
            { key: 'name', label: 'Status' },
          ]}
          extraButton={() => (
            <Button
              className="flex items-center gap-1"
              color="orange"
              size="small"
            >
              <Download size={18} /> Download
            </Button>
          )}
          onClickCreate={() => navigate('create')}
        />
      </section>
    </div>
  )
}
