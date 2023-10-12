import { Input, Select, Switch } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListTeam } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

interface CreatePayload {
  name: string
  password: string
  email: string
  perusahaan_id?: number
  cabang_id?: number
  alamat: string
  jenis_kelamin: string
  agama: string
  tanggal_lahir: string
  tanggal_masuk: string
  tanggal_keluar?: null
  status_kawin: boolean
  nomor_ktp: string
  npwp: string
  gaji_pokok: number
  uang_hadir: number
  tunjangan_jabatan: number
  tunjangan_tambahan: number
  extra_rajin: number
  thr: number
  tunjangan_lembur: number
  quota_cuti_tahunan: number
  team_id: number
}

export const CreateKaryawan = () => {
  const { setValue, handleSubmit } = useForm()
  const { listOption: listOptionTeam } = getListTeam()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: CreatePayload) => {
      return axiosInstance.post(
        '/pegawai/profil-pegawai/store_with_user',
        payload
      )
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat profile karyawan',
        callback: () => {
          navigate('/master/Management-karyawan')
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
    const payload: CreatePayload = {
      ...body,
      perusahaan_id: undefined,
      cabang_id: undefined,
    } as CreatePayload
    mutate(payload)
  }

  return (
    <main className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Pegawai</h3>

      <section className="px-10">
        <h4 className="mb-6 font-bold text-xl">Akun</h4>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Email
            </label>
            <Input
              name="email"
              type="email"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Password
            </label>
            <Input
              name="password"
              type="password"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="px-10">
        <h4 className="mb-6 font-bold text-xl">Data Pegawai</h4>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nomor KTP
            </label>
            <Input
              name="nomor_ktp"
              type="text"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama
            </label>
            <Input
              name="name"
              type="text"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Agama
            </label>
            <Select
              options={[
                { label: 'Islam', value: 'Islam' },
                { label: 'Kristen', value: 'Kristen' },
                { label: 'Katolik', value: 'Katolik' },
                { label: 'Hindu', value: 'Hindu' },
                { label: 'Buddha', value: 'Buddha' },
                { label: 'Khonghucu', value: 'Khonghucu' },
                { label: 'Lainnya', value: 'Lainnya' },
              ]}
              onChange={(v: any) => setValue('agama', v.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Jenis Kelamin
            </label>
            <Select
              options={[
                { label: 'Laki-laki', value: 'Laki-laki' },
                { label: 'Perempuan', value: 'Perempuan' },
              ]}
              onChange={(v: any) => setValue('jenis_kelamin', v.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tanggal Lahir
            </label>
            <Input
              name="tanggal_lahir"
              type="date"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Status Kawin
            </label>
            <Switch
              options={[
                { label: 'Sudah Menikah', value: true },
                { label: 'Belum Menikah', value: false },
              ]}
              onChange={(v) => setValue('status_kawin', v)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tanggal Masuk
            </label>
            <Input
              name="tanggal_masuk"
              type="date"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tangal Keluar
            </label>
            <Input
              name="tanggal_keluar"
              type="date"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Team
            </label>
            <Select
              options={listOptionTeam}
              onChange={(v: any) => setValue('team_id', +v.id)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nomor NPWP
            </label>
            <Input
              name="npwp"
              type="text"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div></div>
          <div></div>
          <div className="col-span-3">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alamat KTP
            </label>
            <Input
              name="alamat"
              type="text"
              textArea
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="px-10">
        <h4 className="mb-6 font-bold text-xl">Benefit Dan Gaji</h4>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Gaji Pokok
            </label>
            <Input
              name="gaji_pokok"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              THR
            </label>
            <Input
              name="thr"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Uang Hadir
            </label>
            <Input
              name="uang_hadir"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Jabatan
            </label>
            <Input
              name="tunjangan_jabatan"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Tambahan
            </label>
            <Input
              name="tunjangan_tambahan"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Extra Rajin
            </label>
            <Input
              name="extra_rajin"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Lembur
            </label>
            <Input
              name="tunjangan_lembur"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
          <div></div>
          <div></div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Kuota Cuti Tahunan
            </label>
            <Input
              name="quota_cuti_tahunan"
              type="number"
              onChange={(e) => setValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </section>
      <div className="px-10 w-fit ml-auto">
        <Button loading={isLoading} onClick={() => handleSubmit(onSubmit)()}>
          Simpan
        </Button>
      </div>
    </main>
  )
}
