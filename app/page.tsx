"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AuthModal } from "@/components/auth-modal"
import { WalletSection } from "@/components/wallet-section"
import { VipServicesSection } from "@/components/vip-services-section"
import { CompanySection } from "@/components/company-section"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(true)
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null)
  const [balance, setBalance] = useState(0)

  const handleLogin = (name: string, phone: string, isCompany?: boolean, companyName?: string) => {
    setUser({ name, phone })
    setIsLoggedIn(true)
    setShowAuthModal(false)
    setBalance(0) // Strictly 0 initial balance
    
    // If company, redirect to WhatsApp to contact admin
    if (isCompany && companyName) {
      const message = encodeURIComponent(
        `طلب تسجيل شركة جديدة:\n` +
        `اسم الشركة: ${companyName}\n` +
        `اسم المسؤول: ${name}\n` +
        `رقم الهاتف: ${phone}`
      )
      window.open(`https://wa.me/9647840285333?text=${message}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header balance={balance} userName={user?.name} />
      
      {showAuthModal && !isLoggedIn && (
        <AuthModal onLogin={handleLogin} />
      )}

      <main className="container mx-auto px-4 py-8 space-y-8">
        <WalletSection user={user} />
        
        <CompanySection />
        
        <VipServicesSection />
      </main>
    </div>
  )
}
