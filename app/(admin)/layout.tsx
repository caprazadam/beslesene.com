import type React from "react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}
