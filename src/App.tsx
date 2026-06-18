import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Waves, 
  Dumbbell, 
  HeartHandshake, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Check, 
  Search, 
  Menu, 
  X, 
  Briefcase, 
  GraduationCap, 
  Sun, 
  Moon, 
  FileText, 
  Send, 
  MessageSquare, 
  Database, 
  Cpu, 
  Code,
  Settings,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTIFICATIONS_DATA, BLOG_POSTS_DATA, SKILLS_CATEGORIES } from './data';
import { Project, Certification, BlogPost, ContactMessage } from './types';
import ResumePDF from './components/ResumePDF';
import BlogModal from './components/BlogModal';
import CertModal from './components/CertModal';

// Link our generated professional headshot from AI Studio
const PROFILE_IMAGE_SRC = "/src/assets/images/rohan img.jpeg";

export default function App() {
  // Theme state: default light, toggle support dark
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or default to dark (since computer scientists love dark themes)
    const saved = localStorage.getItem('rohan-portfolio-theme');
    return saved ? saved === 'dark' : true;
  });

  // Modals tracking
  const [showResume, setShowResume] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  // Active section scroll tracking
  const [activeSection, setActiveSection] = useState<string>('about');

  // Interactive filters
  const [projectCategory, setProjectCategory] = useState<string>('all');
  const [projectQuery, setProjectQuery] = useState<string>('');
  
  // Custom contact form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);
  const [showAdminDrawer, setShowAdminDrawer] = useState<boolean>(false);

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // References for scrolling
  const aboutRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const certificationsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Sync dark theme with HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('rohan-portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('rohan-portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Load local saved contact feedback messages
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rohan-portfolio-messages');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local messages error", e);
    }
  }, []);

  // Update active navigation category based on viewport scrollposition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;

      const refs = [
        { id: 'about', ref: aboutRef },
        { id: 'education', ref: educationRef },
        { id: 'experience', ref: experienceRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'certifications', ref: certificationsRef },
        { id: 'blog', ref: blogRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of refs) {
        const element = section.ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const refsMap: { [key: string]: React.RefObject<HTMLElement | null> } = {
      about: aboutRef,
      education: educationRef,
      experience: experienceRef,
      skills: skillsRef,
      projects: projectsRef,
      certifications: certificationsRef,
      blog: blogRef,
      contact: contactRef,
    };

    const targetRef = refsMap[id];
    if (targetRef && targetRef.current) {
      setMobileMenuOpen(false);
      const headerOffset = 100;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Contact form submit logic
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setToastMessage("Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);

    // Simulate server side persistence/API call delaying 800ms
    setTimeout(() => {
      const newMessage: ContactMessage = {
        name,
        email,
        subject: subject || "No Subject",
        message,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem('rohan-portfolio-messages', JSON.stringify(updated));

      setIsSubmitting(false);
      setToastMessage("Message sent successfully! Stored securely to sandbox locallogs.");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto dismiss toast after 4s
      setTimeout(() => setToastMessage(''), 4000);
    }, 800);
  };

  const handleClearMessages = () => {
    localStorage.removeItem('rohan-portfolio-messages');
    setSavedMessages([]);
    setToastMessage("Cleared local logs successfully.");
    setTimeout(() => setToastMessage(''), 2000);
  };

  // Filter projects by both input query and category
  const filteredProjects = PROJECTS_DATA.filter(proj => {
    const matchCategory = projectCategory === 'all' || 
      (projectCategory === 'ML/CV' && proj.category === 'ML/CV') ||
      (projectCategory === 'Agentic AI' && proj.category === 'Agentic AI') ||
      (projectCategory === 'AR/Systems' && proj.category === 'AR/Systems');

    const matchQuery = proj.title.toLowerCase().includes(projectQuery.toLowerCase()) ||
      proj.technologies.some(tech => tech.toLowerCase().includes(projectQuery.toLowerCase())) ||
      proj.bullets.some(bullet => bullet.toLowerCase().includes(projectQuery.toLowerCase()));

    return matchCategory && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#fcfaf7] dark:bg-[#0d0d0d] font-sans tracking-normal transition-colors duration-300 relative text-slate-900 dark:text-[#e5e5e5] selection:bg-sky-500/20 p-2 md:p-6">
      
      {/* Outer Editorial Border Frame simulating print journal layout */}
      <div className="border-[4px] md:border-[10px] border-[#e2ddd5] dark:border-[#1a1a1a] min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-48px)] flex flex-col flex-1">
      
      {/* Absolute Header Alert on Small Screens for Quick Actions */}
      <nav id="header-bar" className="sticky top-0 z-40 w-full bg-[#fcfaf7]/90 dark:bg-[#0d0d0d]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 lg:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm overflow-hidden border border-sky-400">
              <img 
                src={PROFILE_IMAGE_SRC} 
                alt="Rohan" 
                className="w-full h-full object-cover scale-110" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif italic font-bold text-sm text-slate-900 dark:text-[#e5e5e5] tracking-tight">{PERSONAL_INFO.name}</span>
              <p className="text-[9px] text-sky-600 dark:text-sky-400 font-mono font-bold tracking-widest uppercase">TAMUCC MS CS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm cursor-pointer hover:text-sky-400"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#faf5ee] dark:bg-[#141414] border-b border-black/10 dark:border-white/10 px-6 py-4 space-y-2 lg:hidden"
          >
            {['about', 'education', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => { scrollToSection(sect); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 font-sans text-[10px] uppercase font-bold tracking-[0.2em] rounded-sm transition-all ${
                  activeSection === sect 
                    ? 'bg-black/5 dark:bg-white/5 text-sky-800 dark:text-sky-450 border-l-2 border-sky-400 pl-2' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {sect}
              </button>
            ))}
            <div className="pt-2 border-t border-black/15 dark:border-white/10">
              <button
                onClick={() => { setShowResume(true); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-black dark:bg-[#e5e5e5] text-white dark:text-black font-bold text-[10px] uppercase tracking-[0.2em]"
              >
                <FileText className="w-4 h-4" />
                Download CV Resume
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Split Grid Architecture (Left Side Sticky Static Bio Pane, Right Side Main Scrolling Panel) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 flex-1">
        
        {/* Left Columns: Sticky Personal Card & Multi-Navigation Control */}
        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-14 h-fit flex flex-col gap-6">
          
          {/* Main Professional Profile Card */}
          <div className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 relative overflow-hidden group">
            
            {/* Ambient Background Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-2xl -z-10 group-hover:scale-125 transition-all duration-750"></div>
            
            <div className="flex flex-col items-center text-center">
              {/* Profile Image with Golden Academic Certificate Medal / Background styling */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-5 group-hover:border-sky-450/40 p-1 bg-[#fcfaf7] dark:bg-[#0d0d0d] transition-colors flex items-center justify-center">
                <img 
                  src={PROFILE_IMAGE_SRC} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold uppercase bg-sky-500/10 dark:bg-sky-500/5 border border-sky-400/20 text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-sm mb-3 tracking-[0.1em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified CS Practitioner
              </span>

              {/* Title & Degrees */}
              <h1 className="text-2xl md:text-3xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mt-2">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
                Texas A&M University • TAMUCC
              </p>

              {/* Short Description */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mt-4 text-justify font-sans">
                "{PERSONAL_INFO.bio}"
              </p>

              <div className="w-full border-t border-black/10 dark:border-white/10 my-5"></div>

              {/* Quick Details List */}
              <div className="w-full space-y-3 px-1 text-slate-700 dark:text-slate-350">
                <div className="flex items-center gap-3">
                  <div className="p-1 px-1.5 border border-black/10 dark:border-white/10 rounded-sm text-slate-400 dark:text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-tight">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 px-1.5 border border-black/10 dark:border-white/10 rounded-sm text-slate-400 dark:text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-mono text-[10px] tracking-tight hover:text-sky-400 underline decoration-sky-400/30">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 px-1.5 border border-black/10 dark:border-white/10 rounded-sm text-slate-400 dark:text-slate-500">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-tight">{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              <div className="w-full border-t border-black/10 dark:border-white/10 my-5"></div>

              {/* Dynamic Interactive Drawer Actions */}
              <div className="w-full grid grid-cols-2 gap-3">
                <a 
                  href={PERSONAL_INFO.linkedin}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-black/10 dark:border-white/10 hover:border-sky-400 dark:hover:border-sky-400 hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-[#e5e5e5] rounded-sm transition-all font-sans text-[9px] uppercase font-bold tracking-[0.15em] hover:text-sky-550"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-500" />
                  LinkedIn
                </a>
                <a 
                  href={PERSONAL_INFO.github}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-black/10 dark:border-white/10 hover:border-sky-400 dark:hover:border-sky-400 hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-[#e5e5e5] rounded-sm transition-all font-sans text-[9px] uppercase font-bold tracking-[0.15em] hover:text-sky-555"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </div>

              <button
                type="button"
                onClick={() => setShowResume(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-black dark:bg-[#e5e5e5] hover:bg-sky-500 dark:hover:bg-sky-450 hover:text-white dark:hover:text-black text-white dark:text-black rounded-sm font-sans text-[10px] uppercase font-bold tracking-[0.15em] shadow-none hover:shadow-none transition-colors duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Print LaTeX Resume CV
              </button>
            </div>
          </div>

          {/* Desktop Navigation Link Block & Utility Theme Toggle Box */}
          <div className="hidden lg:flex flex-col bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-5 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">NAVIGATION MENU</span>
              <button 
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-1.5 text-xs py-1 px-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-slate-600 dark:text-slate-300 hover:text-sky-400 cursor-pointer hover:border-sky-400/50 transition-all font-sans font-bold text-[9px] uppercase tracking-wider"
                aria-label="Change portfolio colors"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5" /> <span className="font-mono text-[9px] font-bold">LIGHT</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" /> <span className="font-mono text-[9px] font-bold">DARK</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-1 text-[10px]">
              {[
                { id: 'about', label: '01. Personal Bio' },
                { id: 'education', label: '02. Education Route' },
                { id: 'experience', label: '03. Work Experience' },
                { id: 'skills', label: '04. Core Skills & Tech' },
                { id: 'projects', label: '05. Selected Projects' },
                { id: 'certifications', label: '06. Certifications' },
                { id: 'blog', label: '07. Technical Insights' },
                { id: 'contact', label: '08. Feedback & Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-2 px-3 rounded-sm font-sans tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === item.id 
                      ? 'bg-black/5 dark:bg-white/5 text-sky-600 dark:text-sky-400 font-extrabold border-l-2 border-sky-400 pl-2' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Optional Small Sandbox Log Action */}
            {savedMessages.length > 0 && (
              <div className="pt-2 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => setShowAdminDrawer(true)}
                  className="w-full text-left py-2 px-3 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-sm flex items-center justify-between font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
                    Messages Recieved ({savedMessages.length})
                  </span>
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </aside>

        {/* Right Columns: Rolling Sections Panel */}
        <main className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12 lg:gap-16">
                   {/* Section 1: About (Rohan Bio + Real life interests) */}
          <section id="about" ref={aboutRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 01</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Biography & Interests</h2>
            </div>

            <div className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-serif italic text-slate-900 dark:text-[#e5e5e5] mb-4">
                Pioneering Machine Learning & Spatial Computing
              </h3>
              
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify space-y-4 font-sans">
                <p>
                  As an MS Computer Science graduate candidate and Teaching Assistant at <strong>Texas A&M University – Corpus Christi (TAMUCC)</strong>, I occupy the junction between academic software research and end-to-end industrial model implementations. Under the guidance of Dr. Carlos Rubio-Medrano, my research focuses on <strong>Sequential-State Architectural Frameworks</strong>—solving hard, state-dependent context losses and semantic loops in multi-turn Generative AI.
                </p>
                <p>
                  During my academic tenure, I have instructed over 90 undergraduate students under real-world, hands-on ML lab pipelines combining PyTorch and OpenCV. With custom vision templates built around convolutional architectures and Vision Transformers, I reduced average student debugging sessions by 30%. I pair academic depth with technical precision, drawing from internships with defense researchers to build modular data platforms.
                </p>
              </div>

              {/* High Contrast visual grid showcasing Personal Hobbies (Gym, Swimming, and Community Service) */}
              <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[0.2em]">
                  Core Life Interests & Community Service
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PERSONAL_INFO.interests.map((interest) => {
                    const iconMap: { [key: string]: any } = {
                      Waves: <Waves className="w-4 h-4 text-sky-500" />,
                      Dumbbell: <Dumbbell className="w-4 h-4 text-sky-500" />,
                      HeartHandshake: <HeartHandshake className="w-4 h-4 text-sky-500" />
                    };
                    return (
                      <div 
                        key={interest.name} 
                        className="p-4 rounded-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-800 dark:text-slate-100 ease-in-out transition-all duration-300 hover:border-sky-400 group-hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="p-1 px-1.5 rounded-sm bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-none">
                            {iconMap[interest.icon] || <Check className="w-4 h-4 text-indigo-500" />}
                          </div>
                          <span className="font-serif italic font-bold text-xs text-slate-950 dark:text-[#e5e5e5]">{interest.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal text-justify">
                          {interest.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Education (TAMUCC MSc, MGIT BTech) */}
          <section id="education" ref={educationRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 02</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Academic Foundations</h2>
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-sky-400/50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-y-3 gap-x-4 mb-4">
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[9px] font-sans font-bold uppercase mb-2 tracking-[0.1em]">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Degree Track
                      </span>
                      <h3 className="text-base md:text-lg font-serif italic font-bold text-slate-900 dark:text-white leading-snug">
                        {edu.institution}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="text-right lg:text-right flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">
                        {edu.period}
                      </span>
                      <span className="mt-1.5 inline-block text-[10px] font-mono font-extrabold text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-sm">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 text-justify mb-4">
                    {edu.details?.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>

                  {/* Coursework pill layout */}
                  {edu.coursework && (
                    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mr-1">Principal Courses:</span>
                      {edu.coursework.map(course => (
                        <span key={course} className="text-[10px] font-mono bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 text-slate-600 dark:text-slate-305 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Experience (Academic Research/TA, Defence Research Intern) */}
          <section id="experience" ref={experienceRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 03</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Work Experience</h2>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-sky-400/50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-y-3 gap-x-4 mb-4">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-sans font-bold uppercase mb-2 tracking-[0.1em] ${
                        exp.type === 'academic' 
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' 
                          : 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400'
                      }`}>
                        <Briefcase className="w-3.5 h-3.5" />
                        {exp.type === 'academic' ? 'University Academic Position' : 'Defence Industrial Position'}
                      </span>
                      <h3 className="text-base md:text-lg font-serif italic font-bold text-slate-900 dark:text-white leading-snug">
                        {exp.role}
                      </h3>
                      <p className="text-xs md:text-sm text-sky-600 dark:text-sky-400 font-sans font-bold uppercase tracking-wider mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">
                        {exp.period}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 inline-block font-mono mt-1">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 dark:text-slate-300 text-justify font-sans">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tag block */}
                  <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1.5">
                    {exp.skills.map(skill => (
                      <span key={skill} className="text-[9px] font-mono bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Skills & Core Capabilities */}
          <section id="skills" ref={skillsRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 04</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-[#111111] dark:text-[#e5e5e5] tracking-tight">Core Skills & Tech</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS_CATEGORIES.map((cat) => {
                const isActive = activeSkillId === cat.id;
                return (
                  <motion.div 
                    key={cat.id} 
                    layout
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: isActive 
                        ? "0 20px 35px -10px rgba(14, 165, 233, 0.45)" 
                        : "0 20px 35px -10px rgba(14, 165, 233, 0.2)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveSkillId(isActive ? null : cat.id)}
                    className={`group cursor-pointer rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 border shadow-sm ${
                      isActive 
                        ? "bg-sky-50/10 dark:bg-sky-950/20 border-sky-500 dark:border-sky-400 ring-2 ring-sky-500/20" 
                        : "bg-white dark:bg-[#141414] border-black/10 dark:border-white/10 hover:border-sky-400/60 hover:bg-sky-500/[0.02] dark:hover:bg-sky-500/[0.01]"
                    }`}
                  >
                    <div>
                      {/* Visual Card Cover Image with overlay */}
                      <div className="relative h-32 w-full overflow-hidden bg-slate-100 dark:bg-zinc-900 border-b border-black/5 dark:border-white/5">
                        <img 
                          src={cat.image} 
                          alt={cat.title} 
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            isActive 
                              ? "grayscale-0 scale-110 opacity-100" 
                              : "grayscale opacity-80 dark:opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                          }`} 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                          isActive 
                            ? "from-sky-500/15 to-transparent dark:from-sky-950/25" 
                            : "from-white via-white/40 to-transparent dark:from-[#141414] dark:via-[#141414]/30"
                        }`} />
                        <span className={`absolute bottom-3 left-4 text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm transition-all duration-300 ${
                          isActive 
                            ? "bg-sky-600 dark:bg-sky-500 text-white shadow-md" 
                            : "bg-black/70 text-white group-hover:bg-sky-600 group-hover:text-white"
                        }`}>
                          {cat.id === 'ml-ai' ? 'ML & AI ENGINE' : cat.id === 'cv-vis' ? 'VISION MODULE' : 'HPC ACCELERATOR'}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`text-sm font-serif italic font-extrabold leading-tight transition-colors duration-300 ${
                            isActive 
                              ? 'text-sky-600 dark:text-sky-400 font-bold' 
                              : 'text-[#111111] dark:text-[#e5e5e5] group-hover:text-sky-600 dark:group-hover:text-sky-400'
                          }`}>
                            {cat.title}
                          </h3>
                          {isActive ? (
                            <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400 animate-spin-slow shrink-0" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse group-hover:text-sky-400" />
                          )}
                        </div>
                        <p className={`text-[11px] mb-4 font-sans leading-relaxed text-justify transition-colors duration-300 ${
                          isActive 
                            ? 'text-slate-700 dark:text-slate-300' 
                            : 'text-slate-500 dark:text-slate-450 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}>
                          {cat.description}
                        </p>

                        <div className="mb-4">
                          <h4 className={`text-[9px] font-mono font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
                            isActive ? 'text-sky-600 dark:text-sky-400 font-extrabold' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-450'
                          }`}>
                            Technical Toolset:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {cat.skills.map((skill) => (
                              <span 
                                key={skill} 
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-sm border transition-all duration-300 ${
                                  isActive 
                                    ? "bg-sky-500/15 dark:bg-sky-450/20 border-sky-500/30 dark:border-sky-400/40 text-sky-700 dark:text-sky-300 font-bold" 
                                    : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/15 text-slate-600 dark:text-slate-350 hover:bg-sky-500/10 hover:border-sky-400/40 hover:text-sky-600 dark:hover:bg-sky-500/15 dark:hover:text-sky-400 dark:hover:border-sky-400/30 font-medium"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="border-t border-black/10 dark:border-white/10 pt-4">
                        <h4 className={`text-[9px] font-mono font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
                          isActive ? 'text-sky-600 dark:text-sky-400 font-extrabold' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                        }`}>
                          Focus & Core Concepts:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {cat.concepts.map((concept) => (
                            <span 
                              key={concept} 
                              className={`text-[9px] font-sans px-2 py-0.5 rounded-sm font-bold tracking-tight border transition-all duration-300 ${
                                isActive
                                  ? "bg-sky-500/25 text-sky-850 border-sky-500 dark:bg-sky-500/30 dark:text-sky-100 dark:border-sky-400 shadow-sm"
                                  : "border-sky-450/20 bg-sky-500/5 text-sky-600 dark:text-sky-450 hover:bg-sky-500/15 hover:text-sky-700 dark:hover:bg-sky-500/20 dark:hover:text-sky-300 hover:border-sky-400/50"
                              }`}
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Projects (Interactive category & keyword search filter) */}
          <section id="projects" ref={projectsRef} className="scroll-mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4 gap-x-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 05</span>
                <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Selected Projects</h2>
              </div>
              
              {/* Keyword Search Input */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by tech (e.g. PyTorch)..."
                  value={projectQuery}
                  onChange={(e) => setProjectQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#fcfaf7] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-sm text-xs font-mono tracking-tight focus:outline-none focus:border-sky-450 text-slate-805 text-slate-800 dark:text-[#e5e5e5]"
                />
              </div>
            </div>

            {/* Category Selector Tab Menu */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5 bg-black/5 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 p-1 rounded-sm w-fit">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'ML/CV', label: 'Machine Learning & CV' },
                { id: 'Agentic AI', label: 'LLM & Agentic AI' },
                { id: 'AR/Systems', label: 'Unity/Systems' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setProjectCategory(cat.id)}
                  className={`text-[9px] font-sans tracking-[0.1em] px-3.5 py-1.5 rounded-sm uppercase font-extrabold transition-all cursor-pointer ${
                    projectCategory === cat.id 
                      ? 'bg-white dark:bg-slate-800 shadow-none text-sky-600 dark:text-sky-400' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-sky-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results Display */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-10 text-center">
                <span className="text-slate-400 font-mono text-xs">No projects match your chosen criteria. Try searching a different keyword.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-5 flex flex-col justify-between transition-all hover:border-sky-400/50 group">
                    <div>
                      {p.image && (
                        <div className="relative w-full h-44 mb-4 bg-slate-100 dark:bg-zinc-900 rounded-sm overflow-hidden border border-black/10 dark:border-white/10">
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500" 
                          />
                          {p.pdfUrl && (
                            <a
                              href={p.pdfUrl}
                              download
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-2 top-2 bg-black/80 backdrop-blur-md border border-white/25 text-white hover:bg-sky-650 hover:bg-sky-600 transition-colors px-2.5 py-1 rounded-sm text-[9px] font-mono flex items-center gap-1 cursor-pointer shadow-md tracking-wider font-bold"
                            >
                              <Sparkles className="w-3 h-3 text-sky-400" />
                              View Presentation PDF
                            </a>
                          )}
                        </div>
                      )}

                      {/* Projects Meta Header with Award labels */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-mono text-[9px] font-bold rounded-sm border border-black/5 dark:border-white/5">
                          {p.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{p.year}</span>
                      </div>

                      <h3 className="text-sm md:text-base font-serif italic font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-sky-500 transition-colors">
                        {p.title}
                      </h3>

                      {p.award && (
                        <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase bg-sky-500/10 border border-sky-400/20 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-sm mb-3 w-fit tracking-wider">
                          <Award className="w-3 h-3 text-sky-500" />
                          <span>{p.award}</span>
                        </div>
                      )}

                      <ul className="list-disc pl-3.5 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-justify my-3 leading-normal font-sans">
                        {p.bullets.slice(0, 3).map((bullet, idx) => (
                          <li key={idx}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-black/10 dark:border-white/10">
                      {/* Tech Stack List */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="text-[9px] font-mono bg-[#fcfaf7] dark:bg-[#0d0d0d] text-slate-600 dark:text-slate-405 text-slate-650 dark:text-slate-400 px-1.5 py-0.5 rounded-sm border border-black/5 dark:border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {p.githubUrl && (
                        <a 
                          href={p.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[9px] font-sans font-extrabold uppercase text-sky-600 dark:text-sky-400 hover:underline hover:text-sky-500 flex items-center gap-1 w-fit tracking-wider"
                        >
                          <Github className="w-3 h-3" />
                          Inspect GitHub Repository
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 6: Certifications & Awards (Clicks open real certificates) */}
          <section id="certifications" ref={certificationsRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 06</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Credentials & Verification</h2>
            </div>

            <div className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-5 italic font-sans">
                Rohan Mulukuntla holds verified master credentials. Select any credential item to generate an interactive compliance verification sheet:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CERTIFICATIONS_DATA.map((cert) => {
                  const isClickable = cert.id !== 'cert-nptel';
                  if (isClickable) {
                    return (
                      <button
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm flex items-start gap-3 text-left transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-sky-400 group cursor-pointer"
                      >
                        <div className="p-2 rounded-sm bg-[#faf5ee] dark:bg-[#141414] border border-black/10 dark:border-white/10 text-sky-500">
                          <Award className="w-5 h-5 group-hover:scale-110 transition-transform text-[#00BCD4] dark:text-sky-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-serif italic font-extrabold text-[#111111] dark:text-[#e5e5e5] leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-450 transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-450 font-mono mt-0.5">
                            {cert.issuer}
                          </p>
                          <span className="inline-block mt-2 text-[9px] font-sans uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400 hover:underline">
                            Launch verification doc
                          </span>
                        </div>
                      </button>
                    );
                  } else {
                    return (
                      <div
                        key={cert.id}
                        className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm flex items-start gap-3 text-left opacity-90"
                      >
                        <div className="p-2 rounded-sm bg-[#faf5ee] dark:bg-[#141414] border border-black/10 dark:border-white/10 text-slate-400">
                          <Award className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div>
                          <h4 className="text-xs font-serif italic font-extrabold text-slate-700 dark:text-slate-300 leading-snug">
                            {cert.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-450 font-mono mt-0.5">
                            {cert.issuer}
                          </p>
                          <span className="inline-block mt-2 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                            Offline / Registry Log Only
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>

          {/* Section 7: Technical Insights Blog (3 custom stories) */}
          <section id="blog" ref={blogRef} className="scroll-mt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 07</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Technical Insights</h2>
            </div>

            <div className="space-y-4">
              {BLOG_POSTS_DATA.map((post) => (
                <article key={post.id} className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-sky-400/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                      <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-sm uppercase font-sans text-[9px] tracking-wider">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-serif italic text-[#111111] dark:text-[#e5e5e5] tracking-tight leading-tight mt-1 mb-2 hover:text-sky-400 transition-colors cursor-pointer" onClick={() => setSelectedBlog(post)}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed text-justify mb-4 font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="flex gap-1.5">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-sm font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedBlog(post)}
                      className="text-[10px] font-sans font-bold uppercase tracking-wider text-sky-600 dark:text-sky-405 text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-sky-500" />
                      Read Article
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section 8: Contact Form / Reciever box */}
          <section id="contact" ref={contactRef} className="scroll-mt-6 pb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">Section 08</span>
              <h2 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight">Contact & Feedback Drawer</h2>
            </div>

            <div className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 md:p-8">
              <h3 className="text-base md:text-lg font-serif italic text-slate-900 dark:text-white mb-2">
                Have a project or opportunity? Reach out!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-6 font-sans">
                Your messages will be stored persistently inside this browser's Local Storage sandbox logs. It simulates cloud postbacks perfectly!
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="input-name" className="block text-[9px] font-sans font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mb-1.5">Your Name*</label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Carlos"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border border-black/10 dark:border-white/10 bg-[#fcfaf7] dark:bg-[#1a1a1a] text-slate-800 dark:text-[#e5e5e5] text-xs focus:outline-none focus:border-sky-450 font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="input-email" className="block text-[9px] font-sans font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mb-1.5">Your email address*</label>
                    <input
                      id="input-email"
                      type="email"
                      required
                      placeholder="e.g. recruiter@corporation.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border border-black/10 dark:border-white/10 bg-[#fcfaf7] dark:bg-[#1a1a1a] text-slate-800 dark:text-[#e5e5e5] text-xs focus:outline-none focus:border-sky-450 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="input-subject" className="block text-[9px] font-sans font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mb-1.5">Subject</label>
                  <input
                    id="input-subject"
                    type="text"
                    placeholder="e.g. Academic Research / Internship proposal"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border border-black/10 dark:border-white/10 bg-[#fcfaf7] dark:bg-[#1a1a1a] text-slate-800 dark:text-[#e5e5e5] text-xs focus:outline-none focus:border-sky-450 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="input-message" className="block text-[9px] font-sans font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mb-1.5">Your message*</label>
                  <textarea
                    id="input-message"
                    required
                    rows={4}
                    placeholder="Enter details of your research query or opportunity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border border-black/10 dark:border-white/10 bg-[#fcfaf7] dark:bg-[#1a1a1a] text-slate-800 dark:text-[#e5e5e5] text-xs focus:outline-none focus:border-sky-450 font-mono text-justify"
                  />
                </div>

                {/* Submit controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-col text-[10px] text-slate-400 dark:text-slate-500 font-mono gap-1">
                    <span>Direct: <span className="font-bold text-slate-600 dark:text-slate-350 hover:text-sky-400">rohanmulukuntla1@gmail.com</span></span>
                    <span>Phone: m(361) 510-9935</span>
                  </div>
                  
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-black dark:bg-[#e5e5e5] hover:bg-sky-500 dark:hover:bg-sky-450 text-white dark:text-black hover:text-white rounded-sm text-[10px] font-sans uppercase font-bold tracking-[0.15em] transition-colors duration-250 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Transit...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send message text
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

        </main>
      </div>
      </div>

      {/* Floating alert Toast messages block */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono shadow-2xl flex items-center gap-3"
          >
            <Check className="w-4.5 h-4.5 text-emerald-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS RENDER PANEL */}

      {/* 1. LaTeX Resume Component */}
      {showResume && (
        <ResumePDF onClose={() => setShowResume(false)} />
      )}

      {/* 2. Interactive verified certificates viewer */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>

      {/* 3. Deep Blog Post Reader */}
      <AnimatePresence>
        {selectedBlog && (
          <BlogModal post={selectedBlog} onClose={() => setSelectedBlog(null)} />
        )}
      </AnimatePresence>

      {/* 4. Local Administrator Recieved messages popup log drawer */}
      <AnimatePresence>
        {showAdminDrawer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.25 }}
              className="bg-white dark:bg-[#141414] border-l border-black/10 dark:border-white/10 w-full max-w-md h-full flex flex-col p-6 shadow-2xl text-slate-800 dark:text-[#e5e5e5]"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-serif italic text-slate-950 dark:text-white">Feedback Admin Portal</h3>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-sans uppercase tracking-[0.15em]">Local Sandbox Storage Logs</p>
                </div>
                <button
                  type="button"
                  id="close-drawer-btn"
                  onClick={() => setShowAdminDrawer(false)}
                  className="p-1.5 text-slate-400 hover:text-black dark:hover:text-white rounded-sm hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Msg list */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {savedMessages.length === 0 ? (
                  <p className="text-xs text-slate-500 font-mono text-center">No messages received yet.</p>
                ) : (
                  savedMessages.map((msg, index) => (
                    <div key={index} className="p-4 bg-[#fcfaf7] dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 rounded-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic font-bold text-xs text-slate-900 dark:text-white">{msg.name}</span>
                        <span className="text-[9px] font-mono text-slate-400">{msg.date}</span>
                      </div>
                      <p className="text-[10px] font-mono text-sky-600 dark:text-sky-400">{msg.email}</p>
                      <div className="text-[10px] bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 p-2.5 rounded-sm text-slate-650 dark:text-slate-350 italic text-justify leading-relaxed">
                        <span className="font-sans font-bold uppercase tracking-wider text-[8px] underline block mb-1">Subject: {msg.subject}</span>
                        "{msg.message}"
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Controls */}
              {savedMessages.length > 0 && (
                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <button
                    onClick={handleClearMessages}
                    className="w-full text-center py-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-sm font-sans text-[10px] uppercase font-bold tracking-[0.15em] transition-colors cursor-pointer"
                  >
                    Clear message log
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
