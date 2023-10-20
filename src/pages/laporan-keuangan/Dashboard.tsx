import {
  CardBukuBesar,
  CardJournal,
  CardLabaRugi,
  CardNeraca,
} from './components'

export function Dashboard() {
  return (
    <div className="px-4 bg-white">
      <div className="pt-5 pb-6 pl-4 border-b mb-5">
        <h3 className="text-base font-bold uppercase leading-normal">
          lAPORAN
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2.5 pb-4">
        <CardJournal />
        <CardBukuBesar />
        <CardNeraca />
        <CardLabaRugi />
      </div>
    </div>
  )
}
