import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'

function ManagementKaryawan() { 
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
        <section className="bg-white">
            <TableLowcode
                baseUrl={import.meta.env.VITE_API_BASEURL}
                tableName='Management Karyawan'
                specPath='/api/pegawai/profil-pegawai'
                spec=   {spec}
                renderState={renderState}
                setRenderState={setRenderState}
                pageConfig={pageConfig}
                setPageConfig={setPageConfig}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                search={search}
                setSearch={setSearch}
                
            />
        </section>
    )
}

export default ManagementKaryawan

var spec = {
    "show_as_menu": true,
    "name": "profile_pegawais",
    "is_bpmn": false,
    "is_usertask": false,
    "can_bulk": true,
    "can_create": true,
    "can_delete": true,
    "can_edit": true,
    "can_detail": true,
    "label": "Profile_pegawais",
    "base_url": "https://onic-be.merapi.javan.id",
    "path": "/api/pegawai/profil-pegawai",
    "description": "Field Dari Profile Pegawais",
    "header_action": [
        {
            "label": "Tambah",
            "action_label": "Tambah Pegawais",
            "method": "post",
            "form_type": "new_page",
            "path": "/api/pegawai/profil-pegawai",
            "icon": "plus",
            "type": "primary"
        }
    ],
    "field_action": [
        {
            "label": "Detail",
            "action_label": "Detail Profile Pegawais",
            "method": "get",
            "form_type": "modal",
            "path": "/api/pegawai/profil-pegawai/{id}",
            "icon": "eye",
            "type": "primary"
        },
        {
            "label": "Edit",
            "action_label": "Edit Profile Pegawais",
            "method": "put",
            "form_type": "modal",
            "path": "/api/pegawai/profil-pegawai/{id}",
            "icon": "edit",
            "type": "primary"
        },
        {
            "label": "Hapus",
            "action_label": "Delete Profile Pegawais",
            "method": "delete",
            "form_type": "confirm_modal",
            "confirm": {
                "title": "Hapus Data",
                "message": "Apakah anda yakin ingin menghapus data ini?1",
                "confirm_text": "Lanjutkan",
                "cancel_text": "Batal"
            },
            "path": "/api/pegawai/profil-pegawai/{id}",
            "icon": "trash",
            "type": "danger"
        }
    ],
    "languages": {
        "pagination_info": "Memunculkan data dari {page} sampai {limit} total {total}",
        "empty_data": "Tidak ada data yang ditampilkan"
    },
    "fields": {
        "id": {
            "name": "id",
            "label": "Id",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": true,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": false,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 1,
            "create_order": 1,
            "edit_order": 1
        },
        "perusahaan_id": {
            "name": "perusahaan_id",
            "label": "Perusahaan Id",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 2,
            "create_order": 2,
            "edit_order": 2
        },
        "cabang_id": {
            "name": "cabang_id",
            "label": "Cabang Id",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 3,
            "create_order": 3,
            "edit_order": 3
        },
        "user_id": {
            "name": "user_id",
            "label": "User Id",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 4,
            "create_order": 4,
            "edit_order": 4
        },
        "kode_pegawai": {
            "name": "kode_pegawai",
            "label": "Kode Pegawai",
            "required": true,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "type": "text",
            "form_field_type": "INPUT_TEXT",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "string",
                "max:255"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 5,
            "create_order": 5,
            "edit_order": 5
        },
        "alamat": {
            "name": "alamat",
            "label": "Alamat",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "textarea",
            "form_field_type": "INPUT_TEXTAREA",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "string"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 6,
            "create_order": 6,
            "edit_order": 6
        },
        "alamat_asal": {
            "name": "alamat_asal",
            "label": "Alamat Asal",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "textarea",
            "form_field_type": "INPUT_TEXTAREA",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "nullable",
                "string"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 7,
            "create_order": 7,
            "edit_order": 7
        },
        "jenis_kelamin": {
            "name": "jenis_kelamin",
            "label": "Jenis Kelamin",
            "required": true,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "type": "text",
            "form_field_type": "INPUT_TEXT",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "string",
                "max:255"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 8,
            "create_order": 8,
            "edit_order": 8
        },
        "agama": {
            "name": "agama",
            "label": "Agama",
            "required": true,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "type": "text",
            "form_field_type": "INPUT_TEXT",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "string",
                "max:255"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 9,
            "create_order": 9,
            "edit_order": 9
        },
        "tanggal_lahir": {
            "name": "tanggal_lahir",
            "label": "Tanggal Lahir",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "date",
            "form_field_type": "INPUT_DATE",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "date_format:Y-m-d"
            ],
            "format": "DD-MM-YYYY",
            "prefix": "",
            "suffix": "",
            "list_order": 10,
            "create_order": 10,
            "edit_order": 10
        },
        "tanggal_masuk": {
            "name": "tanggal_masuk",
            "label": "Tanggal Masuk",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "date",
            "form_field_type": "INPUT_DATE",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "date_format:Y-m-d"
            ],
            "format": "DD-MM-YYYY",
            "prefix": "",
            "suffix": "",
            "list_order": 11,
            "create_order": 11,
            "edit_order": 11
        },
        "tanggal_keluar": {
            "name": "tanggal_keluar",
            "label": "Tanggal Keluar",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "date",
            "form_field_type": "INPUT_DATE",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "nullable",
                "date_format:Y-m-d"
            ],
            "format": "DD-MM-YYYY",
            "prefix": "",
            "suffix": "",
            "list_order": 12,
            "create_order": 12,
            "edit_order": 12
        },
        "status_kawin": {
            "name": "status_kawin",
            "label": "Status Kawin",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "switch",
            "form_field_type": "INPUT_SWITCH",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "required",
                "boolean"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 13,
            "create_order": 13,
            "edit_order": 13
        },
        "nomor_ktp": {
            "name": "nomor_ktp",
            "label": "NIK",
            "required": false,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "type": "text",
            "form_field_type": "INPUT_TEXT",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": false,
            "is_hidden_in_detail": false,
            "rules": [
                "nullable",
                "string",
                "max:255"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 14,
            "create_order": 14,
            "edit_order": 14
        },
        "npwp": {
            "name": "npwp",
            "label": "Npwp",
            "required": false,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "type": "text",
            "form_field_type": "INPUT_TEXT",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "nullable",
                "string",
                "max:255"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 15,
            "create_order": 15,
            "edit_order": 15
        },
        "gaji_pokok": {
            "name": "gaji_pokok",
            "label": "Gaji Pokok",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 16,
            "create_order": 16,
            "edit_order": 16
        },
        "uang_hadir": {
            "name": "uang_hadir",
            "label": "Uang Hadir",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 17,
            "create_order": 17,
            "edit_order": 17
        },
        "tunjangan_jabatan": {
            "name": "tunjangan_jabatan",
            "label": "Tunjangan Jabatan",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 18,
            "create_order": 18,
            "edit_order": 18
        },
        "tunjangan_tambahan": {
            "name": "tunjangan_tambahan",
            "label": "Tunjangan Tambahan",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 19,
            "create_order": 19,
            "edit_order": 19
        },
        "extra_rajin": {
            "name": "extra_rajin",
            "label": "Extra Rajin",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 20,
            "create_order": 20,
            "edit_order": 20
        },
        "thr": {
            "name": "thr",
            "label": "Thr",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 21,
            "create_order": 21,
            "edit_order": 21
        },
        "tunjangan_lembur": {
            "name": "tunjangan_lembur",
            "label": "Tunjangan Lembur",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "numeric"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 22,
            "create_order": 22,
            "edit_order": 22
        },
        "quota_cuti_tahunan": {
            "name": "quota_cuti_tahunan",
            "label": "Quota Cuti Tahunan",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": false,
            "rules": [
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 23,
            "create_order": 23,
            "edit_order": 23
        },
        "team_id": {
            "name": "team_id",
            "label": "Team Id",
            "required": true,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": false,
            "is_hidden_in_edit": false,
            "is_hidden_in_list": false,
            "is_hidden_in_detail": false,
            "rules": [
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 24,
            "create_order": 24,
            "edit_order": 24
        },
        "created_at": {
            "name": "created_at",
            "label": "Created At",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "datetime-local",
            "form_field_type": "INPUT_DATETIME-LOCAL",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "nullable",
                "date_format:Y-m-d H:i:s"
            ],
            "format": "DD-MM-YYYY HH:mm:ss",
            "prefix": "",
            "suffix": "",
            "list_order": 25,
            "create_order": 25,
            "edit_order": 25
        },
        "updated_at": {
            "name": "updated_at",
            "label": "Updated At",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "datetime-local",
            "form_field_type": "INPUT_DATETIME-LOCAL",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "nullable",
                "date_format:Y-m-d H:i:s"
            ],
            "format": "DD-MM-YYYY HH:mm:ss",
            "prefix": "",
            "suffix": "",
            "list_order": 26,
            "create_order": 26,
            "edit_order": 26
        },
        "created_by": {
            "name": "created_by",
            "label": "Created By",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "nullable",
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 27,
            "create_order": 27,
            "edit_order": 27
        },
        "updated_by": {
            "name": "updated_by",
            "label": "Updated By",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "nullable",
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 28,
            "create_order": 28,
            "edit_order": 28
        },
        "deleted_by": {
            "name": "deleted_by",
            "label": "Deleted By",
            "required": false,
            "searchable": false,
            "filterable": false,
            "sortable": true,
            "type": "number",
            "form_field_type": "INPUT_NUMBER",
            "primary": false,
            "is_hidden_in_create": true,
            "is_hidden_in_edit": true,
            "is_hidden_in_list": true,
            "is_hidden_in_detail": true,
            "rules": [
                "nullable",
                "integer"
            ],
            "format": "",
            "prefix": "",
            "suffix": "",
            "list_order": 29,
            "create_order": 29,
            "edit_order": 29
        }
    },
    "relations": []
}