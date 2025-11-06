import { Calendar, MapPin, Users, Ticket } from 'lucide-react'

export default function LeftStickyColumn({ event, onRegister, onJoinTeam }) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start space-y-6">
      {/* Event Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{event.title}</h2>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Seats left</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">{event.seatsLeft}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Ticket price</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">₹{event.basePrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Team size</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1"><Users className="h-4 w-4" /> {event.team.min}-{event.team.max}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
        <div className="flex flex-col gap-3">
          <button onClick={onRegister} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white px-4 py-3 font-medium">
            <Ticket className="h-4 w-4" /> Register Now
          </button>
          <button onClick={onJoinTeam} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black border border-neutral-300 dark:border-neutral-700 px-4 py-3 font-medium dark:bg-neutral-950 dark:text-white">
            <Users className="h-4 w-4" /> Join Team
          </button>
        </div>
      </div>
    </aside>
  )
}
