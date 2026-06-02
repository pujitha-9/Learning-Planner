import React, { useState } from "react";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));

    try {
      if (email && password && (isLogin || name)) {
        // Fallback for missing MONGODB_URI
        onLogin({ id: "user_001", name: isLogin ? "Alex" : name, email });
        toast.success(isLogin ? "Welcome back!" : "Account created successfully.");
      } else {
        toast.error("Please fill in all required fields.");
      }
    } catch (err) {
      toast.error("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-4 bg-slate-50">
      
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-2">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Learning Planner</h1>
        <p className="text-slate-500 font-medium">Your Smart Learning Planner</p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 w-full max-w-md flex flex-col gap-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100"
      >
        <div className="flex p-1 bg-slate-100 rounded-lg mb-2">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${isLogin ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${!isLogin ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        {!isLogin && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input 
              type="text" 
              className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input 
            type="email" 
            className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input 
            type="password" 
            className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md shadow-blue-200 hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : (isLogin ? 'Sign In to Learning Planner' : 'Create Account')}
          {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
