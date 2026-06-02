import React, { useState } from "react";
import { toast } from "sonner";
import { LogOut, BookOpen, Map, TrendingUp, ListTodo, MessageSquare, Target, BrainCircuit, Send } from "lucide-react";
import Roadmaps from './Roadmaps';
import SmartTasks from './SmartTasks';
import Analytics from './Analytics';
import AiAdvisor from './AiAdvisor';
import Resources from './Resources';

export default function Dashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Hi there! I am your AI learning assistant. How can I guide you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user?.id },
        body: JSON.stringify({ message: userMessage, previousMessages: chatMessages })
      });
      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        throw new Error("Chat failed.");
      }
    } catch(err) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'model', content: "It seems I'm offline right now, but stay focused and keep up the great work!" }]);
      }, 1000);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 bg-slate-50 text-slate-900 font-sans">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-3xl shadow-sm border border-slate-200 px-8 py-5 gap-4">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Learning Planner</h1>
            <div className="text-sm text-slate-500 flex gap-4 mt-1 font-medium">
              <span>{user.name}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span> Online</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg">Level 4</span>
            </div>
          </div>
        </div>
        <button onClick={onLogout} className="px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 font-bold rounded-xl transition-colors flex items-center gap-2 text-sm shadow-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      {/* DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-2.5 bg-white rounded-3xl shadow-sm border border-slate-200 p-5 shrink-0 self-start sticky top-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
          >
            <TrendingUp className="w-5 h-5 shrink-0" /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('roadmaps')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'roadmaps' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
          >
            <Map className="w-5 h-5 shrink-0" /> Roadmaps
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'tasks' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
          >
            <ListTodo className="w-5 h-5 shrink-0" /> Tasks
          </button>
          <button 
            onClick={() => setActiveTab('advisor')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'advisor' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
          >
            <Target className="w-5 h-5 shrink-0" /> Career Advisor
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'resources' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
          >
            <BookOpen className="w-5 h-5 shrink-0" /> Resources
          </button>
          
          <div className="my-2 border-b border-slate-100"></div>

          <button 
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-3.5 rounded-xl font-bold text-left transition-colors flex items-center gap-3 ${activeTab === 'assistant' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
          >
            <BrainCircuit className="w-5 h-5 shrink-0" /> AI Assistant
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9 xl:col-span-10">
          
          {activeTab === 'overview' && <Analytics />}
          {activeTab === 'roadmaps' && <Roadmaps />}
          {activeTab === 'tasks' && <SmartTasks />}
          {activeTab === 'advisor' && <AiAdvisor />}
          {activeTab === 'resources' && <Resources />}

          {activeTab === 'assistant' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-[calc(100vh-130px)]">
               <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden relative">
                 
                 {/* Chat Header */}
                 <div className="px-8 py-5 border-b border-slate-100 bg-white flex items-center gap-4 shrink-0">
                   <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                     <BrainCircuit className="w-6 h-6 text-white" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800 text-lg">AI Learning Guide</h3>
                     <p className="text-sm font-semibold text-slate-400">Your personal tutor</p>
                   </div>
                 </div>

                 {/* Chat Messages */}
                 <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-slate-50/50">
                   {chatMessages.map((msg, idx) => (
                     <div key={idx} className={`flex max-w-[80%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
                       {msg.role === 'model' && (
                         <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mr-4 mt-auto mb-2 shadow-sm">
                           <BrainCircuit className="w-5 h-5 text-white" />
                         </div>
                       )}
                       <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'}`}>
                         {msg.content}
                       </div>
                     </div>
                   ))}
                   {chatLoading && (
                     <div className="flex max-w-[80%] self-start">
                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mr-4 mt-auto mb-2 shadow-sm">
                         <BrainCircuit className="w-5 h-5 text-white animate-pulse" />
                       </div>
                       <div className="p-4 rounded-2xl text-sm font-medium bg-white border border-slate-200 text-slate-400 rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                         <span className="animate-bounce inline-block w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                         <span className="animate-bounce inline-block w-1.5 h-1.5 bg-slate-300 rounded-full" style={{animationDelay:'0.2s'}}></span>
                         <span className="animate-bounce inline-block w-1.5 h-1.5 bg-slate-300 rounded-full" style={{animationDelay:'0.4s'}}></span>
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Chat Input */}
                 <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                   <form onSubmit={handleSendMessage} className="relative flex items-center shadow-sm rounded-xl">
                     <input 
                       type="text" 
                       value={chatInput}
                       onChange={e => setChatInput(e.target.value)}
                       placeholder="Ask me anything..."
                       className="w-full bg-slate-50 border border-slate-200 py-4 pl-6 pr-14 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-400"
                     />
                     <button type="submit" disabled={chatLoading} className="absolute right-2 p-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50">
                       <Send className="w-4 h-4" />
                     </button>
                   </form>
                 </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
