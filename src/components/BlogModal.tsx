import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  const [copied, setCopied] = useState(false);

  // Simple custom renderer to turn markdown-like strings into formatted HTML paragraphs and items
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Classify headers
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={index} className="text-sm md:text-base font-serif italic text-slate-900 dark:text-white mt-6 mb-3">
            {trimmed.replace('###', '').trim()}
          </h4>
        );
      }
      if (trimmed.startsWith('##')) {
        return (
          <h3 key={index} className="text-base md:text-lg font-serif italic text-slate-900 dark:text-white mt-8 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
            {trimmed.replace('##', '').trim()}
          </h3>
        );
      }

      // Code blocks
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n').filter(line => !line.startsWith('```'));
        return (
          <pre key={index} className="bg-black/5 dark:bg-[#0d0d0d] p-4 rounded-sm overflow-x-auto text-xs font-mono text-slate-800 dark:text-slate-350 border border-black/10 dark:border-white/10 my-4 leading-relaxed">
            <code>{lines.join('\n')}</code>
          </pre>
        );
      }

      // Bullet points
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const items = trimmed.split('\n').map(item => item.replace(/^[*-\s]+/, '').trim());
        return (
          <ul key={index} className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-350 my-3 text-justify font-sans">
            {items.map((item, id) => (
              <li key={id} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      }

      // Highlight math lines / blockquotes
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        return (
          <div key={index} className="text-center bg-[#fcfaf7] dark:bg-[#0d0d0d] p-4 rounded-sm font-mono text-xs border-l-2 border-sky-500 text-sky-600 dark:text-sky-400 my-5 italic">
            {trimmed.replace(/\$\$/g, '')}
          </div>
        );
      }

      // Default paragraph
      return (
        <p key={index} className="text-slate-650 dark:text-slate-300 leading-relaxed text-justify mb-4 font-sans text-xs">
          {trimmed}
        </p>
      );
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-black/10 dark:border-white/10 bg-[#fcfaf7]/80 dark:bg-[#0d0d0d]/80 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-[9px] font-sans font-bold text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em]">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Tech Article</span>
          </div>
          <button 
            type="button"
            id="close-blog-btn"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-sm transition-all cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Article Header */}
          <header className="mb-6 border-b border-black/10 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-sm text-[8px] font-sans font-bold uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-serif italic text-slate-950 dark:text-[#e5e5e5] tracking-tight leading-tight mb-3">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>{post.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-200">
            {renderContent(post.content)}
          </article>

          {/* Tags Footer */}
          <footer className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-sky-500" />
              {post.tags.map(tag => (
                <span key={tag} className="text-[9px] bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-sm font-mono border border-black/5 dark:border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
            <button 
              onClick={handleCopyLink}
              className="text-[10px] font-sans uppercase font-extrabold tracking-wider flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? "Link Copied!" : "Copy Share Link"}
            </button>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
