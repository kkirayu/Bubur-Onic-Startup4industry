import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '@/api'
import { Company } from '@/utils'
import { Button } from '@/components'

export const DetailCompany = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [company, setCompany] = useState<Company>()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    if (id) {
      axiosInstance
        .get('/saas/perusahaan/' + id, {
          signal: signal,
        })
        .then((res) => {
          if (res.status === 200) {
            setCompany(res.data.data)
          }
        })
    }
    return () => {
      abortController.abort()
    }
  }, [id])

  return (
    <div className="bg-white p-6 space-y-4">
      <h6 className="font-bold text-xl">{company?.nama}</h6>
      <div>Kode: {company?.kode_perusahaan}</div>
      <div>Alamat: {company?.alamat}</div>
      <hr />
      <h6 className="font-semibold text-lg">Cabang</h6>
      <ul className="px-4 list-decimal">
        {company?.cabang.map((item, i) => (
          <li key={i}>
            <span className="font-semibold">{item.nama}</span>
            <div>Kode Cabang: {item.kode_cabang}</div>
            <div>Alamat: {item.alamat}</div>
          </li>
        ))}
      </ul>
      <Button variant="outlined" block onClick={() => navigate(-1)}>
        Kembali
      </Button>
    </div>
  )
}
