'use server'

import nodemailer from 'nodemailer'

export type BookingState = {
  success: boolean
  message: string
} | null

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const name    = (formData.get('name')    as string | null)?.trim() ?? ''
  const email   = (formData.get('email')   as string | null)?.trim() ?? ''
  const inquiry = (formData.get('inquiry') as string | null)?.trim() ?? ''
  const date    = (formData.get('date')    as string | null)?.trim() ?? ''

  if (!name || !email) {
    return { success: false, message: '請填寫姓名與 Email' }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Notification to studio
    await transporter.sendMail({
      from: `"曙溫 SUUN" <${process.env.SMTP_USER}>`,
      to: 'suunedesign@gmail.com',
      subject: `新預約申請 — ${name}`,
      text: [
        `姓名：${name}`,
        `Email：${email}`,
        `諮詢項目：${inquiry || '—'}`,
        `希望日期：${date || '—'}`,
      ].join('\n'),
    })

    // Auto-reply to customer
    await transporter.sendMail({
      from: `"曙溫 SUUN" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '預約成功確認 — 曙溫 SUUN',
      text: `Hi ${name}，

預約已成功，感謝您選擇曙溫。
我們將於 24 小時內與您聯繫，確認預約需求與到店量身時間。
在見面前，您可以先物色喜歡的穿搭範例，屆時現場溝通會更精準喔，我們下週見！

溫馨提醒：建議預留 1.5～2 小時的諮詢時間

— 曙溫 SUUN`,
    })

    return { success: true, message: '預約已送出！我們將於 24 小時內與您聯繫。' }
  } catch (err) {
    console.error('Booking email error:', err)
    return { success: false, message: '送出失敗，請稍後再試或直接來信 suunedesign@gmail.com' }
  }
}
