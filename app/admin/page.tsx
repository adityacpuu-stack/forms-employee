'use client'

import { useEffect, useState } from 'react'
import ExcelJS from 'exceljs'

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

  async function exportToExcel() {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Data Karyawan', {
      pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true }
    })

    // HEADER - Merge across all columns (AH = 34 columns)
    worksheet.mergeCells('A1:AH1')
    const titleRow = worksheet.getCell('A1')
    titleRow.value = 'DATA KARYAWAN PERUSAHAAN'
    titleRow.font = { name: 'Calibri', size: 20, bold: true, color: { argb: 'FFFFFF' } }
    titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0B5394' } }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getRow(1).height = 40

    // SUB HEADER
    worksheet.mergeCells('A2:AH2')
    const infoRow = worksheet.getCell('A2')
    infoRow.value = `Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} | Total: ${employees.length} Karyawan`
    infoRow.font = { name: 'Calibri', size: 11, bold: true }
    infoRow.alignment = { vertical: 'middle', horizontal: 'center' }
    infoRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D9EAD3' } }
    worksheet.getRow(2).height = 25

    // CATEGORY HEADERS (Row 3)
    const categoryRow = worksheet.getRow(3)
    categoryRow.height = 25

    // Merge cells for category groupings
    worksheet.mergeCells('A3:A4') // NO
    worksheet.mergeCells('B3:M3') // DATA PRIBADI
    worksheet.mergeCells('N3:P3') // PENDIDIKAN
    worksheet.mergeCells('Q3:S3') // PEKERJAAN
    worksheet.mergeCells('T3:Y3') // KELUARGA
    worksheet.mergeCells('Z3:AB3') // KEUANGAN
    worksheet.mergeCells('AC3:AE3') // KONTAK DARURAT
    worksheet.mergeCells('AF3:AH3') // LAINNYA

    const categories = [
      { cell: 'A3', label: 'NO', color: '6FA8DC' },
      { cell: 'B3', label: 'DATA PRIBADI', color: '93C47D' },
      { cell: 'N3', label: 'PENDIDIKAN', color: 'F6B26B' },
      { cell: 'Q3', label: 'PEKERJAAN', color: 'E06666' },
      { cell: 'T3', label: 'KELUARGA', color: 'A64D79' },
      { cell: 'Z3', label: 'KEUANGAN', color: '76A5AF' },
      { cell: 'AC3', label: 'KONTAK DARURAT', color: 'CC0000' },
      { cell: 'AF3', label: 'LAINNYA', color: '999999' },
    ]

    categories.forEach(cat => {
      const cell = worksheet.getCell(cat.cell)
      cell.value = cat.label
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cat.color } }
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.border = {
        top: { style: 'medium', color: { argb: '000000' } },
        left: { style: 'medium', color: { argb: '000000' } },
        bottom: { style: 'medium', color: { argb: '000000' } },
        right: { style: 'medium', color: { argb: '000000' } }
      }
    })

    // COLUMN HEADERS (Row 4)
    const headers = [
      'NO', 'NAMA LENGKAP', 'NO. KTP', 'TEMPAT LAHIR', 'TGL LAHIR',
      'JENIS KELAMIN', 'AGAMA', 'GOL. DARAH', 'ALAMAT KTP', 'DOMISILI',
      'NO. HP', 'NO. TELP RUMAH', 'EMAIL',
      'PENDIDIKAN', 'JURUSAN', 'SEKOLAH/UNIV',
      'PERUSAHAAN SEBELUMNYA', 'TGL MASUK', 'JABATAN',
      'STATUS NIKAH', 'NAMA PASANGAN', 'KERJA PASANGAN', 'ANAK 1', 'ANAK 2', 'ANAK 3', 'ANAK 4',
      'NO. NPWP', 'NAMA BANK', 'NO. REKENING',
      'NAMA', 'NO. TELP', 'HUBUNGAN',
      'SOCIAL MEDIA', 'TGL DAFTAR'
    ]

    const headerRow = worksheet.getRow(4)
    headerRow.height = 35

    headers.forEach((header, index) => {
      const cell = headerRow.getCell(index + 1)
      cell.value = header
      cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1C4587' } }
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      }
    })

    // SET COLUMN WIDTHS
    worksheet.columns = [
      { key: 'no', width: 6 },
      { key: 'nama', width: 25 },
      { key: 'noKTP', width: 18 },
      { key: 'tempatLahir', width: 15 },
      { key: 'tglLahir', width: 13 },
      { key: 'jenisKelamin', width: 13 },
      { key: 'agama', width: 10 },
      { key: 'golDarah', width: 10 },
      { key: 'alamatKTP', width: 30 },
      { key: 'domisili', width: 30 },
      { key: 'noHP', width: 14 },
      { key: 'telpRumah', width: 14 },
      { key: 'email', width: 25 },
      { key: 'pendidikan', width: 12 },
      { key: 'jurusan', width: 18 },
      { key: 'sekolah', width: 25 },
      { key: 'perusahaanLama', width: 22 },
      { key: 'tglMasuk', width: 13 },
      { key: 'jabatan', width: 18 },
      { key: 'statusNikah', width: 13 },
      { key: 'pasangan', width: 22 },
      { key: 'kerjaPasangan', width: 18 },
      { key: 'anak1', width: 18 },
      { key: 'anak2', width: 18 },
      { key: 'anak3', width: 18 },
      { key: 'anak4', width: 18 },
      { key: 'npwp', width: 18 },
      { key: 'bank', width: 13 },
      { key: 'rek', width: 16 },
      { key: 'namaEmergency', width: 22 },
      { key: 'noEmergency', width: 14 },
      { key: 'hubunganEmergency', width: 15 },
      { key: 'socmed', width: 18 },
      { key: 'tglDaftar', width: 13 },
    ]

    // ADD DATA ROWS
    employees.forEach((emp, index) => {
      const row = worksheet.addRow({
        no: index + 1,
        nama: emp.nama,
        noKTP: emp.noKTP,
        tempatLahir: emp.tempatLahir,
        tglLahir: new Date(emp.tanggalLahir).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        jenisKelamin: emp.jenisKelamin,
        agama: emp.agama,
        golDarah: emp.golonganDarah,
        alamatKTP: emp.alamatKTP,
        domisili: emp.domisiliSekarang,
        noHP: emp.noHandphone,
        telpRumah: emp.noTeleponRumah || '-',
        email: emp.emailPribadi,
        pendidikan: emp.pendidikanTerakhir,
        jurusan: emp.jurusan,
        sekolah: emp.sekolahUniversitas,
        perusahaanLama: emp.perusahaanSebelumnya,
        tglMasuk: new Date(emp.tanggalMasukKerja).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        jabatan: emp.jabatan,
        statusNikah: emp.statusPerkawinan,
        pasangan: emp.namaSuamiIstri || '-',
        kerjaPasangan: emp.pekerjaanPasangan || '-',
        anak1: emp.namaAnakPertama || '-',
        anak2: emp.namaAnakKedua || '-',
        anak3: emp.namaAnakKetiga || '-',
        anak4: emp.namaAnakKeempat || '-',
        npwp: emp.noNPWP || '-',
        bank: emp.namaBank,
        rek: emp.noRekeningBank,
        namaEmergency: emp.namaKontakEmergency,
        noEmergency: emp.noKontakEmergency,
        hubunganEmergency: emp.hubunganKontakEmergency,
        socmed: emp.akunSocialMedia || '-',
        tglDaftar: new Date(emp.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      })

      // STYLING DATA ROWS
      row.height = 20
      row.font = { name: 'Calibri', size: 10 }
      row.alignment = { vertical: 'middle', wrapText: false }

      // Zebra striping and borders
      const bgColor = index % 2 === 0 ? 'FFFFFF' : 'F3F3F3'
      row.eachCell((cell, colNumber) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } }
        cell.border = {
          top: { style: 'thin', color: { argb: 'CCCCCC' } },
          left: { style: 'thin', color: { argb: 'CCCCCC' } },
          bottom: { style: 'thin', color: { argb: 'CCCCCC' } },
          right: { style: 'thin', color: { argb: 'CCCCCC' } }
        }

        // Center align for specific columns: NO, dates, gender, religion, blood type, phone numbers, education, status, bank
        const centerCols = [1, 4, 5, 6, 7, 8, 11, 12, 14, 18, 20, 27, 28, 31, 34]
        if (centerCols.includes(colNumber)) {
          cell.alignment = { vertical: 'middle', horizontal: 'center' }
        }
      })
    })

    // FREEZE PANES
    worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 4 }]

    // AUTO FILTER
    worksheet.autoFilter = {
      from: { row: 4, column: 1 },
      to: { row: 4, column: 34 }
    }

    // FOOTER
    const footerRowNum = worksheet.rowCount + 2
    worksheet.mergeCells(`A${footerRowNum}:AH${footerRowNum}`)
    const footerCell = worksheet.getCell(`A${footerRowNum}`)
    footerCell.value = '⚠️ DOKUMEN RAHASIA - Confidential Document - PT. Your Company'
    footerCell.font = { name: 'Calibri', size: 9, italic: true, color: { argb: '666666' } }
    footerCell.alignment = { vertical: 'middle', horizontal: 'center' }

    // GENERATE FILE
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Data_Karyawan_${new Date().toISOString().split('T')[0]}.xlsx`
    link.click()
    window.URL.revokeObjectURL(url)
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
