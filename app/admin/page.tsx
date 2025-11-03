'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

type Employee = {
  id: string
  nama: string
  perusahaanSebelumnya: string
  tanggalMasukKerja: string
  tempatLahir: string
  tanggalLahir: string
  alamatKTP: string
  noTeleponRumah: string | null
  noHandphone: string
  agama: string
  pendidikanTerakhir: string
  jurusan: string
  sekolahUniversitas: string
  jenisKelamin: string
  noKTP: string
  golonganDarah: string
  noNPWP: string | null
  emailPribadi: string
  statusPerkawinan: string
  jabatan: string
  noRekeningBank: string
  namaBank: string
  namaKontakEmergency: string
  noKontakEmergency: string
  hubunganKontakEmergency: string
  namaSuamiIstri: string | null
  pekerjaanPasangan: string | null
  namaAnakPertama: string | null
  namaAnakKedua: string | null
  namaAnakKetiga: string | null
  namaAnakKeempat: string | null
  domisiliSekarang: string
  akunSocialMedia: string | null
  ktpFile: string
  kkFile: string
  npwpFile: string
  bukuTabunganFile: string
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const response = await fetch('/api/employees')
      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
      alert('Gagal mengambil data karyawan')
    } finally {
      setLoading(false)
    }
  }

  function exportToExcel() {
    const exportData = employees.map((emp) => ({
      'Nama': emp.nama,
      'No KTP': emp.noKTP,
      'Email': emp.emailPribadi,
      'No Handphone': emp.noHandphone,
      'Tempat Lahir': emp.tempatLahir,
      'Tanggal Lahir': new Date(emp.tanggalLahir).toLocaleDateString('id-ID'),
      'Jenis Kelamin': emp.jenisKelamin,
      'Agama': emp.agama,
      'Golongan Darah': emp.golonganDarah,
      'Alamat KTP': emp.alamatKTP,
      'Domisili Sekarang': emp.domisiliSekarang,
      'No Telpon Rumah': emp.noTeleponRumah || '-',
      'Status Perkawinan': emp.statusPerkawinan,
      'Nama Suami/Istri': emp.namaSuamiIstri || '-',
      'Pekerjaan Pasangan': emp.pekerjaanPasangan || '-',
      'Nama Anak 1': emp.namaAnakPertama || '-',
      'Nama Anak 2': emp.namaAnakKedua || '-',
      'Nama Anak 3': emp.namaAnakKetiga || '-',
      'Nama Anak 4': emp.namaAnakKeempat || '-',
      'Pendidikan Terakhir': emp.pendidikanTerakhir,
      'Jurusan': emp.jurusan,
      'Sekolah/Universitas': emp.sekolahUniversitas,
      'Perusahaan Sebelumnya': emp.perusahaanSebelumnya,
      'Tanggal Masuk Kerja': new Date(emp.tanggalMasukKerja).toLocaleDateString('id-ID'),
      'Jabatan': emp.jabatan,
      'No NPWP': emp.noNPWP || '-',
      'Nama Bank': emp.namaBank,
      'No Rekening': emp.noRekeningBank,
      'Kontak Emergency': emp.namaKontakEmergency,
      'No Emergency': emp.noKontakEmergency,
      'Hubungan Emergency': emp.hubunganKontakEmergency,
      'Social Media': emp.akunSocialMedia || '-',
      'Tanggal Daftar': new Date(emp.createdAt).toLocaleDateString('id-ID'),
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data Karyawan')

    // Auto-size columns
    const maxWidth = 50
    const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
      wch: Math.min(
        maxWidth,
        Math.max(
          key.length,
          ...exportData.map((row) => String(row[key as keyof typeof row]).length)
        )
      ),
    }))
    ws['!cols'] = colWidths

    const fileName = `data_karyawan_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, fileName)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Total Karyawan: {employees.length}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 font-medium"
                >
                  ← Kembali ke Form
                </a>
                <button
                  onClick={exportToExcel}
                  disabled={employees.length === 0}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  📥 Export ke Excel
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada data karyawan</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No KTP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jabatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No HP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Daftar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee, index) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.nama}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.jenisKelamin}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.noKTP}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.jabatan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.emailPribadi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.noHandphone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(employee.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Detail Karyawan</h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-4 space-y-6">
              {/* Data Pribadi */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Data Pribadi
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-medium">{selectedEmployee.nama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No KTP</p>
                    <p className="font-medium">{selectedEmployee.noKTP}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tempat, Tanggal Lahir</p>
                    <p className="font-medium">
                      {selectedEmployee.tempatLahir}, {formatDate(selectedEmployee.tanggalLahir)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jenis Kelamin</p>
                    <p className="font-medium">{selectedEmployee.jenisKelamin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Agama</p>
                    <p className="font-medium">{selectedEmployee.agama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Golongan Darah</p>
                    <p className="font-medium">{selectedEmployee.golonganDarah}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Alamat KTP</p>
                    <p className="font-medium">{selectedEmployee.alamatKTP}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Domisili Sekarang</p>
                    <p className="font-medium">{selectedEmployee.domisiliSekarang}</p>
                  </div>
                </div>
              </div>

              {/* Kontak */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Kontak
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedEmployee.emailPribadi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No HP</p>
                    <p className="font-medium">{selectedEmployee.noHandphone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No Telpon Rumah</p>
                    <p className="font-medium">{selectedEmployee.noTeleponRumah || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Social Media</p>
                    <p className="font-medium">{selectedEmployee.akunSocialMedia || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Pendidikan */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Pendidikan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pendidikan Terakhir</p>
                    <p className="font-medium">{selectedEmployee.pendidikanTerakhir}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jurusan</p>
                    <p className="font-medium">{selectedEmployee.jurusan}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Sekolah/Universitas</p>
                    <p className="font-medium">{selectedEmployee.sekolahUniversitas}</p>
                  </div>
                </div>
              </div>

              {/* Pekerjaan */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Pekerjaan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Perusahaan Sebelumnya</p>
                    <p className="font-medium">{selectedEmployee.perusahaanSebelumnya}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Masuk Kerja</p>
                    <p className="font-medium">{formatDate(selectedEmployee.tanggalMasukKerja)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jabatan</p>
                    <p className="font-medium">{selectedEmployee.jabatan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No NPWP</p>
                    <p className="font-medium">{selectedEmployee.noNPWP || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Bank</p>
                    <p className="font-medium">{selectedEmployee.namaBank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No Rekening</p>
                    <p className="font-medium">{selectedEmployee.noRekeningBank}</p>
                  </div>
                </div>
              </div>

              {/* Keluarga */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Keluarga
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status Perkawinan</p>
                    <p className="font-medium">{selectedEmployee.statusPerkawinan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Suami/Istri</p>
                    <p className="font-medium">{selectedEmployee.namaSuamiIstri || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pekerjaan Pasangan</p>
                    <p className="font-medium">{selectedEmployee.pekerjaanPasangan || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Anak 1</p>
                    <p className="font-medium">{selectedEmployee.namaAnakPertama || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Anak 2</p>
                    <p className="font-medium">{selectedEmployee.namaAnakKedua || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Anak 3</p>
                    <p className="font-medium">{selectedEmployee.namaAnakKetiga || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Anak 4</p>
                    <p className="font-medium">{selectedEmployee.namaAnakKeempat || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Kontak Emergency */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Kontak Emergency
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-medium">{selectedEmployee.namaKontakEmergency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">No Telepon</p>
                    <p className="font-medium">{selectedEmployee.noKontakEmergency}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Hubungan</p>
                    <p className="font-medium">{selectedEmployee.hubunganKontakEmergency}</p>
                  </div>
                </div>
              </div>

              {/* Dokumen */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Dokumen
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={selectedEmployee.ktpFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                  >
                    📄 Lihat KTP
                  </a>
                  <a
                    href={selectedEmployee.kkFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                  >
                    📄 Lihat KK
                  </a>
                  <a
                    href={selectedEmployee.npwpFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                  >
                    📄 Lihat NPWP
                  </a>
                  <a
                    href={selectedEmployee.bukuTabunganFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                  >
                    📄 Lihat Buku Tabungan
                  </a>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
