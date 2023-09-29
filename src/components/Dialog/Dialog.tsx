import { Component } from 'react'
import Swal from 'sweetalert2'

export class Dialog extends Component {
  static success = (
    callback = () => {},
    title = 'Success',
    description = 'Data Submitted!'
  ) => {
    Swal.fire({
      icon: 'success',
      title: title,
      html: description,
    }).then(callback)
  }
}

export default Dialog
