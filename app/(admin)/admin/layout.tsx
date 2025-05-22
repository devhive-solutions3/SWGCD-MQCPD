"use client"

import { ReactNode } from "react"
import AdminNavbar from "@/components/admin/AdminNavbar"
import { Box } from "@chakra-ui/react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <Box as="main" p={4}>
        {children}
      </Box>
    </>
  )
} 