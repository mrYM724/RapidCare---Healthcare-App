import { useState } from 'react'
import { AlertCircle, HeartPulse, Stethoscope, MapPin, Thermometer, Zap } from 'lucide-react'
import axios from 'axios'
import LiveMap from '../components/LiveMap'

const SYMPTOM_OPTIONS = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild pain' },
  { value: 2, label: 'Bleeding' },
  { value: 3, label: 'Unconscious' },
  { value: 4, label: 'Chest pain' },
  { value: 5, label: 'Breathing difficulty' },
]

export default function PatientDashboard() {
  const [symptoms, setSymptoms] = useState({
    age: 30,
    symptom_1: 0,
    symptom_2: 0,
    heart_rate: 80,
    blood_pressure_sys: 120,
  })

  const [severity, setSeverity] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hospitals, setHospitals] = useState(null)

  const handleTriage = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/predict-severity', symptoms)
      setSeverity(res.data.severity)

      const hospRes = await axios.get('http://127.0.0.1:8000/api/discover-hospitals', {
        params: { lat: 51.505, lng: -0.09 },
      })
      setHospitals(hospRes.data.hospitals)
    } catch (err) {
      console.error(err)
      alert('Error connecting to backend. Is it running on port 8000?')
    }
    setLoading(false)
  }

  const severityColor = {
    Critical: 'from-red-500 to-rose-600',
    High: 'from-orange-500 to-amber-600',
    Medium: 'from-yellow-400 to-amber-500',
    Low: 'from-emerald-400 to-green-500',
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column – form + results */}
        <div className="space-y-6">
          {/* Emergency Form */}
          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              Report Emergency
            </h2>

            <form onSubmit={handleTriage} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={symptoms.age}
                    onChange={(e) => setSymptoms({ ...symptoms, age: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={symptoms.heart_rate}
                    onChange={(e) => setSymptoms({ ...symptoms, heart_rate: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Systolic Blood Pressure</label>
                <input
                  type="number"
                  value={symptoms.blood_pressure_sys}
                  onChange={(e) => setSymptoms({ ...symptoms, blood_pressure_sys: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Symptom</label>
                  <select
                    value={symptoms.symptom_1}
                    onChange={(e) => setSymptoms({ ...symptoms, symptom_1: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {SYMPTOM_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Symptom</label>
                  <select
                    value={symptoms.symptom_2}
                    onChange={(e) => setSymptoms({ ...symptoms, symptom_2: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {SYMPTOM_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {loading ? 'Evaluating...' : 'Evaluate Severity & Request Help'}
              </button>
            </form>
          </div>

          {/* Severity result */}
          {severity && (
            <div className={`p-6 rounded-2xl bg-gradient-to-r ${severityColor[severity] || severityColor.Low} text-white shadow-lg`}>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                AI Triage: {severity}
              </h3>
              <p className="text-white/80 text-sm">Emergency request created. Nearby hospitals have been notified.</p>
            </div>
          )}

          {/* Nearby hospitals */}
          {hospitals && (
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-500" />
                Nearby Hospitals
              </h3>
              <div className="space-y-3">
                {hospitals.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-slate-900">{h.name}</p>
                      <p className="text-sm text-slate-500">{h.distance_km} km away</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {h.available_beds} beds
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column – map */}
        <div className="glass-panel p-4 h-[700px] flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 mb-4 px-2 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-sky-500" />
            Live Map
          </h2>
          <div className="flex-1 rounded-xl overflow-hidden">
            <LiveMap
              center={[51.505, -0.09]}
              zoom={13}
              markers={[{ position: [51.505, -0.09], label: 'Your Location' }]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
