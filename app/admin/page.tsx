"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, User, Phone, Lock, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Admin credentials - في التطبيق الحقيقي يجب تخزينها بشكل آمن
const ADMINS = [
  {
    id: 1,
    name: "زيد مهند خضر",
    phone: "07840285333",
    secretCode: "zaid2024",
  },
  {
    id: 2,
    name: "شيبان محمد",
    phone: "07872198984",
    secretCode: "shaiban2024",
  },
]

export default function AdminLoginPage() {
  const router = useRouter()
  const [selectedAdmin, setSelectedAdmin] = useState("")
  const [phone, setPhone] = useState("")
  const [secretCode, setSecretCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Find admin by name
    const admin = ADMINS.find((a) => a.name === selectedAdmin)

    if (!admin) {
      setError("يرجى اختيار اسم المسؤول")
      setIsLoading(false)
      return
    }

    if (admin.phone !== phone) {
      setError("رقم الهاتف غير صحيح")
      setIsLoading(false)
      return
    }

    if (admin.secretCode !== secretCode) {
      setError("الرمز السري غير صحيح")
      setIsLoading(false)
      return
    }

    // Store admin session
    localStorage.setItem(
      "adminSession",
      JSON.stringify({
        id: admin.id,
        name: admin.name,
        phone: admin.phone,
        loginTime: new Date().toISOString(),
      })
    )

    // Redirect to dashboard
    router.push("/admin/dashboard")
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              <span className="text-primary">فرصتي</span>
              <span className="text-gold">.IQ</span>
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              لوحة تحكم الإدارة
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Admin Name Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                اسم المسؤول
              </label>
              <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="اختر اسم المسؤول" />
                </SelectTrigger>
                <SelectContent>
                  {ADMINS.map((admin) => (
                    <SelectItem key={admin.id} value={admin.name}>
                      {admin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                رقم الهاتف
              </label>
              <Input
                type="tel"
                placeholder="07xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-right"
                dir="ltr"
              />
            </div>

            {/* Secret Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                الرمز السري
              </label>
              <Input
                type="password"
                placeholder="أدخل الرمز السري"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="text-right"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              disabled={isLoading}
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? "جاري الدخول..." : "دخول لوحة التحكم"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              هذه الصفحة مخصصة للمسؤولين فقط
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
