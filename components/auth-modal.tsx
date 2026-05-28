"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Building2, Mail, MessageSquare, Shield, Lock } from "lucide-react"

interface AuthModalProps {
  onLogin: (name: string, phone: string, isCompany?: boolean, companyName?: string) => void
  onAdminLogin?: (name: string) => void
}

// Admin credentials
const ADMINS = [
  { name: "زيد مهند خضر", phone: "07840285333", code: "zaid2024" },
  { name: "شيبان محمد", phone: "07872198984", code: "shaiban2024" },
]

export function AuthModal({ onLogin, onAdminLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"jobseeker" | "company" | "admin">("jobseeker")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  
  // Admin fields
  const [adminName, setAdminName] = useState("")
  const [adminPhone, setAdminPhone] = useState("")
  const [adminCode, setAdminCode] = useState("")
  const [adminError, setAdminError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === "jobseeker") {
      if (name.trim() && phone.trim()) {
        onLogin(name.trim(), phone.trim(), false)
      }
    } else if (activeTab === "company") {
      if (name.trim() && phone.trim() && companyName.trim()) {
        onLogin(name.trim(), phone.trim(), true, companyName.trim())
      }
    }
  }

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError("")
    
    const admin = ADMINS.find(
      a => a.name === adminName && 
           a.phone === adminPhone.replace(/^0/, "") || a.phone === adminPhone &&
           a.code === adminCode
    )
    
    // More precise validation
    const matchedAdmin = ADMINS.find(a => a.name === adminName)
    if (!matchedAdmin) {
      setAdminError("اسم المسؤول غير صحيح")
      return
    }
    
    const phoneMatch = adminPhone === matchedAdmin.phone || adminPhone === "0" + matchedAdmin.phone.slice(2)
    if (!phoneMatch) {
      setAdminError("رقم الهاتف غير صحيح")
      return
    }
    
    if (adminCode !== matchedAdmin.code) {
      setAdminError("الرمز السري غير صحيح")
      return
    }
    
    // Success - redirect to admin dashboard
    if (onAdminLogin) {
      onAdminLogin(adminName)
    } else {
      // Store admin session and redirect
      localStorage.setItem("adminSession", JSON.stringify({ name: adminName, loggedIn: true }))
      window.location.href = "/admin/dashboard"
    }
  }

  const ADMIN_PHONE = "9647840285333"

  const handleCompanyWhatsApp = () => {
    const message = encodeURIComponent(
      `طلب تسجيل شركة جديدة:\n` +
      `اسم الشركة: ${companyName}\n` +
      `اسم المسؤول: ${name}\n` +
      `رقم الهاتف: ${phone}\n` +
      `البريد الإلكتروني: ${email || "غير محدد"}`
    )
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 rounded-2xl bg-card p-8 shadow-2xl border border-border max-h-[90vh] overflow-y-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            فرصتي<span className="text-gold">.IQ</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            منصة التوظيف والخدمات العراقية
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-secondary rounded-lg p-1">
          <button
            type="button"
            onClick={() => setActiveTab("jobseeker")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === "jobseeker"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            باحث عن عمل
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("company")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === "company"
                ? "bg-gold text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            شركة
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === "admin"
                ? "bg-destructive text-destructive-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            مسؤول
          </button>
        </div>

        {/* Job Seeker & Company Forms */}
        {activeTab !== "admin" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "company" && (
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-foreground font-medium">
                  اسم الشركة / الجهة
                </Label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="أدخل اسم الشركة"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                {activeTab === "company" ? "اسم المسؤول" : "الاسم الكامل"}
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder={activeTab === "company" ? "اسم مسؤول التوظيف" : "أدخل اسمك الكامل"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                رقم الهاتف
              </Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {activeTab === "company" && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  البريد الإلكتروني (اختياري)
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {activeTab === "jobseeker" ? (
              <Button
                type="submit"
                className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold text-lg"
              >
                دخول
              </Button>
            ) : (
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gold hover:bg-gold/90 text-background font-semibold text-lg"
                >
                  تسجيل الشركة
                </Button>
                <Button
                  type="button"
                  onClick={handleCompanyWhatsApp}
                  className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  تواصل معنا عبر الواتساب
                </Button>
              </div>
            )}
          </form>
        )}

        {/* Admin Form */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/30 mb-4">
              <div className="flex items-center gap-2 text-destructive">
                <Shield className="h-5 w-5" />
                <span className="font-medium">منطقة المسؤولين فقط</span>
              </div>
            </div>

            {/* Admin Name */}
            <div className="space-y-2">
              <Label htmlFor="adminName" className="text-foreground font-medium">
                اسم المسؤول
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="adminName"
                  type="text"
                  placeholder="أدخل اسم المسؤول"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Admin Phone */}
            <div className="space-y-2">
              <Label htmlFor="adminPhone" className="text-foreground font-medium">
                رقم الهاتف
              </Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="adminPhone"
                  type="tel"
                  placeholder="07xxxxxxxxx"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {/* Admin Code */}
            <div className="space-y-2">
              <Label htmlFor="adminCode" className="text-foreground font-medium">
                الرمز السري
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="adminCode"
                  type="password"
                  placeholder="أدخل الرمز السري"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="pr-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {adminError && (
              <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/30">
                <p className="text-destructive text-sm text-center">{adminError}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-lg"
            >
              دخول لوحة التحكم
            </Button>
          </form>
        )}

        {activeTab === "company" && (
          <div className="mt-4 p-3 bg-gold/10 rounded-lg border border-gold/30">
            <p className="text-sm text-foreground text-center">
              للشركات: أضف إعلانات التوظيف الخاصة بك وتواصل مع آلاف الباحثين عن عمل
            </p>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6">
          بالدخول، أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </p>
      </div>
    </div>
  )
}
