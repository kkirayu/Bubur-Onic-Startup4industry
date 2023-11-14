import axios from 'axios'

const token = localStorage.getItem('token')
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

export * from './getListAccount'
export * from './getListCategoryAccount'
export * from './getListPermission'
export * from './getListTeam'
export * from './getListJournal'
export * from './getListCompany'
export * from './getListKategoriAkun'
export * from './getListCategoryAsset'
export * from './getListSupplier'
export * from './getListProduct'
export * from './getListParentAkun'
export * from './getListCustomer'
export * from './simpleFetcher'
