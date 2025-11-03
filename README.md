# Form Registrasi Karyawan Baru

Aplikasi web untuk form registrasi karyawan baru dengan fitur admin dashboard dan export ke Excel.

## Fitur

- Form registrasi karyawan yang lengkap (34 field)
- Upload dokumen (KTP, KK, NPWP, Buku Tabungan)
- Admin dashboard dengan tabel data yang rapih
- Export data ke Excel dengan template professional
  - Category headers berwarna
  - Freeze panes & Auto filter
  - Zebra striping
  - 8 kategori data terorganisir
- Database PostgreSQL (Supabase)
- Responsive design dengan Tailwind CSS

## Teknologi

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Tailwind CSS
- ExcelJS (untuk export Excel professional)

## Setup Database (Supabase)

### 1. Buat Project di Supabase

1. Buka https://supabase.com dan login/signup
2. Klik **New Project**
3. Isi detail project:
   - **Name**: employee-registration
   - **Database Password**: (buat password yang kuat & simpan!)
   - **Region**: Pilih yang terdekat dengan Anda
4. Tunggu ~2 menit hingga project selesai dibuat

### 2. Dapatkan Connection String

1. Di Supabase Dashboard, klik **Project Settings** (icon ⚙️)
2. Pilih **Database** di sidebar
3. Scroll ke **Connection String**
4. Copy 2 connection strings:
   - **Session pooling** (port 6543) → untuk DATABASE_URL
   - **Direct connection** (port 5432) → untuk DIRECT_URL
5. Ganti `[YOUR-PASSWORD]` dengan password database Anda

### 3. Setup Environment Variables

1. Copy file `.env.example` ke `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` dan isi dengan connection string dari Supabase:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"
```

## Instalasi Local

1. Clone repository ini

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables (lihat section di atas)

4. Jalankan migration database:
```bash
npx prisma migrate dev --name init
```

5. (Optional) Seed data dummy:
```bash
npm run seed
```

6. Jalankan development server:
```bash
npm run dev
```

7. Buka browser di [http://localhost:3000](http://localhost:3000)

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

## Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 2. Deploy di Vercel

1. Buka https://vercel.com dan login
2. Klik **Add New** → **Project**
3. Import repository GitHub Anda
4. Di **Environment Variables**, tambahkan:
   - `DATABASE_URL`: Connection string Supabase (Session pooling - port 6543)
   - `DIRECT_URL`: Connection string Supabase (Direct - port 5432)
5. Klik **Deploy**
6. Tunggu deployment selesai (~2-3 menit)

### 3. Setup Database di Production

Setelah deployment berhasil, jalankan migration di Vercel:

```bash
# Install Vercel CLI jika belum
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull .env.production
npx prisma migrate deploy
```

Atau bisa juga lewat Vercel Dashboard:
1. Buka project di Vercel
2. **Settings** → **Environment Variables**
3. Pastikan `DATABASE_URL` dan `DIRECT_URL` sudah ada
4. Deploy ulang jika perlu

## Database Management

### Reset Database
```bash
npx prisma migrate reset
```

### Lihat Database di Supabase
1. Buka Supabase Dashboard
2. Klik **Table Editor**
3. Lihat table `Employee` dan `User`

### Backup Database
```bash
# Export data
npx prisma db pull
```

## Catatan Penting

- **File upload** maksimal 10MB per file
- **No KTP** harus unique (tidak boleh duplikat)
- Semua file upload disimpan di folder `public/uploads/`
- Database menggunakan **PostgreSQL di Supabase**
- Connection pooling (port 6543) untuk queries
- Direct connection (port 5432) untuk migrations

## Troubleshooting

### Error: Prisma Client tidak initialize
```bash
npx prisma generate
```

### Error saat migration
```bash
# Pastikan DIRECT_URL sudah di set di .env
npx prisma migrate dev --name init
```

### Vercel deployment gagal
1. Cek environment variables sudah benar
2. Pastikan `DATABASE_URL` dan `DIRECT_URL` ada
3. Cek build logs di Vercel dashboard
