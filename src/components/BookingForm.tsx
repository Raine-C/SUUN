'use client'

import { useActionState } from 'react'
import { submitBooking, type BookingState } from '@/app/actions/booking'

export default function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    submitBooking,
    null
  )

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input
        type="text"
        name="name"
        placeholder="希望怎麼稱呼"
        required
        className="input-dark"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="input-dark"
        />
        <input
          type="text"
          name="inquiry"
          placeholder="諮詢項目"
          className="input-dark"
        />
      </div>
      <input
        type="text"
        name="date"
        placeholder="拜訪工作室日期"
        className="input-dark"
      />

      {state && (
        <p className={`font-inter text-[13px] leading-[1.6] ${
          state.success ? 'text-[#AFD9F2]' : 'text-[#FFB3B3]'
        }`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary text-center cursor-pointer w-full disabled:opacity-50"
      >
        {pending ? '送出中…' : '送出預約'}
      </button>
    </form>
  )
}
