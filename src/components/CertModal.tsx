import React from 'react';
import { Certification } from '../types';
import { X, Award, ShieldCheck, Download, Calendar, Landmark, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CertModalProps {
  cert: Certification;
  onClose: () => void;
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm w-full max-w-2xl shadow-3xl text-slate-800 dark:text-slate-100 overflow-hidden"
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-[#fcfaf7] dark:bg-[#0d0d0d]">
          <div className="flex items-center gap-2 text-[9px] font-sans font-bold text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>VERIFIED CERTIFICATE DOCUMENT</span>
          </div>
          <button
            type="button"
            id="close-cert-btn"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-black dark:text-slate-400 dark:hover:text-white rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Close certificate"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Screen */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          {/* Main Document Viewer Container */}
          <div 
            id="certificate-document-container"
            className="w-full bg-[#f6f3ed] dark:bg-[#0a0a0a] border border-black/15 dark:border-white/15 rounded-sm p-2 flex flex-col items-center justify-center min-h-[500px]"
          >
            {cert.credentialUrl ? (
              cert.credentialUrl.toLowerCase().endsWith('.pdf') ? (
                <div className="w-full h-[550px] relative bg-white dark:bg-zinc-900 rounded-sm overflow-hidden border border-black/10 dark:border-white/10 shadow-inner">
                  <iframe
                    src={`${cert.credentialUrl}#toolbar=0&navpanes=0`}
                    className="w-full h-full border-0"
                    title={cert.name}
                  />
                </div>
              ) : (
                <div className="w-full max-h-[550px] overflow-auto py-4 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-sm border border-black/10 dark:border-white/10 shadow-inner">
                  <img
                    src={cert.credentialUrl}
                    alt={cert.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[520px] object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              )
            ) : (
              <div className="text-center py-24 text-slate-400 dark:text-slate-500 font-mono text-xs">
                No digital document file linked for offline registration log.
              </div>
            )}
          </div>

          {/* Description Detail Block */}
          <div className="w-full mt-6 space-y-3 p-4 bg-[#fcfaf7] dark:bg-[#0d0d0d] rounded-sm border border-black/10 dark:border-white/10 font-sans">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-sky-500" />
              Additional Verification Details
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              This digital document has been verified. In accordance with university and organizational guidelines, this certification remains linked with Rohan Mulukuntla's active portfolio.
            </p>
            <div className="flex justify-end items-center gap-4 pt-1">
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-sans uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Physical Certificate PDF
                </a>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="text-[10px] font-sans uppercase font-bold tracking-wider text-slate-505 text-slate-500 dark:text-slate-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Print Verification Sheet
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
