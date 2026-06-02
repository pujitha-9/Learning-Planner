import React, { useState } from 'react';
import { Briefcase, Crosshair, Star, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

export default function AiAdvisor() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const generateAdvice = async () => {
    if (!skills || !interests) {
      toast.error("Please enter skills and interests");
      return;
    }
    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setAdvice({
        careerPath: "Full Stack Engineer / Cloud Architect",
        requiredSkills: ["React/Next.js", "Node.js/Go", "AWS/GCP Basics", "System Design"],
        certifications: ["AWS Certified Developer", "Meta Frontend Developer", "Google Cloud Associate"],
        actionPlan: [
          "Master advanced React patterns (useMemo, context)",
          "Build 2 full-stack projects with active user bases",
          "Study basic cloud deployment pipelines (CI/CD)"
        ]
      });
      setLoading(false);
      toast.success("AI Career Profile Generated");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shadow-inner">
              <Briefcase className="text-purple-600 w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">AI Career Advisor</h3>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
            Enter your current skills and career interests. Our AI will analyze your profile and suggest optimal career paths, required skills, and certifications.
          </p>

          <div className="flex flex-col gap-5 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Current Skills</label>
              <textarea 
                value={skills} onChange={e => setSkills(e.target.value)}
                placeholder="e.g. HTML, CSS, basic JavaScript..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 h-28 resize-none shadow-inner placeholder:text-slate-400"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Interests & Goals</label>
              <textarea 
                value={interests} onChange={e => setInterests(e.target.value)}
                placeholder="e.g. Building scalable web apps, learning AI..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 h-28 resize-none shadow-inner placeholder:text-slate-400"
              ></textarea>
            </div>
          </div>
          
          <button 
            onClick={generateAdvice} disabled={loading}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-md cursor-pointer hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Analyzing Profile...' : 'Generate Career Plan'}
            <Lightbulb className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        <div className="md:col-span-7 flex flex-col h-full mt-0">
          {!advice ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex items-center justify-center h-full min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Crosshair className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-600 font-bold text-lg mb-1">Awaiting Input</p>
                <p className="text-sm text-slate-500 font-medium max-w-sm">Fill out the form on the left to generate career insights and an actionable growth plan.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 animation-in slide-in-from-right-4 h-full">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Path</h2>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-8 pb-6 border-b border-slate-100">
                {advice.careerPath}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-500 shrink-0" /> Target Skills
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {advice.requiredSkills.map((s:string) => (
                      <li key={s} className="bg-slate-50 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 border border-slate-100 flex items-center shadow-sm before:content-[''] before:w-1.5 before:h-1.5 before:bg-purple-400 before:rounded-full before:mr-3">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-500 shrink-0" /> Certifications
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {advice.certifications.map((c:string) => (
                      <li key={c} className="bg-slate-50 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 border border-slate-100 flex items-center shadow-sm before:content-[''] before:w-1.5 before:h-1.5 before:bg-indigo-400 before:rounded-full before:mr-3">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4">Action Plan</h4>
                <ul className="space-y-4">
                  {advice.actionPlan.map((step:string, i:number) => (
                    <li key={i} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-inner">{i+1}</div>
                      <span className="text-slate-700 font-semibold text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
