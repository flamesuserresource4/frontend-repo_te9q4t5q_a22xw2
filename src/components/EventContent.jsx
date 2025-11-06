import { Clock, User2 } from 'lucide-react'

function TicketRow({ ticket, onRegister }) {
  const low = ticket.available <= 5
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="space-y-1">
        <div className="font-medium text-neutral-900 dark:text-neutral-100">{ticket.name}</div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          Min {ticket.min}/team • Max {ticket.max}/team • ₹{ticket.price} per person
        </div>
        <div className={`text-xs ${low ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'}`}>{low ? `Only ${ticket.available} left` : `${ticket.available} available`}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-neutral-900 dark:text-neutral-100 font-semibold">₹{ticket.price}</div>
        <button onClick={() => onRegister(ticket)} className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium">
          Register
        </button>
      </div>
    </div>
  )
}

export default function EventContent({ event, onRegister }) {
  return (
    <div className="space-y-6">
      {/* Header with Spline */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{event.title}</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">{event.tagline}</p>
        </div>
        <div className="h-64 sm:h-80">
          {/* eslint-disable-next-line */}
          <iframe title="spline" src="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" className="w-full h-full" />
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        <div className="text-neutral-900 dark:text-neutral-100 font-medium">About</div>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{event.description}</p>
      </div>

      {/* Speakers */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        <div className="text-neutral-900 dark:text-neutral-100 font-medium">Speakers</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {event.speakers.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <div className="text-neutral-900 dark:text-neutral-100 font-medium">{s.name}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">{s.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule preview */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        <div className="text-neutral-900 dark:text-neutral-100 font-medium">Schedule</div>
        <div className="space-y-3">
          {event.schedule.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Clock className="h-4 w-4 mt-1 text-neutral-500" />
              <div>
                <div className="text-neutral-900 dark:text-neutral-100 font-medium">{item.title}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-neutral-900 dark:text-neutral-100 font-medium">Tickets</div>
          <button onClick={() => onRegister(null)} className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium">Register Now</button>
        </div>
        <div className="space-y-3">
          {event.tickets.map((t) => (
            <TicketRow key={t.name} ticket={t} onRegister={onRegister} />
          ))}
        </div>
      </div>
    </div>
  )
}
