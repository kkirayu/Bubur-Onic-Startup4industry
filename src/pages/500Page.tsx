import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="lg:p-8 h-screen">
      <div className="flex items-center text-lg font-medium">Bubur Onic</div>
      <div className="h-full flex justify-center pt-20">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Halaman sedang tidak dapat diakses
          </h1>
          <p>
            Mohon maaf atas kendala yang dialami, harap menghubungi bagian
            administrator
          </p>
          <Link className=" text-blue-alurkerja" to="/">
            Kembali ke home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
