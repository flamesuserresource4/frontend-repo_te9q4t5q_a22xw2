import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'

function Stepper({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      {[1,2,3].map((n) => (
        <div key={n} className={`h-2 rounded-full transition-all ${step >= n ? 'bg-black w-8' : 'bg-neutral-300 dark:bg-neutral-700 w-4'}`} />
      ))}
    </div>
  )
}

export default function RegisterModal({ open, onClose, ticket, teamRules, onConfirm }) {
  const [step, setStep] = useState(1)
  const [teamName, setTeamName] = useState('')
  const [isLeader, setIsLeader] = useState(true)
  const [leaderEmail, setLeaderEmail] = useState('')
  const [size, setSize] = useState(1)
  const [accept, setAccept] = useState(false)

  useEffect(() => {
    if (open) {
      setStep(1)
      setTeamName('')
      setIsLeader(true)
      setLeaderEmail('')
      setSize(teamRules?.min || 1)
      setAccept(false)
    }
  }, [open, teamRules])

  const fees = useMemo(() => Math.round((ticket?.price || 0) * size * 0.03), [ticket, size])
  const total = useMemo(() => (ticket?.price || 0) * size + fees, [ticket, size, fees])

  if (!open) return null

  const emailValid = !leaderEmail || /\S+@\S+\.\S+/.test(leaderEmail)

  const canContinueStep1 = teamName && (!isLeader ? emailValid && leaderEmail : true)
  const canPay = accept && step === 3

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Register</div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"><X className="h-5 w-5" /></button>
        </div>
        <Stepper step={step} />

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Team name</label>
              <input value={teamName} onChange={(e)=>setTeamName(e.target.value)} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2" placeholder="e.g., Byte Bandits" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>setIsLeader(true)} className={`px-3 py-2 rounded-lg border ${isLeader ? 'bg-black text-white border-black' : 'bg-white text-black dark:bg-neutral-950 dark:text-white border-neutral-300 dark:border-neutral-700'}`}>I am leader</button>
              <button onClick={()=>setIsLeader(false)} className={`px-3 py-2 rounded-lg border ${!isLeader ? 'bg-black text-white border-black' : 'bg-white text-black dark:bg-neutral-950 dark:text-white border-neutral-300 dark:border-neutral-700'}`}>I am member</button>
            </div>
            {!isLeader && (
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Leader email</label>
                <input value={leaderEmail} onChange={(e)=>setLeaderEmail(e.target.value)} className={`w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-950 ${emailValid ? 'border-neutral-300 dark:border-neutral-700' : 'border-red-500'}`} placeholder="leader@college.edu" />
                {!emailValid && <p className="text-xs text-red-600 mt-1">Enter a valid email</p>}
              </div>
            )}
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Team size</label>
              <div className="flex items-center gap-2">
                <input type="range" min={teamRules.min} max={teamRules.max} value={size} onChange={(e)=>setSize(parseInt(e.target.value))} className="w-full" />
                <span className="w-10 text-right">{size}</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Min {teamRules.min}, Max {teamRules.max}</p>
            </div>
            <div className="flex justify-end">
              <button disabled={!canContinueStep1} onClick={()=>setStep(2)} className={`rounded-xl px-4 py-2 font-medium ${canContinueStep1 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-4">
              <div className="flex items-center justify-between text-sm">
                <span>{ticket.name} x {size}</span>
                <span>₹{(ticket.price * size).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Fees</span>
                <span>₹{fees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between font-semibold mt-3">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">Team rules: {teamRules.min}-{teamRules.max} members. Leader responsible for payment and invites.</div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={accept} onChange={(e)=>setAccept(e.target.checked)} />
              I accept the terms
            </label>
            <div className="flex justify-between">
              <button onClick={()=>setStep(1)} className="rounded-xl px-4 py-2 font-medium bg-white text-black border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">Back</button>
              <button onClick={()=>setStep(3)} disabled={!accept} className={`rounded-xl px-4 py-2 font-medium ${accept ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>Proceed to Payment</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-300">You will be redirected to payment. Amount payable:</div>
            <div className="text-3xl font-semibold">₹{total.toLocaleString()}</div>
            <div className="flex justify-between">
              <button onClick={()=>setStep(2)} className="rounded-xl px-4 py-2 font-medium bg-white text-black border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">Back</button>
              <button disabled={!canPay} onClick={()=> onConfirm({ teamName, isLeader, leaderEmail, size, ticket, total })} className={`rounded-xl px-4 py-2 font-medium ${canPay ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>Pay ₹{total.toLocaleString()}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
