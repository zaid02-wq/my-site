"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  Users,
  LogOut,
  Phone,
  Calendar,
  Building2,
  User,
  Wallet,
  Search,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RegisteredUser {
  id: number
  name: string
  phone: string
  type: "user" | "company"
  companyName?: string
  email?: string
  registeredAt: string
  balance: number
}

// Mock data - في التطبيق الحقيقي يتم جلبها من قاعدة البيانات
const MOCK_USERS: RegisteredUser[] = [
  {
    id: 1,
    name: "أحمد محمد علي",
    phone: "07701234567",
    type: "user",
    registeredAt: "2024-01-15",
    balance: 25000,
  },
  {
    id: 2,
    name: "فاطمة حسين",
    phone: "07809876543",
    type: "user",
    registeredAt: "2024-01-16",
    balance: 10000,
  },
  {
    id: 3,
    name: "محمد أحمد",
    phone: "07712345678",
    type: "company",
    companyName: "شركة التقنية المتقدمة",
    email: "info@techadvanced.iq",
    registeredAt: "2024-01-17",
    balance: 50000,
  },
  {
    id: 4,
    name: "علي كريم",
    phone: "07823456789",
    type: "user",
    registeredAt: "2024-01-18",
    balance: 5000,
  },
  {
    id: 5,
    name: "سارة عبدالله",
    phone: "07734567890",
    type: "company",
    companyName: "مؤسسة النور للتوظيف",
    email: "hr@alnoor.iq",
    registeredAt: "2024-01-19",
    balance: 75000,
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [adminName, setAdminName] = useState("")
  const [users, setUsers] = useState<RegisteredUser[]>(MOCK_USERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "user" | "company">("all")

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem("adminSession")
    if (!session) {
      router.push("/admin")
      return
    }

    const adminData = JSON.parse(session)
    setAdminName(adminData.name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin")
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.includes(searchQuery) ||
      user.phone.includes(searchQuery) ||
      (user.companyName && user.companyName.includes(searchQuery))

    const matchesType = filterType === "all" || user.type === filterType

    return matchesSearch && matchesType
  })

  const totalUsers = users.filter((u) => u.type === "user").length
  const totalCompanies = users.filter((u) => u.type === "company").length
  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0)

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span>فرصتي</span>
                <span className="text-gold">.IQ</span>
                <span className="text-sm font-normal mr-2">- لوحة التحكم</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm opacity-90">مرحباً، {adminName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-primary/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المستخدمين</p>
                <p className="text-2xl font-bold text-primary">{totalUsers}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/30">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الشركات</p>
                <p className="text-2xl font-bold text-gold">{totalCompanies}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/30">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأرصدة</p>
                <p className="text-2xl font-bold text-success">
                  {totalBalance.toLocaleString()} د.ع
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                قائمة المسجلين
              </CardTitle>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث بالاسم أو الهاتف..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-full sm:w-64"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("all")}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={filterType === "user" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("user")}
                  >
                    أفراد
                  </Button>
                  <Button
                    variant={filterType === "company" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("company")}
                    className={
                      filterType === "company"
                        ? "bg-gold hover:bg-gold/90 text-gold-foreground"
                        : ""
                    }
                  >
                    شركات
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">رقم الهاتف</TableHead>
                    <TableHead className="text-right">الشركة</TableHead>
                    <TableHead className="text-right">تاريخ التسجيل</TableHead>
                    <TableHead className="text-right">الرصيد</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-muted-foreground"
                      >
                        لا توجد نتائج
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <TableRow key={user.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                user.type === "company"
                                  ? "bg-gold/10"
                                  : "bg-primary/10"
                              }`}
                            >
                              {user.type === "company" ? (
                                <Building2 className="w-4 h-4 text-gold" />
                              ) : (
                                <User className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.type === "company" ? "default" : "secondary"
                            }
                            className={
                              user.type === "company"
                                ? "bg-gold/20 text-gold hover:bg-gold/30"
                                : ""
                            }
                          >
                            {user.type === "company" ? "شركة" : "فرد"}
                          </Badge>
                        </TableCell>
                        <TableCell dir="ltr" className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            {user.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.companyName || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            {new Date(user.registeredAt).toLocaleDateString(
                              "ar-IQ"
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-success font-medium">
                            {user.balance.toLocaleString()} د.ع
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
