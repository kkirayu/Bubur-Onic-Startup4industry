import Swal from 'sweetalert2'
import { Modal } from 'alurkerja-ui'
import { Eye } from 'lucide-react'

import { Button } from '@/components'

export const ModalDetailPembayaranHutang = () => {
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
              <div className="text-gray-400 text-sm font-semibold">Catatan</div>
              <div className="text-sm font-semibold">-</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-semibold">Invoice</div>
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
                <td className="text-zinc-800 text-xs px-3.5 py-5">Data1</td>
                <td className="text-zinc-800 text-xs px-3.5 py-5">Data1</td>
                <td className="text-zinc-800 text-xs px-3.5 py-5">Data1</td>
                <td className="text-zinc-800 text-xs px-3.5 py-5">Data1</td>
              </tr>
            </tbody>
          </table>
          <div className="w-full h-12 bg-slate-100 rounded-bl rounded-br justify-end items-center gap-3.5 inline-flex px-6">
            <div className="text-gray-700 text-sm font-semibold">
              Total Pembayaran :
            </div>
            <div className="text-gray-700 text-sm font-semibold ">0.00</div>
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
  )
}
