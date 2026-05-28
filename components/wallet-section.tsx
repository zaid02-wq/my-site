"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreditCard, Send, Wallet } from "lucide-react"

interface WalletSectionProps {
  user: { name: string; phone: string } | null
}

export function WalletSection({ user }: WalletSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amount, setAmount] = useState("")
  const [transactionId, setTransactionId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod || !amount || !transactionId) {
      alert("يرجى ملء جميع الحقول")
      return
    }

    const message = encodeURIComponent(
      `طلب شحن محفظة:\n` +
      `الاسم: ${user?.name || "غير معروف"}\n` +
      `الهاتف: ${user?.phone || "غير معروف"}\n` +
      `طريقة الدفع: ${paymentMethod}\n` +
      `المبلغ: ${amount} د.ع\n` +
      `رقم العملية (Trx ID): ${transactionId}`
    )
    
    window.open(`https://wa.me/9647700000000?text=${message}`, "_blank")
    
    // Reset form
    setPaymentMethod("")
    setAmount("")
    setTransactionId("")
  }

  return (
    <section className="rounded-2xl bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
          <Wallet className="h-5 w-5 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">شحن محفظة الحساب</h2>
          <p className="text-sm text-muted-foreground">اشحن رصيدك للتقديم على الوظائف</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Payment Method */}
        <div className="space-y-2">
          <Label htmlFor="payment-method" className="text-foreground font-medium">
            طريقة الدفع
          </Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="h-12 bg-secondary border-border">
              <SelectValue placeholder="اختر طريقة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="زين كاش">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>زين كاش</span>
                </div>
              </SelectItem>
              <SelectItem value="ماستر كارد">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>ماستر كارد</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-foreground font-medium">
            المبلغ (د.ع)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="أدخل المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            dir="ltr"
            min="1000"
            step="1000"
          />
        </div>

        {/* Transaction ID */}
        <div className="space-y-2">
          <Label htmlFor="trx-id" className="text-foreground font-medium">
            رقم العملية (Trx ID)
          </Label>
          <Input
            id="trx-id"
            type="text"
            placeholder="أدخل رقم العملية"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            dir="ltr"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold gap-2"
          >
            <Send className="h-4 w-4" />
            إرسال طلب شحن للمسؤول
          </Button>
        </div>
      </form>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        سيتم مراجعة طلبك من قبل المسؤول وإضافة الرصيد بعد التأكيد
      </p>
    </section>
  )
}
