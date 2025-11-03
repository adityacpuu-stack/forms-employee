-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "perusahaanSebelumnya" TEXT NOT NULL,
    "tanggalMasukKerja" DATETIME NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" DATETIME NOT NULL,
    "alamatKTP" TEXT NOT NULL,
    "noTeleponRumah" TEXT,
    "noHandphone" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "pendidikanTerakhir" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "sekolahUniversitas" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "noKTP" TEXT NOT NULL,
    "golonganDarah" TEXT NOT NULL,
    "noNPWP" TEXT,
    "emailPribadi" TEXT NOT NULL,
    "statusPerkawinan" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "noRekeningBank" TEXT NOT NULL,
    "namaBank" TEXT NOT NULL,
    "namaKontakEmergency" TEXT NOT NULL,
    "noKontakEmergency" TEXT NOT NULL,
    "hubunganKontakEmergency" TEXT NOT NULL,
    "namaSuamiIstri" TEXT,
    "pekerjaanPasangan" TEXT,
    "namaAnakPertama" TEXT,
    "namaAnakKedua" TEXT,
    "namaAnakKetiga" TEXT,
    "namaAnakKeempat" TEXT,
    "domisiliSekarang" TEXT NOT NULL,
    "akunSocialMedia" TEXT,
    "ktpFile" TEXT NOT NULL,
    "kkFile" TEXT NOT NULL,
    "npwpFile" TEXT NOT NULL,
    "bukuTabunganFile" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_noKTP_key" ON "Employee"("noKTP");
