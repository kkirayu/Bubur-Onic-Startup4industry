import { Input, Select, Switch } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListKategoriAkun, getListTeam } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import _ from 'underscore'

interface CreatePayload {
  perusahaan_id?: number
  cabang_id?: number
  account_type?: string
}

export const CreateAkun = () => {
  const { setValue, handleSubmit, watch } = useForm()
  const { listOption: listKategoriAkun, data: listKategoriAkunData } = getListKategoriAkun()
  const navigate = useNavigate()
  const [accountPrefix, setAccountPrefix] = useState("");
  const [accountType, setAccountType] = useState("");

  const watchKategoriAkun = watch('kategori_akun')

  useEffect(() => {
    var data = _.find(listKategoriAkunData || [], { id: watchKategoriAkun });
    if (data) {
      setAccountPrefix(data.prefix_akun)
      setAccountType(data.code)
    }
  }, [watchKategoriAkun]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: CreatePayload) => {
      return axiosInstance.post(
        '/akun/akun/create-akun',
        payload
      )
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat akun baru',
        callback: () => {
          navigate('/master/akun')
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

  const onSubmit = (body: FieldValues) => {
    body.kode_akun = accountPrefix + body.kode_akun;

    const payload: CreatePayload = {
      ...body,
      account_type: accountType,
      perusahaan_id: 1,
      cabang_id: 1,
    } as CreatePayload
    console.log(JSON.stringify(payload));
    mutate(payload)
  }

  return (
    <main className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Akun</h3>

      <div className='px-10 pb-10 flex flex-col gap-y-2'>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Kategori Akun
          </label>
          <Select
            options={listKategoriAkun}
            onChange={(v: any) => setValue('kategori_akun', +v.value)}
          />
        </div>


        {!watchKategoriAkun ? <></> : <>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Kode Akun
            </label>
            <Input
              onChange={(v: any) => setValue('kode_akun', v.target.value)}
              prefix={accountPrefix}>
            </Input>
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama Akun
            </label>
            <Input onChange={(v: any) => setValue('nama_akun', v.target.value)}>
            </Input>
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Akun Bank
            </label>
            <Switch
              onChange={(v: any) => setValue('is_akun_bank', v)}
              options={[
                { label: 'Ya', value: true },
                { label: 'Tidak', value: false },
              ]}
            />
          </div>
        </>}
      </div>
      <div className="px-10 w-fit ml-auto">
        <Button loading={isLoading} onClick={() => handleSubmit(onSubmit)()}>
          Simpan
        </Button>
      </div>
    </main>
  )
}
