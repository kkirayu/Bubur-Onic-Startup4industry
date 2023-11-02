import { Component } from 'react'
import Swal from 'sweetalert2'

type DialogProps = {
  title?: string
  description?: string
  callback?: () => void
}

export class Dialog extends Component {
  static success = (arg?: DialogProps) => {
    return Swal.fire({
      title: arg?.title ?? 'Success',
      text: arg?.description || 'Data Submitted!',

      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      arg?.callback?.()
    })
  }
  static error = (arg?: DialogProps) => {
    Swal.fire({
      title: arg?.title ?? 'Gagal',
      text: arg?.description || 'Gagal menyimpan',
      icon: 'error',
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      arg?.callback?.()
    })
  }
  static confirm = (arg?: DialogProps) => {
    return Swal.fire({
      title: arg?.title ?? 'Konfirmasi',
      text: arg?.description || 'Apakah anda yakin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        cancelButton:
          'text-main-blue-alurkerja border border-main-blue-alurkerja px-[15px] py-2.5 text-base rounded mr-4',
        confirmButton:
          'bg-main-blue-alurkerja text-white disabled:bg-gray-alurkerja-2 px-[15px] py-2.5 text-base rounded',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        arg?.callback?.()
      }
    })
  }
}
