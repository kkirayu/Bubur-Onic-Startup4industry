import { Input, Select, Switch } from 'alurkerja-ui'

import { Button } from '@/components'
import { axiosInstance, useListTeam } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const DetailKaryawan = () => {
  const { listOptionTeam } = useListTeam()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      return axiosInstance
        .get(`/pegawai/profil-pegawai/${id}`)
        .then((res) => res.data?.data)
    },
  })

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
              readOnly
              value={data?.user.email}
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
              readOnly
              value={data?.nomor_ktp}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama
            </label>
            <Input name="name" type="text" readOnly value={data?.user.name} />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Agama
            </label>
            <Select
              options={listAgama}
              isDisabled
              value={listAgama.filter((agama) => agama.value === data?.agama)}
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
              options={listJenisKelamin}
              isDisabled
              value={listJenisKelamin.filter(
                (jk) => jk.value === data?.jenis_kelamin
              )}
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
              readOnly
              value={data?.tanggal_lahir}
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
              disabled
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
              readOnly
              value={data?.tanggal_masuk}
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
              readOnly
              value={data?.tanggal_keluar}
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
              isDisabled
              value={listOptionTeam?.filter(
                (option) => option.value === data?.team_id
              )}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nomor NPWP
            </label>
            <Input name="npwp" type="text" readOnly value={data?.npwp} />
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
              readOnly
              value={data?.alamat}
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
              readOnly
              value={data?.gaji_pokok}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              THR
            </label>
            <Input name="thr" type="number" readOnly value={data?.thr} />
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
              readOnly
              value={data?.uang_hadir}
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
              readOnly
              value={data?.tunjangan_jabatan}
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
              readOnly
              value={data?.tunjangan_tambahan}
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
              readOnly
              value={data?.extra_rajin}
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
              readOnly
              value={data?.tunjangan_lembur}
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
              readOnly
              value={data?.quota_cuti_tahunan}
            />
          </div>
        </div>
      </section>
      <div className="px-10 w-fit ml-auto">
        <Button onClick={() => navigate('/master/management-karyawan')}>
          Kembali
        </Button>
      </div>
    </main>
  )
}
