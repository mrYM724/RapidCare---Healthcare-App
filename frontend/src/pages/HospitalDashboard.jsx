import { useState } from 'react'
import { Users, Bed, Ambulance, Clock, CheckCircle } from 'lucide-react'
import LiveMap from '../components/LiveMap'

const INITIAL_EMERGENCIES = [
  { id: 1, patient: 'Rajesh Kumar', severity: 'Critical', distance: '2.5 km', time: '2 mins ago', symptoms: 'Chest pain, Breathing difficulty', position: [51.51, -0.1] },
  { id: 2, patient: 'Sarah Ahmed', severity: 'High', distance: '4.1 km', time: '5 mins ago', symptoms: 'Bleeding, Unconscious', position: [51.49, -0.08] },
  { id: 3, patient: 'John Doe', severity: 'Medium', distance: '6.3 km', time: '12 mins ago', symptoms: 'Mild pain', position: [51.52, -0.07] },
]

export default function HospitalDashboard() {
  const [emergencies, setEmergencies] = useState(INITIAL_EMERGENCIES)
  const [accepted, setAccepted] = useState([])

  const handleAccept = (id) => {
    setAccepted([...accepted, id])
  }

  const severityBadge = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-emerald-100 text-emerald-800',
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Bed className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Available Beds</p>
            <p className="text-2xl font-bold text-slate-900">15 <span className="text-base text-slate-400 font-normal">/ 50</span></p>
          </div>
        </div>
        <div className="glass-panel p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending</p>
            <p className="text-2xl font-bold text-slate-900">{emergencies.length - accepted.length}</p>
          </div>
        </div>
        <div className="glass-panel p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Ambulance className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Dispatched</p>
            <p className="text-2xl font-bold text-slate-900">{accepted.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left – Emergency list */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-500" />
              Incoming Emergencies
            </h2>
            <div className="space-y-4">
              {emergencies.map((em) => (
                <div key={em.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${severityBadge[em.severity]}`}>
                      {em.severity}
                    </span>
                    <span className="text-xs text-slate-400">{em.time}</span>
                  </div>
                  <p className="font-semibold text-slate-900">{em.patient}</p>
                  <p className="text-sm text-slate-500 mb-1">{em.symptoms}</p>
                  <p className="text-xs text-slate-400 mb-3">{em.distance} away</p>

                  {accepted.includes(em.id) ? (
                    <div className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Accepted – Ambulance Dispatched
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAccept(em.id)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                      Accept Patient
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Map */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-4 h-[600px] flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">Live Map</h2>
            <div className="flex-1 rounded-xl overflow-hidden">
              <LiveMap
                center={[51.505, -0.09]}
                zoom={13}
                markers={emergencies.map((em) => ({
                  position: em.position,
                  label: `${em.patient} – ${em.severity}`,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
