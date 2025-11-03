import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Data Karyawan | PFI Groups",
  description: "Dashboard admin untuk melihat dan mengelola data karyawan PFI Groups",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
