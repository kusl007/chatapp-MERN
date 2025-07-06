import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from '../api/axiosInstance'; 


const mockMessages = [
  {
    _id: "1",
    message: "Hey there! How are you doing?",
    senderId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    message: "I'm doing great! Thanks for asking. How about you?",
    senderId: "1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    message: "That's awesome to hear! I'm doing well too.",
    senderId: "2",
    createdAt: new Date().toISOString(),
  },
];

export default function MessageContainer({ selectedUser, onBackUser }) {
  const [messages, setMessages] = useState(mockMessages);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");
  const lastMessageRef = useRef(null);
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  useEffect(()=>{console.log(authUser)},[])

  const handleMessages = (e) => {
    setSendData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sendData.trim()) return;

    setSending(true);

    // Create new message
    const newMessage = {
      _id: Date.now().toString(),
      message: sendData,
      senderId: authUser?.user?._id,
      createdAt: new Date().toISOString(),
    };

    // Simulate API call
    setTimeout(() => {
      setMessages((prev) => [...prev, newMessage]);
      setSendData("");
      setSending(false);
    }, 500);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US"),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
  };

  return (
    <div className="h-full flex flex-col">
      {!selectedUser ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageCircle size={64} className="text-purple-400 mx-auto mb-4" />
            <p className="text-2xl text-white font-semibold mb-2">
              Welcome! 👋 {authUser?.user?.username} 😉
            </p>
            <p className="text-lg text-gray-300">
              Select a chat to start messaging
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className="flex items-center gap-4 p-4 bg-white/10 border-b border-white/20">
            <button
              onClick={onBackUser}
              className="md:hidden p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <img
              src={selectedUser.profilepic || "/placeholder.svg"}
              alt={selectedUser.username}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {selectedUser.username}
              </h3>
              <p className="text-sm text-gray-300">
                {selectedUser.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-300 text-center">
                  Send a message to start the conversation
                </p>
              </div>
            ) : (
              messages.map((message) => {
                const { date, time } = formatTime(message.createdAt);
                const isOwn = message.senderId === authUser?.user?._id;

                return (
                  <div
                    key={message._id}
                    ref={lastMessageRef}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        isOwn
                          ? "bg-purple-600 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {date} {time}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/20">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={sendData}
                onChange={handleMessages}
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={sending || !sendData.trim()}
                className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
