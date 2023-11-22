export * from './loginResponseType'
export * from './UserType'
export * from './company.type'
export * from './permissionsType'
export type { DetailBill, BillDetailsEntity } from './bill.type'

export type Pagination = {
  empty: boolean
  first: boolean
  last: boolean
  number: boolean
  number_of_element: boolean
  pageable: {
    offset: number
    paged: boolean
    unpaged: boolean
  }
  size: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  total_elements: number
  total_page: number
}

export interface ListResponse<T = any> {
  data: {
    content: Array<T>
  }
  status: number
  message: string
}

export interface OdooResponse<T = any> {
  data: Array<T>
  status: number
  message: string
}

export interface OdooResponse2<T = any> {
  data: {
    length: number
    records: Array<T>
  }
  status: number
  message: string
}

export interface ListNotPaginatedResponse<T = any> {
  data: Array<T>
  status: number
  message: string
}
