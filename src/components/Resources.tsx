import React, { useState } from 'react';
import { BookOpen, Video, FileText, Code, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';

const resourceList = [
  { id: 1, title: "Full Stack Open", type: "Course", url: "#", icon: BookOpen, bookmarked: true, desc: "Deep dive into modern web application development with React and Node.js." },
  { id: 2, title: "Namaste JavaScript", type: "Video", url: "#", icon: Video, bookmarked: false, desc: "In-depth video series explaining core JavaScript concepts." },
  { id: 3, title: "MDN Web Docs", type: "Documentation", url: "#", icon: FileText, bookmarked: true, desc: "The ultimate resource for web developers." },
  { id: 4, title: "LeetCode Grind 75", type: "Practice", url: "#", icon: Code, bookmarked: false, desc: "Essential questions to ace technical interviews." },
  { id: 5, title: "System Design Primer", type: "Documentation", url: "#", icon: FileText, bookmarked: false, desc: "Learn how to design large-scale systems." },
  { id: 6, title: "CS50 Introduction to Computer Science", type: "Course", url: "#", icon: BookOpen, bookmarked: false, desc: "Harvard's introduction to the intellectual enterprises of computer science." },
];

export default function Resources() {
  const [resources, setResources] = useState(resourceList);
  const [filter, setFilter] = useState("All");

  const toggleBookmark = (id: number) => {
    setResources(resources.map(r => r.id === id ? { ...r, bookmarked: !r.bookmarked } : r));
  };

  const filtered = filter === "All" ? resources : filter === "Saved" ? resources.filter(r => r.bookmarked) : resources.filter(r => r.type === filter);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-full">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 h-full">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4 xl:gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> Learning Resources Hub
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Curated materials for your developer journey</p>
          </div>
          
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 overflow-x-auto w-full xl:w-auto">
            {["All", "Saved", "Course", "Video", "Documentation", "Practice"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-shadow ${filter === f ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border border-transparent'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => (
            <div key={r.id} className="border border-slate-200 bg-white rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col group h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                  <r.icon className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => toggleBookmark(r.id)}
                  className={`p-2 rounded-xl transition-all ${r.bookmarked ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
                  title={r.bookmarked ? "Remove Bookmark" : "Bookmark Resource"}
                >
                  {r.bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </button>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{r.title}</h3>
              <p className="text-sm font-medium text-slate-600 mb-4 line-clamp-2 flex-1">{r.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                 <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">{r.type}</span>
                 <a href={r.url} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors group-hover:underline">
                   View <ExternalLink className="w-3.5 h-3.5" />
                 </a>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 font-bold">No resources found.</div>
              <div className="text-slate-400 text-sm font-medium mt-1">Try changing the category filter.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
