import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const namaDepan = ['Budi', 'Andi', 'Siti', 'Dewi', 'Rudi', 'Rina', 'Joko', 'Tuti', 'Agus', 'Lina', 'Hendra', 'Maya', 'Dedi', 'Ratna', 'Bambang']
const namaBelakang = ['Santoso', 'Wijaya', 'Kusuma', 'Pratama', 'Putri', 'Saputra', 'Wati', 'Nugroho', 'Setiawan', 'Rahayu', 'Firmansyah', 'Lestari', 'Permana', 'Sari', 'Wibowo']
const perusahaan = ['PT Maju Jaya', 'CV Sejahtera', 'PT Sukses Makmur', 'PT Karya Mandiri', 'CV Berkah Abadi', 'PT Global Indo', 'PT Nusantara Prima']
const kota = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Medan', 'Makassar', 'Palembang', 'Tangerang', 'Depok']
const agama = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha']
const pendidikan = ['SMA/SMK', 'D3', 'S1', 'S2']
const jurusan = ['Teknik Informatika', 'Manajemen', 'Akuntansi', 'Teknik Sipil', 'Desain Grafis', 'Administrasi', 'Marketing', 'Teknik Mesin']
const universitas = ['Universitas Indonesia', 'Institut Teknologi Bandung', 'Universitas Gadjah Mada', 'Universitas Brawijaya', 'Universitas Diponegoro', 'Politeknik Negeri Jakarta', 'SMK Negeri 1']
const jabatan = ['Staff IT', 'Marketing Executive', 'Finance Staff', 'HR Officer', 'Project Manager', 'Sales Representative', 'Admin', 'Supervisor', 'Analyst']
const bank = ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga', 'Permata', 'Danamon']
const golDarah = ['A', 'B', 'AB', 'O']
const statusNikah = ['Belum Menikah', 'Menikah', 'Cerai']

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateKTP(): string {
  return '31' + Math.floor(Math.random() * 10000000000000).toString().padStart(14, '0')
}

function generatePhone(): string {
  return '08' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
}

function generateNPWP(): string {
  return Math.floor(Math.random() * 100000000000000).toString().padStart(15, '0')
}

function generateRekening(): string {
  return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.employee.deleteMany()
  console.log('🗑️  Cleared existing data')

  // Create 15 random employees
  for (let i = 0; i < 15; i++) {
    const firstName = randomElement(namaDepan)
    const lastName = randomElement(namaBelakang)
    const nama = `${firstName} ${lastName}`
    const jenisKelamin = ['Laki-laki', 'Perempuan'][Math.floor(Math.random() * 2)]
    const status = randomElement(statusNikah)
    const tanggalLahir = randomDate(new Date(1980, 0, 1), new Date(2000, 11, 31))
    const kotaLahir = randomElement(kota)

    const employee = await prisma.employee.create({
      data: {
        nama,
        perusahaanSebelumnya: randomElement(perusahaan),
        tanggalMasukKerja: randomDate(new Date(2020, 0, 1), new Date(2024, 10, 1)),
        tempatLahir: kotaLahir,
        tanggalLahir,
        alamatKTP: `Jl. ${randomElement(['Merdeka', 'Sudirman', 'Gatot Subroto', 'Ahmad Yani', 'Diponegoro'])} No. ${Math.floor(Math.random() * 100) + 1}, ${randomElement(kota)}`,
        noTeleponRumah: Math.random() > 0.5 ? '021' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0') : null,
        noHandphone: generatePhone(),
        agama: randomElement(agama),
        pendidikanTerakhir: randomElement(pendidikan),
        jurusan: randomElement(jurusan),
        sekolahUniversitas: randomElement(universitas),
        jenisKelamin,
        noKTP: generateKTP(),
        golonganDarah: randomElement(golDarah),
        noNPWP: Math.random() > 0.3 ? generateNPWP() : null,
        emailPribadi: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        statusPerkawinan: status,
        jabatan: randomElement(jabatan),
        noRekeningBank: generateRekening(),
        namaBank: randomElement(bank),
        namaKontakEmergency: `${randomElement(namaDepan)} ${randomElement(namaBelakang)}`,
        noKontakEmergency: generatePhone(),
        hubunganKontakEmergency: randomElement(['Orang Tua', 'Saudara Kandung', 'Suami', 'Istri', 'Keponakan']),
        namaSuamiIstri: status === 'Menikah' ? `${randomElement(namaDepan)} ${randomElement(namaBelakang)}` : null,
        pekerjaanPasangan: status === 'Menikah' ? randomElement(['Guru', 'Dokter', 'Pegawai Swasta', 'Wirausaha', 'PNS', 'Ibu Rumah Tangga']) : null,
        namaAnakPertama: status === 'Menikah' && Math.random() > 0.3 ? `${randomElement(namaDepan)} ${lastName}` : null,
        namaAnakKedua: status === 'Menikah' && Math.random() > 0.6 ? `${randomElement(namaDepan)} ${lastName}` : null,
        namaAnakKetiga: status === 'Menikah' && Math.random() > 0.8 ? `${randomElement(namaDepan)} ${lastName}` : null,
        namaAnakKeempat: status === 'Menikah' && Math.random() > 0.9 ? `${randomElement(namaDepan)} ${lastName}` : null,
        domisiliSekarang: `Jl. ${randomElement(['Kebon Jeruk', 'Tebet', 'Menteng', 'Kebayoran', 'Pondok Indah'])} No. ${Math.floor(Math.random() * 200) + 1}, ${randomElement(kota)}`,
        akunSocialMedia: Math.random() > 0.4 ? `@${firstName.toLowerCase()}${lastName.toLowerCase()}` : null,
        ktpFile: '/uploads/ktp_dummy.jpg',
        kkFile: '/uploads/kk_dummy.jpg',
        npwpFile: '/uploads/npwp_dummy.jpg',
        bukuTabunganFile: '/uploads/buku_tabungan_dummy.jpg',
      },
    })

    console.log(`✅ Created employee: ${employee.nama}`)
  }

  console.log('✨ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
