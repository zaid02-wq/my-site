"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Briefcase } from "lucide-react"

interface JobGridProps {
  activeCategory: string
  onApply: (jobTitle: string, company: string, cost: number) => boolean
}

const jobs = [
  {
    id: 1,
    title: "مطور واجهات أمامية",
    company: "شركة التقنية العراقية",
    city: "بغداد",
    category: "حاسبات",
    cost: 5000,
  },
  {
    id: 2,
    title: "مصمم جرافيك",
    company: "وكالة الإبداع",
    city: "أربيل",
    category: "تصميم",
    cost: 5000,
  },
  {
    id: 3,
    title: "مهندس برمجيات",
    company: "شركة الحلول الذكية",
    city: "البصرة",
    category: "حاسبات",
    cost: 5000,
  },
  {
    id: 4,
    title: "مصمم UI/UX",
    company: "استوديو التصميم",
    city: "بغداد",
    category: "تصميم",
    cost: 5000,
  },
  {
    id: 5,
    title: "محلل بيانات",
    company: "شركة البيانات الضخمة",
    city: "النجف",
    category: "حاسبات",
    cost: 5000,
  },
  {
    id: 6,
    title: "مصمم هوية بصرية",
    company: "وكالة العلامات التجارية",
    city: "السليمانية",
    category: "تصميم",
    cost: 5000,
  },
]

export function JobGrid({ activeCategory, onApply }: JobGridProps) {
  const filteredJobs = activeCategory === "الكل" 
    ? jobs 
    : activeCategory === "طلبات خاصة"
    ? []
    : jobs.filter(job => job.category === activeCategory)

  if (filteredJobs.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">الوظائف المتاحة</h2>
        <div className="text-center py-12 text-muted-foreground">
          {activeCategory === "طلبات خاصة" 
            ? "تواصل مع خبراء VIP أعلاه للطلبات الخاصة"
            : "لا توجد وظائف متاحة في هذه الفئة حالياً"
          }
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-6">الوظائف المتاحة</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-foreground text-lg leading-tight">
                  {job.title}
                </h3>
                <Badge variant="secondary" className="shrink-0 bg-secondary text-secondary-foreground">
                  {job.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Building2 className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{job.city}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => onApply(job.title, job.company, job.cost)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Briefcase className="h-4 w-4" />
                تقديم على الوظيفة ({job.cost.toLocaleString()} د.ع)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
