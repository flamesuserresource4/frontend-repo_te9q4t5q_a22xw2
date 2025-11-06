import { useMemo, useState } from 'react'
import LeftStickyColumn from './components/LeftStickyColumn'
import EventContent from './components/EventContent'
import RegisterModal from './components/RegisterModal'
import UnifiedPayment from './components/UnifiedPayment'

const mockEvent = {
  title: 'EventEye Hackathon 2025',
  tagline: 'Build campus tools that matter. 24 hours. Teams of 2-4.',
  date: 'Dec 6 – 7, 2025',
  location: 'Innovation Lab, Campus North',
  seatsLeft: 18,
  basePrice: 499,
  team: { min: 2, max: 4 },
  description:
    'A student-first hackathon focused on real problems around campus life: scheduling, clubs, housing, and more. Collaborate, learn from mentors, and ship something delightful.',
  speakers: [
    { name: 'Aisha Gupta', title: 'PM, Fintech', avatar: 'https://i.pravatar.cc/100?img=15' },
    { name: 'Rahul Mehta', title: 'CTO, StartupX', avatar: 'https://i.pravatar.cc/100?img=12' },
  ],
  schedule: [
    { title: 'Check-in & kickoff', time: 'Dec 6, 9:00 AM' },
    { title: 'Mentor hours', time: 'Dec 6, 1:00 PM' },
    { title: 'Submissions due', time: 'Dec 7, 9:00 AM' },
  ],
  tickets: [
    { name: 'Early Bird', price: 399, min: 2, max: 4, available: 3 },
    { name: 'Regular', price: 499, min: 2, max: 4, available: 42 },
  ],
}

function Layout({ children, left }) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">{left}</div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)

  const teamRules = useMemo(() => ({ min: mockEvent.team.min, max: mockEvent.team.max }), [])

  const handleRegister = (ticket) => {
    setSelectedTicket(ticket || mockEvent.tickets[0])
    setModalOpen(true)
  }

  const onConfirmRegistration = ({ size, ticket }) => {
    setPaymentAmount(ticket.price * size * 1.03) // price + approx fees
    setModalOpen(false)
    setShowPayment(true)
  }

  const onCreateOrder = async () => {
    // This demo mocks server order creation
    await new Promise((r) => setTimeout(r, 400))
    return { orderId: 'order_' + Math.random().toString(36).slice(2) }
  }

  const onVerify = async () => {
    await new Promise((r) => setTimeout(r, 300))
    return true
  }

  return (
    <Layout
      left={<LeftStickyColumn event={mockEvent} onRegister={() => handleRegister(null)} onJoinTeam={()=> alert('Join Team flow placeholder')} />}
    >
      <EventContent event={mockEvent} onRegister={handleRegister} />

      {modalOpen && (
        <RegisterModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          ticket={selectedTicket}
          teamRules={teamRules}
          onConfirm={onConfirmRegistration}
        />
      )}

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setShowPayment(false)} />
          <div className="relative w-full max-w-md">
            <UnifiedPayment
              amount={Math.round(paymentAmount)}
              eventName={mockEvent.title}
              onCreateOrder={onCreateOrder}
              onVerify={onVerify}
              onSuccess={() => {
                setShowPayment(false)
                alert('Payment successful! Redirecting to dashboard...')
              }}
              onError={(m) => alert(m)}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}
