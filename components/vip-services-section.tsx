"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, Code, Volume2, Cpu } from "lucide-react"

const vipExperts = [
  {
    id: 1,
    name: "زيد مهند خضر",
    title: "مبرمج ومهندس صوت",
    skills: ["برمجة", "هندسة صوت", "تطوير تطبيقات"],
    phone: "9647840285333",
    icon: Code,
  },
  {
    id: 2,
    name: "شيبان محمد",
    title: "خبير تقني",
    skills: ["حلول تقنية", "استشارات IT", "دعم فني"],
    phone: "9647872198984",
    icon: Cpu,
  },
]

export function VipServicesSection() {
  const handleContact = (name: string, phone: string) => {
    const message = encodeURIComponent(
      `مرحباً ${name}،\n` +
      `أود التواصل معك بخصوص خدماتك المتميزة.`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-6 w-6 text-gold fill-gold" />
        <h2 className="text-xl font-bold text-foreground">خدمات VIP مميزة</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {vipExperts.map((expert) => {
          const Icon = expert.icon
          return (
            <Card 
              key={expert.id} 
              className="bg-primary border-2 border-gold overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar/Icon */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold/20 border-2 border-gold">
                    <Icon className="h-8 w-8 text-gold" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-primary-foreground text-lg truncate">
                        {expert.name}
                      </h3>
                      <Badge className="bg-gold text-gold-foreground shrink-0 gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        VIP
                      </Badge>
                    </div>
                    <p className="text-primary-foreground/80 text-sm mb-3">
                      {expert.title}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-primary-foreground/30 text-primary-foreground/90 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Contact Button */}
                    <Button
                      onClick={() => handleContact(expert.name, expert.phone)}
                      className="w-full bg-success hover:bg-success/90 text-success-foreground gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      مراسلة عبر الواتساب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
