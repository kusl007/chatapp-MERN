"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import MessageContainer from "../components/MessageContainer"

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setIsSidebarVisible(false)
  }

  const handleShowSidebar = () => {
    setIsSidebarVisible(true)
    setSelectedUser(null)
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="flex w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full md:w-84 py-4 ${isSidebarVisible ? "flex" : "hidden md:flex"} flex-col`}>
          <Sidebar onSelectUser={handleUserSelect} />
        </div>

        {/* Divider */}
        <div className={`w-px bg-white/20 ${isSidebarVisible && selectedUser ? "hidden md:block" : "hidden"}`}></div>

        {/* Message Container */}
        <div className={`flex-1 ${selectedUser ? "flex" : "hidden md:flex"} flex-col`}>
          <MessageContainer selectedUser={selectedUser} onBackUser={handleShowSidebar} />
        </div>
      </div>
    </div>
  )
}
