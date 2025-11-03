import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Get uploaded files
    const ktpFile = formData.get('ktpFile') as File
    const kkFile = formData.get('kkFile') as File
    const npwpFile = formData.get('npwpFile') as File
    const bukuTabunganFile = formData.get('bukuTabunganFile') as File

    if (!ktpFile || !kkFile || !npwpFile || !bukuTabunganFile) {
      return NextResponse.json(
        { error: 'Semua file harus diupload' },
        { status: 400 }
      )
    }

    // Upload files to Cloudinary
    const [ktpPath, kkPath, npwpPath, bukuTabunganPath] = await Promise.all([
      uploadToCloudinary(ktpFile, 'ktp'),
      uploadToCloudinary(kkFile, 'kk'),
      uploadToCloudinary(npwpFile, 'npwp'),
      uploadToCloudinary(bukuTabunganFile, 'buku-tabungan'),
    ])

    // Create employee record
    const employee = await prisma.employee.create({
      data: {
        nama: formData.get('nama') as string,
        perusahaanSebelumnya: formData.get('perusahaanSebelumnya') as string,
        tanggalMasukKerja: new Date(formData.get('tanggalMasukKerja') as string),
        tempatLahir: formData.get('tempatLahir') as string,
        tanggalLahir: new Date(formData.get('tanggalLahir') as string),
        alamatKTP: formData.get('alamatKTP') as string,
        noTeleponRumah: formData.get('noTeleponRumah') as string || null,
        noHandphone: formData.get('noHandphone') as string,
        agama: formData.get('agama') as string,
        pendidikanTerakhir: formData.get('pendidikanTerakhir') as string,
        jurusan: formData.get('jurusan') as string,
        sekolahUniversitas: formData.get('sekolahUniversitas') as string,
        jenisKelamin: formData.get('jenisKelamin') as string,
        noKTP: formData.get('noKTP') as string,
        golonganDarah: formData.get('golonganDarah') as string,
        noNPWP: formData.get('noNPWP') as string || null,
        emailPribadi: formData.get('emailPribadi') as string,
        statusPerkawinan: formData.get('statusPerkawinan') as string,
        jabatan: formData.get('jabatan') as string,
        noRekeningBank: formData.get('noRekeningBank') as string,
        namaBank: formData.get('namaBank') as string,
        namaKontakEmergency: formData.get('namaKontakEmergency') as string,
        noKontakEmergency: formData.get('noKontakEmergency') as string,
        hubunganKontakEmergency: formData.get('hubunganKontakEmergency') as string,
        namaSuamiIstri: formData.get('namaSuamiIstri') as string || null,
        pekerjaanPasangan: formData.get('pekerjaanPasangan') as string || null,
        namaAnakPertama: formData.get('namaAnakPertama') as string || null,
        namaAnakKedua: formData.get('namaAnakKedua') as string || null,
        namaAnakKetiga: formData.get('namaAnakKetiga') as string || null,
        namaAnakKeempat: formData.get('namaAnakKeempat') as string || null,
        domisiliSekarang: formData.get('domisiliSekarang') as string,
        akunSocialMedia: formData.get('akunSocialMedia') as string || null,
        ktpFile: ktpPath,
        kkFile: kkPath,
        npwpFile: npwpPath,
        bukuTabunganFile: bukuTabunganPath,
      },
    })

    return NextResponse.json({ success: true, employee }, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'No KTP sudah terdaftar' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)

    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Terjadi kesalahan saat mengambil data',
        details: errorMessage,
        employees: []
      },
      { status: 500 }
    )
  }
}
