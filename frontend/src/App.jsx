import { useState } from 'react'
import PatientDashboard from './pages/PatientDashboard'
import HospitalDashboard from './pages/HospitalDashboard'
import { Activity } from 'lucide-react'

function App() {
  const [view, setView] = useState('patient')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">RapidCare</span>
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setView('patient')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'patient'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setView('hospital')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'hospital'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Hospital
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {view === 'patient' ? <PatientDashboard /> : <HospitalDashboard />}
    </div>
  )
}

export default App
