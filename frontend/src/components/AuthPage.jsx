

// import Link from "next/link"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-purple-300">Chatters</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">Connect, Chat, and Share with Friends</p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block py-3 px-8 bg-transparent border-2 border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
