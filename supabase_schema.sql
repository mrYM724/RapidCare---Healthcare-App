-- Supabase Schema for RapidCare

-- Create users table (extends Supabase Auth users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('patient', 'hospital', 'ambulance')),
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create hospitals table (additional info for hospital users)
CREATE TABLE public.hospitals (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  total_beds INTEGER NOT NULL,
  available_beds INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create ambulances table (additional info for ambulance users)
CREATE TABLE public.ambulances (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  vehicle_number TEXT NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'dispatched', 'maintenance')) DEFAULT 'available',
  current_emergency_id UUID
);

-- Create emergencies table
CREATE TABLE public.emergencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  symptoms TEXT NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  predicted_severity TEXT NOT NULL CHECK (predicted_severity IN ('Low', 'Medium', 'High', 'Critical')),
  status TEXT NOT NULL CHECK (status IN ('requested', 'accepted', 'dispatched', 'resolved')) DEFAULT 'requested',
  assigned_hospital_id UUID REFERENCES public.hospitals(id),
  assigned_ambulance_id UUID REFERENCES public.ambulances(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) policies would go here for a production app
-- For development, we'll keep them simple or disabled if preferred
