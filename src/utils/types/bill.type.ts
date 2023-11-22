export interface DetailBill {
  id: number
  bill_number: string
  bill_date: string
  due_date: string
  supplier_id: number
  total: string
  paid_total?: null
  desc: string
  payment_status: string
  perusahaan_id: number
  cabang_id: number
  created_at: string
  updated_at: string
  created_by?: null
  updated_by?: null
  deleted_by?: null
  bill_details?: BillDetailsEntity[] | null
  supplier: Supplier
  state: string
}
export interface BillDetailsEntity {
  id: number
  bill_id: number
  product_id: number
  qty: string
  price: string
  total: string
  discount: string
  tax: string
  subtotal: string
  description: string
  account_id: number
  perusahaan_id: number
  cabang_id: number
  created_by?: null
  updated_by?: null
  deleted_by?: null
  created_at: string
  updated_at: string
  product_instance: ProductInstance
  account_instance: AccountInstance
}
interface ProductInstance {
  id: number
  name: string
  code?: null
  barcode?: null
  unit?: null
  kategori?: null
  brand?: null
  purchase_price: string
  selling_price?: null
  perusahaan_id: number
  cabang_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by?: null
  deleted_by?: null
}
interface AccountInstance {
  id: number
  kode_akun: string
  perusahaan_id: number
  cabang_id: number
  nama: string
  deskripsi: string
  kategori_akun_id: number
  is_kas: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by?: null
  deleted_by?: null
  deleted_at?: null
}
interface Supplier {
  id: number
  name: string
  email?: null
  phone?: null
  alamat?: null
  npwp?: null
  no_ktp?: null
  no_rekening?: null
  bank?: null
  nama_rekening?: null
  nama_pemilik_rekening?: null
  perusahaan_id: number
  cabang_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by?: null
  deleted_by?: null
}
