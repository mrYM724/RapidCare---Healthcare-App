$ErrorActionPreference = "Stop"

Write-Host "Creating backend directory..."
New-Item -ItemType Directory -Force -Path "backend"

Write-Host "Setting up Python virtual environment..."
python -m venv backend\venv
$env:Path = "$PWD\backend\venv\Scripts;" + $env:Path

Write-Host "Creating requirements.txt..."
Set-Content -Path "backend\requirements.txt" -Value @"
fastapi
uvicorn
supabase
pydantic
scikit-learn
pandas
python-dotenv
pyjwt
cors
"@

Write-Host "Installing backend dependencies..."
pip install -r backend\requirements.txt

Write-Host "Setting up frontend directory with Vite..."
# We use npm init to bypass prompts or just use npx create-vite with -y
npx -y create-vite@latest frontend --template react

Write-Host "Installing frontend dependencies..."
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom lucide-react leaflet react-leaflet @supabase/supabase-js axios clsx tailwind-merge
npx tailwindcss init -p

cd ..
Write-Host "Setup complete!"
