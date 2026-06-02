import React, { useState } from 'react';
import { Map, CheckCircle, Circle } from 'lucide-react';

const roadmapData = {
  "Java": [
    { id: 1, title: "Basic Syntax & Datatypes", completed: true },
    { id: 2, title: "Object Oriented Programming (OOP)", completed: false },
    { id: 3, title: "Collections Framework", completed: false },
    { id: 4, title: "Multithreading & Concurrency", completed: false },
    { id: 5, title: "JVM Internals", completed: false },
  ],
  "Python": [
    { id: 1, title: "Basics & Data Structures", completed: true },
    { id: 2, title: "Functions & Modules", completed: true },
    { id: 3, title: "Object Oriented Python", completed: false },
    { id: 4, title: "Web Scraping & APIs", completed: false },
  ],
  "DSA": [
    { id: 1, title: "Arrays & Strings", completed: true },
    { id: 2, title: "Linked Lists", completed: true },
    { id: 3, title: "Trees & Graphs", completed: false },
    { id: 4, title: "Dynamic Programming", completed: false }
  ],
  "Web Development": [
    { id: 1, title: "HTML, CSS, JS Basics", completed: true },
    { id: 2, title: "React & Frontend Frameworks", completed: true },
    { id: 3, title: "Node.js & Backend Backend APIs", completed: false },
    { id: 4, title: "Databases & Auth", completed: false }
  ],
  "Data Science": [
    { id: 1, title: "Python & SQL", completed: false },
    { id: 2, title: "Pandas & Numpy", completed: false },
    { id: 3, title: "Machine Learning Basics", completed: false },
  ],
  "Cloud Computing": [
    { id: 1, title: "Networking Basics", completed: false },
    { id: 2, title: "AWS Core Services", completed: false },
    { id: 3, title: "Docker & Containers", completed: false },
  ],
  "Networking": [
    { id: 1, title: "OSI Model", completed: false },
    { id: 2, title: "TCP/IP Protocol Suite", completed: false },
    { id: 3, title: "Routing & Switching", completed: false },
  ]
};

export default function Roadmaps() {
  const [activeRoadmap, setActiveRoadmap] = useState("Web Development");
  
  const milestones = roadmapData[activeRoadmap as keyof typeof roadmapData];
  const completedCount = milestones.filter(m => m.completed).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Map className="w-6 h-6 text-blue-600" /> Learning Roadmaps
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Step-by-step guidance for your career track</p>
          </div>
          <select 
            value={activeRoadmap} 
            onChange={(e) => setActiveRoadmap(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold outline-none"
          >
            {Object.keys(roadmapData).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
            <span>Overall Progress</span>
            <span className="text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="flex flex-col relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8 last:mb-0">
               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-400 group-[.is-active]:bg-blue-50 group-[.is-active]:text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                 {milestone.completed ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-blue-400" />}
               </div>
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col transition-all hover:shadow-md">
                 <div className="flex items-center justify-between space-x-2 mb-1">
                   <div className="font-bold text-slate-800">{milestone.title}</div>
                   <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${milestone.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                     {milestone.completed ? 'Completed' : 'Pending'}
                   </span>
                 </div>
                 <div className="text-sm text-slate-500 font-medium">Milestone {index + 1}</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
