# Form Registrasi Karyawan Baru

Aplikasi web untuk form registrasi karyawan baru dengan fitur admin dashboard dan export ke Excel.

## Fitur

- Form registrasi karyawan yang lengkap
- Upload dokumen (KTP, KK, NPWP, Buku Tabungan)
- Admin dashboard untuk melihat semua data karyawan
- Export data ke Excel (.xlsx)
- Database SQLite dengan Prisma ORM
- Responsive design dengan Tailwind CSS

## Teknologi

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- SQLite Database
- Tailwind CSS
- XLSX (untuk export Excel)

## Instalasi

1. Clone repository ini

2. Install dependencies:
```bash
npm install
```

3. Setup database (sudah otomatis jika belum ada):
```bash
npx prisma generate
npx prisma migrate dev
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di [http://localhost:3000](http://localhost:3000)

## Struktur Aplikasi

```
├── app/
│   ├── page.tsx              # Form registrasi karyawan
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   └── api/
│       └── employees/
│           └── route.ts      # API endpoint
├── prisma/
│   └── schema.prisma         # Database schema
├── lib/
│   └── prisma.ts             # Prisma client
└── public/
    └── uploads/              # Folder untuk file upload
```

## Penggunaan

### Form Registrasi
1. Buka halaman utama (http://localhost:3000)
2. Isi semua field yang required (ditandai dengan *)
3. Upload dokumen yang diperlukan (max 10MB per file)
4. Klik "Kirim Form"

### Admin Dashboard
1. Buka http://localhost:3000/admin
2. Lihat daftar semua karyawan yang sudah terdaftar
3. Klik "Lihat Detail" untuk melihat informasi lengkap
4. Klik "Export ke Excel" untuk download data dalam format .xlsx

## Database

Database menggunakan SQLite dan file database ada di `prisma/dev.db`

Untuk reset database:
```bash
npx prisma migrate reset
```

## Build Production

```bash
npm run build
npm start
```

## Catatan Penting

- File upload maksimal 10MB per file
- No KTP harus unique (tidak boleh duplikat)
- Semua file upload disimpan di folder `public/uploads/`
- Data tersimpan di database SQLite (`prisma/dev.db`)
