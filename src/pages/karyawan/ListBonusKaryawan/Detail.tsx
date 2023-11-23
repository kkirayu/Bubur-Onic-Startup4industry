import { Input, Select, Switch } from 'alurkerja-ui'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListTeam } from '@/api'
import { useEffect } from 'react'


export const DetailListBonus = () => {
  const { listOption: listOptionTeam, isLoading: loadingListTeam } =
    getListTeam()
  const navigate = useNavigate()
  const { id } = useParams()
  const { handleSubmit, setValue, watch, register } = useForm()

  const { data } = useQuery({
    queryKey: ['profil-pegawai', id],
    queryFn: async () => {
      return axiosInstance
        .get(`/pegawai/profil-pegawai/${id}`)
        .then((res) => res.data?.data)
    },
  })



  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.put(`/pegawai/profil-pegawai/${id}`, payload)
    },
  })

  const onSubmit = (body: FieldValues) => {
    const payload: FieldValues = {
      ...body,
    } as FieldValues

    mutate(payload)
  }

  return (
    <section className="bg-white rounded p-6 w-2/3 mx-auto">
      <h3 className="text-sm font-semibold font-['Poppins'] leading-tight">
        Detail Bonus Karyawan
      </h3>
      <div className="p-5 grid grid-cols- gap-4 mb-6 flex">
        <div className="flex">
          <div className="w-1/2 pr-2">
            <label htmlFor="kode_pegawai">Pegawai</label>
            <Input {...register('kode_pegawai')} readOnly />
          </div>

          <div className="w-1/2">
            <label htmlFor="">Jumlah</label>
            <Input type="number" defaultValue={0} prefix="RP" readOnly />
          </div>
        </div>

        <div className="">
          <label htmlFor="">Alasan Bonus</label>
          <Input type="text-area" className="h-20" readOnly />
        </div>

        <div className="flex">
          <div className="w-1/2 pr-2">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Bukti
            </label>

            <Input readOnly/>
          </div>
          <div className="w-1/2">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Periode Bonus
            </label>
            <Input type="date" readOnly />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <Button className='bg-[#7c849c]'>Simpan</Button>
        <Button loading={isLoading} onClick={() => handleSubmit(onSubmit)()}>
          Simpan Dan Ajukan
        </Button>
      </div>
    </section>
  )
}
