import { Input, Select, Switch } from 'alurkerja-ui'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Dialog } from '@/components'
import { axiosInstance, useListTeam } from '@/api'
import { useEffect } from 'react'

interface EditPayload {
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

export const EditKaryawan = () => {
  const { listOptionTeam, loading } = useListTeam()
  const navigate = useNavigate()
  const { id } = useParams()
  const { handleSubmit, setValue } = useForm()

  const { data } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      return axiosInstance
        .get(`/pegawai/profil-pegawai/${id}`)
        .then((res) => res.data?.data)
    },
  })

  useEffect(() => {
    if (data) {
      const ignoredKey = [
        'id',
        'user',
        'team',
        'user_id',
        'perusahaan_id',
        'cabang_id',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'deleted_by',
      ]
      for (const [key, value] of Object.entries(data) as any) {
        if (!ignoredKey.includes(key)) {
          setValue(key, value)
        }
      }
    }
  }, [data])

  const listAgama = [
    { label: 'Islam', value: 'Islam' },
    { label: 'Kristen', value: 'Kristen' },
    { label: 'Katolik', value: 'Katolik' },
    { label: 'Hindu', value: 'Hindu' },
    { label: 'Buddha', value: 'Buddha' },
    { label: 'Khonghucu', value: 'Khonghucu' },
    { label: 'Lainnya', value: 'Lainnya' },
  ]

  const listJenisKelamin = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ]

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: EditPayload) => {
      return axiosInstance.put(`/pegawai/profil-pegawai/${id}`, payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil mengedit profile karyawan',
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
    const payload: EditPayload = {
      ...body,
    } as EditPayload

    mutate(payload)
  }
  return (
    <main className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Edit Pegawai</h3>

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
              defaultValue={data?.user.email}
              disabled
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
              defaultValue={data?.nomor_ktp}
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
              defaultValue={data?.user.name}
              disabled
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Agama
            </label>
            {data && (
              <Select
                options={listAgama}
                defaultValue={listAgama?.filter(
                  (agama) => agama.value === data?.agama
                )}
                onChange={(v: any) => setValue('agama', v.value)}
              />
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Jenis Kelamin
            </label>
            {data && (
              <Select
                options={listJenisKelamin}
                defaultValue={listJenisKelamin?.filter(
                  (jk) => jk.value === data?.jenis_kelamin
                )}
                onChange={(v: any) => setValue('jenis_kelamin', v.value)}
              />
            )}
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
              defaultValue={data?.tanggal_lahir}
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
              defaultValue={data?.status_kawin}
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
              defaultValue={data?.tanggal_masuk}
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
              defaultValue={data?.tanggal_keluar}
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
            {data && (
              <Select
                isLoading={loading}
                options={listOptionTeam}
                defaultValue={listOptionTeam?.filter(
                  (option) => option.value === data?.team_id
                )}
                onChange={(v: any) => setValue('team_id', +v.id)}
              />
            )}
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
              defaultValue={data?.npwp}
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
              defaultValue={data?.alamat}
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
              defaultValue={data?.gaji_pokok}
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
              defaultValue={data?.thr}
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
              defaultValue={data?.uang_hadir}
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
              defaultValue={data?.tunjangan_jabatan}
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
              defaultValue={data?.tunjangan_tambahan}
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
              defaultValue={data?.extra_rajin}
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
              defaultValue={data?.tunjangan_lembur}
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
              defaultValue={data?.quota_cuti_tahunan}
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
