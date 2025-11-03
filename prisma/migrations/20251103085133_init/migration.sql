-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `perusahaanSebelumnya` VARCHAR(191) NOT NULL,
    `tanggalMasukKerja` DATETIME(3) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamatKTP` VARCHAR(191) NOT NULL,
    `noTeleponRumah` VARCHAR(191) NULL,
    `noHandphone` VARCHAR(191) NOT NULL,
    `agama` VARCHAR(191) NOT NULL,
    `pendidikanTerakhir` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,
    `sekolahUniversitas` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `noKTP` VARCHAR(191) NOT NULL,
    `golonganDarah` VARCHAR(191) NOT NULL,
    `noNPWP` VARCHAR(191) NULL,
    `emailPribadi` VARCHAR(191) NOT NULL,
    `statusPerkawinan` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `noRekeningBank` VARCHAR(191) NOT NULL,
    `namaBank` VARCHAR(191) NOT NULL,
    `namaKontakEmergency` VARCHAR(191) NOT NULL,
    `noKontakEmergency` VARCHAR(191) NOT NULL,
    `hubunganKontakEmergency` VARCHAR(191) NOT NULL,
    `namaSuamiIstri` VARCHAR(191) NULL,
    `pekerjaanPasangan` VARCHAR(191) NULL,
    `namaAnakPertama` VARCHAR(191) NULL,
    `namaAnakKedua` VARCHAR(191) NULL,
    `namaAnakKetiga` VARCHAR(191) NULL,
    `namaAnakKeempat` VARCHAR(191) NULL,
    `domisiliSekarang` VARCHAR(191) NOT NULL,
    `akunSocialMedia` VARCHAR(191) NULL,
    `ktpFile` VARCHAR(191) NOT NULL,
    `kkFile` VARCHAR(191) NOT NULL,
    `npwpFile` VARCHAR(191) NOT NULL,
    `bukuTabunganFile` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_noKTP_key`(`noKTP`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
