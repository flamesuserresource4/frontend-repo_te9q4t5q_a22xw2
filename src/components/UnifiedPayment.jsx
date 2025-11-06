import { useState } from 'react'

// UnifiedPayment props
// - amount: number (in INR)
// - eventName: string
// - onCreateOrder: () => Promise<{ orderId: string }>
// - onVerify: (payload: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) => Promise<boolean>
// - onSuccess: () => void
// - onError: (msg: string) => void
export default function UnifiedPayment({ amount, eventName, onCreateOrder, onVerify, onSuccess, onError }) {
  const [loading, setLoading] = useState(false)

  const startPayment = async () => {
    try {
      setLoading(true)
      const { orderId } = await onCreateOrder()
      // Simulated Razorpay flow for this demo environment.
      // In production, use Razorpay Checkout and pass key/order_id.
      const mockPaymentId = 'pay_' + Math.random().toString(36).slice(2)
      const mockSignature = 'sig_' + Math.random().toString(36).slice(2)
      const verified = await onVerify({
        razorpay_order_id: orderId,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: mockSignature,
      })
      if (verified) onSuccess()
      else onError('Payment verification failed')
    } catch (e) {
      onError(e.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
      <div className="space-y-1">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{eventName}</div>
        <div className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">₹{amount.toLocaleString()}</div>
      </div>
      <button disabled={loading} onClick={startPayment} className={`mt-4 w-full rounded-xl px-4 py-3 font-medium ${loading ? 'bg-neutral-200 text-neutral-500' : 'bg-black text-white'}`}>
        {loading ? 'Processing…' : `Pay ₹${amount.toLocaleString()}`}
      </button>
    </div>
  )
}
