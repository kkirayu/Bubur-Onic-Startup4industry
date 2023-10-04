import { Component } from 'react'
import Swal from 'sweetalert2'

type DialogProps = {
  title?: string
  description?: string
  callback?: () => void
}

export class Dialog extends Component {
  static success = (arg?: DialogProps) => {
    Swal.fire({
      title: arg?.title ?? 'Success',
      text: arg?.description || 'Data Submitted!',

      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      arg?.callback?.()
    })
  }
}
