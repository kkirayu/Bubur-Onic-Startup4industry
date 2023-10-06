import { Spinner } from 'alurkerja-ui'

export const FullLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size={32} />
    </div>
  )
}
