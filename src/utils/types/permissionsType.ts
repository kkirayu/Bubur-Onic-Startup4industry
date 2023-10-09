export interface Permission {
  permissions?: PermissionsEntity[] | null
}
export interface PermissionsEntity {
  id: string
  name: string
  module?: null
  table?: null
  action?: null
  description?: null
  pivot: Pivot
}
export interface Pivot {
  role_id: string
  permission_id: string
}
