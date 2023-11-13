import { Input, Select, Switch } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListKategoriAkun, getListParentAkun, getListTeam } from '@/api'
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
  const { listOption: listParentAkun, data: listParentAkunData } = getListParentAkun()
  const navigate = useNavigate()
  const [accountPrefix, setAccountPrefix] = useState("");
  const [accountType, setAccountType] = useState("");
  const [kategoriAkunOptions, setKategoriAkunOptions] = useState<any[]>([]);

  const watchKategoriAkun = watch('kategori_akun_id')
  const watchParentAkun = watch('parent_akun')

  useEffect(() => {
    var data = _.find(listKategoriAkunData || [], { id: watchKategoriAkun });
    if (data) {
      setAccountPrefix(data.prefix_akun)
      setAccountType(data.code)
    }
  }, [watchKategoriAkun]);


  useEffect(() => {
    console.log(listKategoriAkunData)
    if (watchParentAkun) {

      const found = _.where(listKategoriAkunData || [],  {"parent_kategori_akun" : watchParentAkun})
      setValue("kategori_akun_id" ,  null);
      setKategoriAkunOptions(_.map(found, (item: any) => {
        return {
          label: `(${item.prefix_akun}) ` + item.nama,
          value: item.id,
        }
      })
      )
    }

  }, [watchParentAkun]);
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: CreatePayload) => {
      return axiosInstance.post(
        '/akun/akun',
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

    delete body.parent_akun;
    const payload: CreatePayload = {
      ...body,
      perusahaan_id: 1,
      is_kas : body.is_kas ? 1 : 0,
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
            Parent Akun
          </label>
          <Select
            options={listParentAkun}
            onChange={(v: any) => setValue('parent_akun', +v.value)}
          />
        </div>
        {!watchParentAkun ? <></> : <>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Kategori Akun
            </label>
            <Select
              options={kategoriAkunOptions}
              onChange={(v: any) => setValue('kategori_akun_id', +v.value)}
            />
          </div>
        </>
        }


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
            <Input onChange={(v: any) => setValue('nama', v.target.value)}>
            </Input>
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Deskripsi
            </label>
            <Input textArea onChange={(v: any) => setValue('deskripsi', v.target.value)}>
            </Input>
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Akun Kas
            </label>
            <Switch
              onChange={(v: any) => setValue('is_kas', v)}
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
