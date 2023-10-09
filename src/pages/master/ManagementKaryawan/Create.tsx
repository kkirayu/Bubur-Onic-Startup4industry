import { Input, Select } from 'alurkerja-ui'

export const CreateKaryawan = () => {
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
            <Input type="email" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Password
            </label>
            <Input type="password" />
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
            <Input type="text" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama
            </label>
            <Input type="text" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Agama
            </label>
            <Select options={[{}]} />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Jenis Kelamin
            </label>
            <Select options={[{}]} />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tanggal Lahir
            </label>
            <Input type="date" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Status Kawin
            </label>
            <Select options={[{}]} />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tanggal Masuk
            </label>
            <Input type="date" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tangal Keluar
            </label>
            <Input type="date" />
          </div>
          <div></div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nomor NPWP
            </label>
            <Input type="text" />
          </div>
          <div></div>
          <div></div>
          <div className="col-span-3">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nomor NPWP
            </label>
            <Input type="text" textArea />
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
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              THR
            </label>
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Uang Hadir
            </label>
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Jabatan
            </label>
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Tambahan
            </label>
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Extra Rajin
            </label>
            <Input type="number" />
          </div>
          <div>
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Tunjangan Lembur
            </label>
            <Input type="number" />
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
            <Input type="number" />
          </div>
        </div>
      </section>
    </main>
  )
}
