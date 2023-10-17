import { DateRange, Select } from 'alurkerja-ui'
import { Search, RefreshCcw } from 'lucide-react'

import { Button } from '@/components'
import { FC } from 'react'

interface SubHeader {
  hideSupplier?: boolean
  hidePeriode?: boolean
}

export const SubHeader: FC<SubHeader> = ({
  hideSupplier = false,
  hidePeriode,
}) => {
  const columnSpan = hideSupplier || hidePeriode ? 'col-span-4' : 'col-span-2'

  return (
    <>
      <div className="w-full h-10 px-6 py-2.5 bg-slate-100 rounded-tl rounded-tr border border-slate-200 justify-start items-center gap-6 inline-flex mt-6">
        <div className="text-gray-700 text-sm font-semibold">Filter Data</div>
      </div>
      <div className="p-6 border-x border-b mb-6">
        <div className="grid grid-cols-4 gap-4">
          {!hidePeriode && (
            <div className={columnSpan}>
              <label htmlFor="periode">Periode</label>
              <DateRange />
            </div>
          )}
          {!hideSupplier && (
            <div className={columnSpan}>
              <label htmlFor="periode">Supplier</label>
              <Select options={[]} />
            </div>
          )}
        </div>
        <div className="w-fit ml-auto mt-6 flex gap-4 items-center">
          <Button variant="outlined" className="flex items-center gap-1">
            <RefreshCcw size={18} /> Reset
          </Button>
          <Button className="flex items-center gap-1">
            <Search size={18} /> Cari
          </Button>
        </div>
      </div>
    </>
  )
}
