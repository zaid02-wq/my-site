"use client"

import { Button } from "@/components/ui/button"
import { Building2, Briefcase, Users, MessageSquare, CheckCircle } from "lucide-react"

const ADMIN_PHONE = "9647840285333"

const benefits = [
  { icon: Users, text: "وصول لآلاف الباحثين عن عمل" },
  { icon: Briefcase, text: "نشر إعلانات توظيف مميزة" },
  { icon: CheckCircle, text: "فلترة وإدارة المتقدمين" },
]

export function CompanySection() {
  const handleContactAdmin = () => {
    const message = encodeURIComponent(
      `مرحباً، أريد إضافة إعلان توظيف لشركتي في منصة فرصتي.IQ`
    )
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${message}`, "_blank")
  }

  return (
    <section className="py-8">
      <div className="bg-gradient-to-l from-primary/20 to-gold/20 rounded-2xl p-6 md:p-8 border border-gold/30">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-gold" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              هل أنت شركة أو جهة توظيف؟
            </h2>
            <p className="text-muted-foreground mb-4">
              أضف إعلانات التوظيف الخاصة بك وتواصل مع أفضل الكوادر العراقية
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <benefit.icon className="h-4 w-4 text-gold" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button
              onClick={handleContactAdmin}
              size="lg"
              className="bg-success hover:bg-success/90 text-success-foreground font-semibold flex items-center gap-2 h-14 px-8"
            >
              <MessageSquare className="h-5 w-5" />
              أضف إعلان توظيف
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
