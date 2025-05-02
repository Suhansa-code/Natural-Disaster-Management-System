import React, { useState , useEffect, useRef} from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  AlertTriangle,
  Clock,
  LayoutGrid,
  LayoutList,
  Bell,
  Calendar,
  Users,
  Shield,
  Wind,
  Droplets,
  Flame,
  Plus,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const SIDE_MENU_ITEMS = [
  { icon: Bell, label: "Notifications", count: 5 },
  { icon: Calendar, label: "Upcoming Events", count: 3 },
  { icon: Users, label: "Emergency Contacts", count: 8 },
  { icon: Shield, label: "Safety Guidelines", count: null },
];

const DISASTER_TYPES = [
  { icon: Wind, label: "Hurricanes", active: true },
  { icon: Droplets, label: "Floods", active: true },
  { icon: Flame, label: "Wildfires", active: false },
];

const formatDate = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const timeDiff = now - postDate;
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor(timeDiff / (1000 * 3600));
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (days === 0) {
    if (hours < 1) return `${minutes}m`;
    return `${hours}h`;
  }
  if (days === 1) return "1d";
  return `${days}d`;
};

const SidebarMenu = ({ items, title }) => (
  <div className="glassmorphism rounded-xl p-4">
    <h2 className="font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-2">
      {items.map((item, index) => (
        <button
          key={index}
          className="interactive-button w-full flex items-center justify-between p-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <item.icon className="h-5 w-5 text-primary-600" />
            <span className="text-gray-700">{item.label}</span>
          </div>
          {item.count !== null && (
            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-xs">
              {item.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

const DisasterTypes = ({ items }) => (
  <div className="glassmorphism rounded-xl p-4">
    <h2 className="font-semibold text-gray-900 mb-4">Disaster Types</h2>
    <div className="space-y-2">
      {items.map((item, index) => (
        <button
          key={index}
          className={`interactive-button w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
            item.active
              ? "bg-primary-100 text-primary-700"
              : "hover:bg-primary-50 text-gray-600"
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);


const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const currentUserId = "user1"; // Example, update accordingly

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      // Sort posts by createdAt in descending order (newest first)
      const sortedData = (data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sortedData);
    } catch (error) {
      toast.error("Error fetching posts: " + error.message);
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFocusSearch) {
      searchInputRef.current?.focus();
      setShouldFocusSearch(false);
    }

    fetchPosts();
  }, [shouldFocusSearch]);

  const filteredPosts = posts.filter((post) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.location.toLowerCase().includes(searchTerm)
    );
  });
  
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }
  
      const updatedPost = await response.json();
  
      // Update local state with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };
  
  

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;
  
    const newComment = {
      user: "CurrentUser", // Replace with actual logged-in user
      text,
      createdAt: new Date().toISOString(),
    };
  
    // Optimistically update UI
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    try {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "CurrentUser", // Replace with actual logged-in user
          text,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
  
      const updatedPost = await response.json();
      
      // Optionally, update the state with the new comment data from the backend (if needed)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: updatedPost.comments } : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
      // Optionally handle the error (e.g., revert the optimistic update)
    }
  };

  const PostCard = ({ post, handleAddComment }) => (
    <div className=" rounded-xl shadow-md bg-white overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex flex-col justify-start text-left">
            <p className="font-semibold text-gray-900">{post.location}</p>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm ${
            post.isUpcoming
            ? "bg-blue-100 text-blue-800"  
              : "bg-red-100/80 text-red-800"
          } ${post.isUpcoming ? "pulse-animation" : ""}`}
        >
          {post.isUpcoming ? "Upcoming" : "Ongoing"}
        </div>
        <div className="p-4">
        <div
className={`px-3 py-1 rounded-full text-sm ${
  post.category === "Floods"
    ? "bg-blue-100 text-blue-800"
    : post.category === "Earthquakes"
    ? "bg-yellow-100 text-yellow-800"
    : post.category === "Landslides"
    ? "bg-green-100 text-green-800"
    : post.category === "Tornadoes"
    ? "bg-orange-100 text-orange-800"
    : post.category === "Wildfires"
    ? "bg-red-100 text-red-800"
    : post.category === "Hurricanes"
    ? "bg-indigo-100 text-indigo-800"
    : post.category === "Tsunami"
    ? "bg-cyan-100 text-cyan-800"
    : "bg-gray-100 text-gray-800"
}`}
>
          {post.category}
        </div>
      </div>
      </div>
      

      {/* Image */}
      <div className="relative group px-5">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full aspect-[8/5] rounded-md shadow-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.isUpcoming && post.disasterDate && (
          <div className="absolute bottom-4 left-8 px-4 py-2 rounded-lg flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-md">
            <Clock className="h-4 w-4 text-primary-600" />
            <span className="text-gray-900 text-sm font-medium">
              Expected: {new Date(post.disasterDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleLike(post._id)}
            className={`interactive-button flex items-center space-x-1 transition-all duration-300 rounded-lg px-3 py-1 ${
              post.likes.includes(currentUserId)
                ? "bg-red-100 text-red-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-[14px]">{post.likes.length}</span>
          </button>
          <button
            onClick={() => toggleComments(post._id)}
            className="interactive-button flex items-center space-x-1 text-gray-600 hover:bg-gray-100 transition-all duration-300 rounded-lg px-3 py-1"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-[14px]">{post.comments.length}</span>
          </button>
          <button className="interactive-button flex items-center space-x-1 text-gray-600 hover:bg-gray-100 transition-all duration-300 rounded-lg px-3 py-1 ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 text-left">
          <h2 className="font-semibold text-gray-900 text-[16px]">
            {post.title}
          </h2>
          <p className="mt-1 text-gray-600 text-[14px]">{post.description}</p>
        </div>

        <hr className="border-t border-gray-200 my-4" />

        {/* Comments */}
        {showComments[post._id] && (
  <div className="mt-4 space-y-3">
    {post.comments.map((comment, index) => (
      <div
        key={index}
        className="flex space-x-2 text-left items-center bg-white rounded-[10px] shadow-sm"
      >
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 glass-card rounded-2xl p-3">
          <p className="font-medium text-sm text-gray-900">
            {comment.user}
          </p>
          <p className="text-sm text-gray-600">{comment.text}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </div>
    ))}

    {/* Comment input section */}
    <div className="flex relative items-center space-x-2 mt-3">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-full border-[1px] text-[14px] border-green-200 focus:border-green-400 h-[38px] focus:outline-none focus:ring-0 focus:ring-green-200"
        placeholder="Add a comment..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            handleAddComment(post._id, e.target.value);
            e.target.value = "";
          }
        }}
        id={`comment-input-${post._id}`} // Unique ID for targeting
      />
      <button
        type="button"
        onClick={() => {
          const input = document.getElementById(`comment-input-${post._id}`);
          if (input && input.value.trim()) {
           
            handleAddComment(post._id, input.value);
            input.value = ""; // Clear input after adding the comment
          }
        }}
        className="p-2 absolute right-2 rounded-full bg-green-600 hover:bg-green-700 transition text-white"
      >
        <Send className="w-3 h-3" />
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-texture px-4 sm:px-6 lg:px-6 pt-0 ">
      <div className=" mx-auto ">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full z-50 bg-texture bg-white py-4">
          <div className="flex justify-between items-center px-4">
            <div className="flex flex-col justify-start text-left">
              <h1 className="text-2xl font-semibold text-gray-700">
                Disaster Community
              </h1>
              <p className="text-sm text-gray-400 mt-0">
                Stay informed with the Community updates
              </p>
            </div>
            <div className="flex items-center space-x-2 glassmorphism rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`interactive-button p-2 rounded-md transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-green-100 text-green-500"
                    : "text-gray-600 hover:bg-primary-50"
                }`}
              >
                <LayoutList className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`interactive-button p-2 rounded-md transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-green-100 text-green-500"
                    : "text-gray-600 hover:bg-primary-50"
                }`}
              >
                <LayoutGrid className="h-5 w-5" />

              </button>
              

            </div>
          </div>
        </div>

        <div className="flex gap-8   ">
          {/* Left Sidebar - Sticky */}
          <div className="hidden lg:block lg:fixed top-4 flex-shrink-0 h-screen w-[300px]">
            <div className="sticky top-28 space-y-6">
              <SidebarMenu items={SIDE_MENU_ITEMS} title="Quick Access" />
              <DisasterTypes items={DISASTER_TYPES} />
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 pt-[80px] ml-[260px] mr-[260px]  ${viewMode === "list" ? "space-y-8" : "grid grid-cols-1 md:grid-cols-2 gap-8"}`}
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* Right Sidebar - Sticky, Hidden in Grid View */}
          <div
            className={`hidden pt-[90px] ${viewMode === "list" ? "xl:block fixed right-0 " : ""} w-80 flex-shrink-0`}
          >
            <div className="sticky top-28 space-y-6">
              <div className="glass-card rounded-xl p-4">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Emergency Contacts
                </h2>
                <div className="space-y-3">
                  <button className="interactive-button w-full flex items-center space-x-3 p-2 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-semibold">911</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Emergency Services
                      </p>
                      <p className="text-sm text-gray-600">
                        For immediate assistance
                      </p>
                    </div>
                  </button>
                  <button className="interactive-button w-full flex items-center space-x-3 p-2 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Local Police</p>
                      <p className="text-sm text-gray-600">
                        Non-emergency: 555-0123
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Weather Updates
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <span className="text-gray-600">Temperature</span>
                    <span className="font-medium text-gray-900">72°F</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <span className="text-gray-600">Wind Speed</span>
                    <span className="font-medium text-gray-900">15 mph</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <span className="text-gray-600">Precipitation</span>
                    <span className="font-medium text-gray-900">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
