import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-shadow-md">
          Wolfe's Word Book
        </h1>
        <p className="text-gray-600 mb-8 text-shadow-sm">
          Built with React + Vite + Tailwind CSS v4.1
        </p>
        
        <div className="space-y-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-shadow-sm"
          >
            Count: {count}
          </button>
          
          {/* Showcase v4.1 features */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
            <h2 className="text-xl font-bold text-shadow-lg text-shadow-purple-900">
              ✨ Tailwind v4.1 Features
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-shadow-md text-shadow-purple-800/50">📝 Text shadows (finally!)</p>
              <p className="text-shadow-sm">🎭 CSS masking utilities</p>
              <p className="drop-shadow-lg drop-shadow-purple-800">🎨 Colored drop shadows</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 space-y-1">
            <p>✅ Tailwind CSS v4.1 configured</p>
            <p>✅ First-party Vite plugin</p>
            <p>✅ Zero configuration setup</p>
            <p>✅ Node.js v24.3.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App