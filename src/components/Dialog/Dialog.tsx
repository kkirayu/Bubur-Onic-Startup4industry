import { Component } from 'react'
import Swal from 'sweetalert2'

type DialogProps = {
  title?: string
  description?: string
  callback?: () => void
}

export class Dialog extends Component {
  static success = (param?: DialogProps) => {
    Swal.fire({
      icon: 'success',
      title: param?.title || 'Success',
      html: param?.description || 'Data Submitted!',
    }).then(param?.callback)
  }
}

export default Dialog
