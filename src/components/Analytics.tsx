import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Flame, Target, Clock, ArrowUpRight } from 'lucide-react';

const studyHoursData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3.5 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2.5 },
  { name: 'Sat', hours: 5 },
  { name: 'Sun', hours: 3 },
];

const subjectPerformanceData = [
  { name: 'React', score: 85 },
  { name: 'Node.js', score: 70 },
  { name: 'DSA', score: 60 },
  { name: 'Systems', score: 40 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
          <div>
            <div className="text-sm font-bold text-slate-400 mb-1">Learning Streak</div>
            <div className="text-3xl font-bold text-slate-800">12<span className="text-lg text-slate-500 ml-1">Days</span></div>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
          <div>
            <div className="text-sm font-bold text-slate-400 mb-1">Study Hours</div>
            <div className="text-3xl font-bold text-slate-800 text-blue-600">21.5<span className="text-lg text-blue-400 ml-1">h</span></div>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
          <div>
            <div className="text-sm font-bold text-slate-400 mb-1">Goal Completion</div>
            <div className="text-3xl font-bold text-slate-800">68<span className="text-lg text-slate-500 ml-1">%</span></div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
           <div className="flex items-center gap-2 mb-2">
             <Activity className="w-5 h-5 text-purple-500" />
             <span className="text-sm font-bold text-slate-400">Weekly Report</span>
           </div>
           <div className="flex items-end gap-2">
             <span className="text-lg font-bold text-slate-800">Highly Productive</span>
             <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded"><ArrowUpRight className="w-3 h-3" /> 12%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-80">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400"/> Study Hours</span>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-md text-slate-500">Past 7 Days</span>
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyHoursData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
              <Tooltip cursor={{fill: '#f0f9ff'}} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-80 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-400"/> Subject Performance Accuracy
          </h3>
          <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 20 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} dx={-10} />
                   <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                   <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24} background={{ fill: '#f1f5f9', radius: [0,6,6,0] }}>
                     {subjectPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
