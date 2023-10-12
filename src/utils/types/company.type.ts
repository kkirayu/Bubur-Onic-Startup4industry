export interface Company {
  id: number
  created_at: string
  created_by: string | null
  deleted_by: string | null
  domain_perusahaan: string
  alamat: string
  owner: any | null
  status_perusahaan: string
  updated_at: string
  updated_by: string | null
  cabang: Cabang[]
  nama: string
  kode_perusahaan: string
}

export interface Cabang {
  alamat: string
  created_at: string
  created_by: string | null
  deleted_by: string | null
  id: number
  kode_cabang: string
  nama: string
  perusahaan_id: number
  updated_at: string
  updated_by: string | null
}
