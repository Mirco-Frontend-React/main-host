import { useState, lazy, Suspense } from 'react'
import './App.css'

const UserManagementApp = lazy(() => import('userManagement/App'));
const TariffApp = lazy(() => import('tariff/App'));

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Custom Main Host</h1>
      <div className="flex gap-4 mb-8">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setActiveTab('user')}
        >
          User Management
        </button>
        <button 
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={() => setActiveTab('tariff')}
        >
          Tariff
        </button>
      </div>

      <div className="border-t pt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Host Dashboard</h2>
                <p className="mb-6 text-gray-600">Welcome to the Host Application. Here are both micro-frontends running together:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">User Management Module</h3>
                    <UserManagementApp />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Tariff Module</h3>
                    <TariffApp />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'user' && <UserManagementApp />}
          {activeTab === 'tariff' && <TariffApp />}
        </Suspense>
      </div>
    </div>
  )
}

export default App
