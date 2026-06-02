import React, { useState } from 'react';
import { Calendar as CalendarIcon, AlertCircle, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';

const initialTasks = [
  { id: 1, text: "Finish OS assignment", date: "2026-10-25", priority: "High", completed: false },
  { id: 2, text: "Watch React hook video", date: "2026-10-26", priority: "Medium", completed: false },
  { id: 3, text: "Review notes from yesterday", date: "2026-10-24", priority: "Low", completed: true },
];

export default function SmartTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, date: date || new Date().toISOString().split('T')[0], priority, completed: false }]);
    setNewTask("");
    toast.success("Task created");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task deleted");
  };

  const PriorityBadge = ({ level }: { level: string }) => {
    const colors = {
      "High": "bg-red-50 text-red-600 border-red-200",
      "Medium": "bg-amber-50 text-amber-600 border-amber-200",
      "Low": "bg-emerald-50 text-emerald-600 border-emerald-200"
    };
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${colors[level as keyof typeof colors]}`}>{level}</span>;
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-full">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col h-full min-h-[60vh]">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-blue-600" /> Smart Task Management
        </h2>

        <form onSubmit={addTask} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row gap-3 mb-8 shadow-inner">
          <input 
            type="text" 
            placeholder="What needs to be done?"
            className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none placeholder:text-slate-400 shadow-sm"
            value={newTask} onChange={e => setNewTask(e.target.value)}
          />
          <div className="flex gap-2">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
               <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
               <input 
                 type="date"
                 className="bg-transparent pl-9 pr-3 py-3 text-sm font-medium text-slate-600 outline-none w-full min-w-[140px]"
                 value={date} onChange={e => setDate(e.target.value)}
               />
            </div>
            <select 
              value={priority} onChange={e => setPriority(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-700 outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            >
              <option value="High"> High</option>
              <option value="Medium"> Medium</option>
              <option value="Low"> Low</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 shrink-0 transition-colors">
            <Plus className="w-5 h-5 mx-auto" />
          </button>
        </form>

        <div className="flex flex-col gap-6">
          {Object.entries(
            [...tasks]
              .sort((a, b) => {
                if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
              })
              .reduce((acc, task) => {
                const dateKey = task.date || new Date().toISOString().split('T')[0];
                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(task);
                return acc;
              }, {} as Record<string, typeof tasks>)
          ).map(([dateObj, dayTasks]) => {
            const dateStr = dateObj;
            let displayDate = dateStr;
            const today = new Date().toISOString().split('T')[0];
            const t = new Date(); t.setDate(t.getDate() + 1); const tomorrow = t.toISOString().split('T')[0];
            const y = new Date(); y.setDate(y.getDate() - 1); const yesterday = y.toISOString().split('T')[0];
            
            if (dateStr === today) displayDate = "Today";
            else if (dateStr === tomorrow) displayDate = "Tomorrow";
            else if (dateStr === yesterday) displayDate = "Yesterday";
            else {
              const d = new Date(dateStr);
              displayDate = isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
            }

            return (
              <div key={dateStr} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-slate-800">{displayDate}</h3>
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}</span>
                </div>
                {dayTasks.map(task => (
                  <div key={task.id} className={`group border rounded-xl p-4 flex items-center justify-between transition-all ${task.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}>
                    <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                      <button className="shrink-0 transition-transform active:scale-95 text-slate-300 group-hover:text-blue-400">
                        {task.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
                      </button>
                      <div className="flex flex-col">
                        <span className={`font-bold text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{task.text}</span>
                        <div className="flex items-center gap-3 mt-1.5 transition-opacity">
                          <PriorityBadge level={task.priority} />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} 
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2.5 bg-slate-100 rounded-lg hover:bg-red-50"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
          {tasks.length === 0 && (
            <div className="text-center text-slate-400 py-12 font-medium bg-slate-50 border border-slate-200 border-dashed rounded-xl">All caught up! No tasks left.</div>
          )}
        </div>
      </div>
    </div>
  );
}
