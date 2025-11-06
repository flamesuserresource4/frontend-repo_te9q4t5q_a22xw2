export default function TicketCard({ title, description, price, min, max, available, onRegister }) {
  const low = available <= 5
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-neutral-900 dark:text-neutral-100 font-medium">{title}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">{description}</div>
          <div className="text-xs text-neutral-500 mt-1">Min {min}/team • Max {max}/team</div>
          <div className={`text-xs mt-1 ${low ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'}`}>{low ? `Only ${available} left` : `${available} available`}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">₹{price}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={onRegister} className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium">Register</button>
      </div>
    </div>
  )
}
