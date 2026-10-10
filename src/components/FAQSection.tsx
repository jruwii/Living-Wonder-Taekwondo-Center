import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

/** Accordion of common parent questions. Only one answer is open at a time. */
export const FAQSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Start with the first question expanded; null means all are collapsed
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Clicking the question that is already open collapses it again
  const toggleQuestion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
          }`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers for Parents &amp; Students</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`mt-2 text-base sm:text-lg ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Everything you need to know about starting your martial arts journey at Living Wonder.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-lg font-bold pr-2">
                    {faq.question}
                  </span>
                  {/* The chevron flips over when the answer is open */}
                  <div className={`p-1.5 rounded-full border shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  } ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-200 border-zinc-300 text-black'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 sm:px-6 pb-6 text-sm sm:text-base leading-relaxed border-t pt-4 animate-fadeIn ${
                    isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-700'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Nudge towards the contact form for anything not covered above */}
        <div className={`mt-10 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-black'
        }`}>
          <div>
            <h3 className="font-heading text-base font-bold">
              Have a question not listed here?
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Master Edmond and our team are always delighted to chat with parents.
            </p>
          </div>
          <a
            href="#contact"
            className={`px-5 py-2.5 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            Ask a Question
          </a>
        </div>

      </div>
    </section>
  );
};
