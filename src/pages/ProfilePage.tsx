import { Input, ReactHookWrapper } from 'alurkerja-ui'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/components'

const ProfilePage = () => {
  const { control } = useForm()
  return (
    <div className="bg-white px-6 pt-6 pb-10 rounded">
      <h2 className="font-bold text-xl mb-6">Profile</h2>

      <ReactHookWrapper control={control}>
        <Input name="fullname" aria-label="Nama Lengkap" />
        <Input name="email" aria-label="Email" />
        <Input name="birth_date" type="date" aria-label="Tanggal Lahir" />
        <Input name="address" type="text" aria-label="Alamat" textArea />
      </ReactHookWrapper>

      <div className="flex items-center gap-4">
        <Link to="/reset-password" className="text-main-blue-alurkerja">
          Reset Password?
        </Link>
        <Button isblock>Simpan</Button>
      </div>
    </div>
  )
}

export default ProfilePage
