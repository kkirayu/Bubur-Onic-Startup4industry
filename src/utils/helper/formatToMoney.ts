export function formatToMoney(num: number ,  alwaysPositif = false) {
  // if(alwaysPositif) {
  //   num = Math.abs(num)
  // }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(num)
}
export function formatToMoneyInverted(num: number ,  invert = true) {
  // if(alwaysPositif) {
  //   num = Math.abs(num)
  // }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(num)
}
