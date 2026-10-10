import { useCallback, useState } from 'react';
import { Bell, Calendar, ChevronRight, AlertCircle, X } from 'lucide-react';
import { NOTICES } from '../data/taekwondoData';
import type { Notice } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';
import { useModal } from '../hooks/useModal';

/** Grid of dojang announcements. Clicking a card opens the full text in a popup. */
export const NoticeBoard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // null means no popup is showing
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const closeNotice = useCallback(() => setActiveNotice(null), []);

  // Escape to close, plus a scroll lock on the page behind
  useModal({ isOpen: activeNotice !== null, onClose: closeNotice });

  return (
    <section id="notices" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#040812] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark ? 'bg-[#0b162c] border-blue-900/60 text-blue-300' : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <Bell className="w-3.5 h-3.5 text-blue-500" />
            <span>Community Updates &amp; Events</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Dojang Notice Board
          </h2>
          <p className={`mt-2 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Stay updated with upcoming belt gradings, friendship tournaments, and family welcome sessions in Angeles City.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NOTICES.map((notice) => (
            <button
              key={notice.id}
              type="button"
              onClick={() => setActiveNotice(notice)}
              className={`text-left rounded-2xl border p-6 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                isDark
                  ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 text-slate-100 shadow-blue-950/30'
                  : 'bg-white border-blue-100 hover:border-blue-400 text-slate-900 shadow-blue-100/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-[#060c18] text-blue-300 border-blue-900/60'
                      : 'bg-blue-50 text-blue-900 border-blue-200'
                  }`}>
                    {notice.category}
                  </span>

                  <div className={`flex items-center gap-1.5 text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold mb-2">{notice.title}</h3>

                <p className={`text-sm line-clamp-2 leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {notice.summary}
                </p>
              </div>

              <div className={`mt-4 pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-blue-950/80' : 'border-blue-100'
              }`}>
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:underline">
                  <span>Read event details</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                {notice.isUrgent && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Notice Active
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Popup with the full notice. Clicking the dark backdrop closes it. */}
      {activeNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
          onClick={closeNotice}
          role="dialog"
          aria-modal="true"
          aria-label={activeNotice.title}
        >
          <div
            className={`rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border relative space-y-4 ${
              isDark
                ? 'bg-[#0b162c] border-blue-900/60 text-slate-100'
                : 'bg-white border-blue-100 text-slate-900'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeNotice}
              className={`absolute top-4 right-4 z-10 p-2 rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-[#060c18]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-blue-50'
              }`}
              aria-label="Close notice"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isDark ? 'bg-[#060c18] text-blue-300 border-blue-900/60' : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}>
                {activeNotice.category}
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {activeNotice.date}
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold">{activeNotice.title}</h3>

            <div className={`p-3.5 rounded-xl text-sm font-medium border ${
              isDark
                ? 'bg-[#060c18] text-slate-200 border-blue-950'
                : 'bg-blue-50 text-blue-950 border-blue-200'
            }`}>
              {activeNotice.summary}
            </div>

            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {activeNotice.details}
            </p>

            <div className={`pt-4 border-t flex justify-end ${
              isDark ? 'border-blue-950/80' : 'border-blue-100'
            }`}>
              <button
                onClick={closeNotice}
                className="px-5 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
