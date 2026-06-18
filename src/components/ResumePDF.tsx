import React from 'react';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTIFICATIONS_DATA } from '../data';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ResumePDFProps {
  onClose: () => void;
}

export default function ResumePDF({ onClose }: ResumePDFProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0d0d0d] border border-white/10 rounded-sm w-full max-w-4xl p-6 shadow-2xl flex flex-col h-[90vh] my-4">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-3">
          <div>
            <h3 className="text-xl font-serif italic text-[#e5e5e5]">Interactive Printable Resume</h3>
            <p className="text-xs text-slate-400 font-sans tracking-wide">LaTeX layout optimized for A4/Letter size PDF download.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white text-black hover:bg-sky-500 hover:text-white rounded-sm font-sans text-[10px] uppercase font-bold tracking-[0.15em] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Download / Print PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-[#141414] hover:bg-black text-slate-300 border border-white/10 rounded-sm font-sans text-[10px] uppercase font-bold tracking-[0.12em] transition-colors cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#141414]/50 border border-white/5 rounded-sm mt-4">
          {/* Printable Sheet */}
          <div 
            id="resume-print-container" 
            className="w-full max-w-2xl mx-auto bg-white text-slate-900 p-8 shadow-xl rounded-sm font-serif text-[11px] leading-relaxed select-text"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {/* Name & Contact */}
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold tracking-wide uppercase text-black mb-1">{PERSONAL_INFO.name}</h1>
              <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10px] text-slate-700">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>•</span>
                <span className="font-semibold">{PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>linkedin.com/in/mulukuntla-rohan</span>
                <span>•</span>
                <span>github.com/mulukuntlarohan</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Summary</h2>
              <p className="text-[10px] text-justify text-slate-800 leading-normal">
                Machine Learning Engineer and M.S. Computer Science candidate at Texas A&M University–Corpus Christi with 2+ years of experience 
                in computer vision, deep learning, and NLP. Developed CNN and Vision Transformer models achieving over 93% accuracy and built 
                real-time radar data pipelines that reduced latency by 35%. Proficient in Python, PyTorch, TensorFlow, LangChain, and AWS, seeking 
                opportunities to contribute AI-driven features.
              </p>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Education</h2>
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={edu.id} className={idx > 0 ? "mt-2" : ""}>
                  <div className="flex justify-between font-bold text-[10.5px] text-black">
                    <span>{edu.institution}</span>
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex justify-between text-[10px] italic text-slate-800">
                    <span>{edu.degree} (GPA: {edu.gpa})</span>
                    <span>{edu.period}</span>
                  </div>
                  {edu.coursework && (
                    <div className="text-[10px] text-slate-700 mt-0.5">
                      <span className="font-bold">Coursework:</span> {edu.coursework.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Technical Skills</h2>
              <div className="space-y-0.5 text-[10px] text-slate-800">
                <div><span className="font-bold">Programming Languages:</span> {PERSONAL_INFO.skills.languages.join(', ')}</div>
                <div><span className="font-bold">Machine Learning & AI:</span> {PERSONAL_INFO.skills.mlAndAi.join(', ')}</div>
                <div><span className="font-bold">Computer Vision:</span> {PERSONAL_INFO.skills.computerVision.join(', ')}</div>
                <div><span className="font-bold">NLP & LLMs (Agentic AI):</span> {PERSONAL_INFO.skills.nlpAndLlm.join(', ')}</div>
                <div><span className="font-bold">Cloud & DevOps:</span> {PERSONAL_INFO.skills.cloudAndDevOps.join(', ')}</div>
                <div><span className="font-bold">Databases & Tools:</span> {PERSONAL_INFO.skills.databases.join(', ')} • {PERSONAL_INFO.skills.tools.slice(0, 7).join(', ')}</div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Work Experience</h2>
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={exp.id} className={idx > 0 ? "mt-3.5" : ""}>
                  <div className="flex justify-between font-bold text-[10.5px] text-black">
                    <span>{exp.company} {exp.company.includes('Texas') ? ', Dept. of Computer Science' : ''}</span>
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex justify-between text-[10px] italic text-slate-800">
                    <span>{exp.role}</span>
                    <span>{exp.period}</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-[10px] text-slate-800 space-y-0.5 text-justify">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Selected Projects */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Selected Projects</h2>
              {PROJECTS_DATA.slice(0, 3).map((proj, idx) => (
                <div key={proj.id} className={idx > 0 ? "mt-3" : ""}>
                  <div className="flex justify-between font-bold text-[10.5px] text-black">
                    <span>{proj.title} {proj.award ? `— ${proj.award}` : ''}</span>
                    <span>{proj.year}</span>
                  </div>
                  <div className="text-[9.5px] italic text-slate-600 mb-0.5">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-800 space-y-0.5 text-justify">
                    {proj.bullets.map((bullet, bidx) => (
                      <li key={bidx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Leadership, Activities & Awards */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">Leadership, Activities & Awards</h2>
              <ul className="list-disc pl-4 text-[10px] text-slate-800 space-y-1">
                <li><span className="font-bold">Research & Creative Achievement (2026):</span> Presented a detailed stateful memory RAG model for conversational workflows at the TAMUCC Student Innovation Research Symposium, earning Outstanding Graduate Capstone Project honors from CSRIL.</li>
                <li><span className="font-bold">Environmental Innovation:</span> Presented a data-driver water conservation model reducing data center water footprints at SRICA TAMUCC.</li>
                <li><span className="font-bold">Campus Leadership:</span> Appointed as University Student Chancellor for the Indian Student Association (ISA) and Secretary for the XR Club at TAMUCC. Served as Head Coordinator for QUBIT FEST 2024.</li>
                <li><span className="font-bold">Community Service:</span> Volunteered with the National Service Scheme (NSS) NGO, coordinating blood donation campaigns, educational drives, and local community outreach welfare initiatives.</li>
                <li><span className="font-bold">Academic Honors:</span> Recipient of the Undergraduate Outstanding Unique Project Award (EduAR) and Oracle Academy Certified in Java Programming & SQL.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
