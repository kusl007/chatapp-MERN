import { useEffect, useState } from "react";
import { Search, ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext"; // ✅ Make sure it's correctly set up
import axiosInstance from "../api/axiosInstance";

export default function Sidebar({ onSelectUser }) {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const { socket, onlineUser } = useSocketContext()|| {};

  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState(null);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/user/currentchatters");
        if (res.data?.success === false) {
          console.error(res.data.message);
        } else {
          setChatUser(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatUsers();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/search?search=${searchInput}`);
      setSearchUser(res.data);
      if (res.data.length === 0) toast.info("User Not Found");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    onSelectUser(user);
    setSelectedUserId(user._id);
    setNewMessageUsers(null);
  };

  const handleSearchBack = () => {
    setSearchUser([]);
    setSearchInput("");
  };

  const handleLogOut = async () => {
    const confirmLogout = window.prompt("Type your username to logout", authUser.user.username);
    if (confirmLogout === authUser?.user?.username) {
      setLoading(true);
      try {
        const res = await axiosInstance.post(`/auth/logout`);
        toast.info(res.data?.message || "Logged out");
        localStorage.removeItem("chatapp");
        setAuthUser(null);
        navigate("/login");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info("Logout Cancelled");
    }
  };

  const isUserOnline = (userId) => onlineUser?.includes(userId);

  const renderUserList = (users) => {
    if (!Array.isArray(users)) return null;

    return (
      <div className="flex-1 overflow-y-auto space-y-2">
        {users.map((user) => (
          <div key={user._id}>
            <div
              onClick={() => handleUserClick(user)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                selectedUserId === user._id ? "bg-purple-600/50" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
                {isUserOnline(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{user.username}</p>
              </div>

              {newMessageUsers &&
                newMessageUsers.reciverId === authUser._id &&
                newMessageUsers.senderId === user._id && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full px-2 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-white/20 rounded-full border border-white/30"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-300 rounded-full"
            placeholder="Search users..."
          />
          <button
            type="submit"
            className="p-2 m-1 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search size={16} />
            )}
          </button>
        </form>

        <Link to={`/profile`}>
          <img
            src={authUser?.user?.avatar || "/placeholder.svg"}
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white/30 hover:border-purple-400 cursor-pointer hover:scale-110"
          />
        </Link>
      </div>

      <div className="h-px bg-white/20 mb-4"></div>

      {/* Users list */}
      {searchUser.length > 0 ? (
        <>
          {renderUserList(searchUser)}
          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={handleSearchBack}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </>
      ) : (
        <>
          {chatUser.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-xl font-bold text-yellow-400 mb-2">Why are you alone?</h2>
              <p className="text-gray-300">Search for users to start chatting!</p>
            </div>
          ) : (
            renderUserList(chatUser)
          )}

          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg text-red-300 hover:text-white w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
