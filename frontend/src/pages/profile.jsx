

import {Link} from "react-router-dom"
import { ArrowLeft, User, Mail, Calendar } from "lucide-react"
import { useAuth } from "../context/AuthContext";


// Mock user data
const mockUser = {
  _id: "1",
  username: "john_doe",
  fullname: "John Doe",
  email: "john.doe@example.com",
  profilepic: "/placeholder.svg?height=120&width=120",
  createdAt: "2024-01-15T10:30:00Z",
}

export default function Profile() {
  const { authUser } = useAuth();
  const user = authUser?.user; 

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen min-w-1/2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white/30"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <User size={20} className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Full Name</p>
                <p className="text-white font-semibold">{user.fullname }</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <User size={20} className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Username</p>
                <p className="text-white font-semibold">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <Mail size={20} className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Email</p>
                <p className="text-white font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <Calendar size={20} className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Member Since</p>
                <p className="text-white font-semibold">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="mt-8 space-y-3">
            <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
              Edit Profile
            </button>
            <button className="w-full py-3 px-4 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white font-semibold rounded-lg transition-colors">
              Delete Account
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
