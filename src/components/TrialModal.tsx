import { useCallback, useEffect, useState } from 'react';
import { X, Sparkles, Send, ShieldCheck, Phone, Mail, User, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useModal } from '../hooks/useModal';
import { sendBooking } from '../services/bookings';
import { Logo } from './Logo';
import { fieldClasses, LABEL_CLASSES } from './formStyles';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fills the program field when the visitor clicked a specific program */
  preferredProgram?: string;
}

const DEFAULT_PROGRAM = 'Little Tigers (Ages 4-6)';

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  age: '',
  program: DEFAULT_PROGRAM,
  notes: '',
};

/** Popup form for booking a free trial class. */
export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, preferredProgram }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Holds the message shown when the booking could not be saved
  const [sendError, setSendError] = useState('');

  // Keep the program field in step with whichever card the visitor clicked
  useEffect(() => {
    if (preferredProgram) {
      setFormData((previous) => ({ ...previous, program: preferredProgram }));
    }
  }, [preferredProgram]);

  /** Updates one field while leaving the rest of the form untouched */
  const updateField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  // Clears everything so the next visitor does not see the previous answers
  const handleClose = useCallback(() => {
    setFormData({ ...EMPTY_FORM, program: preferredProgram || DEFAULT_PROGRAM });
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSendError('');
    onClose();
  }, [onClose, preferredProgram]);

  // Escape to close, plus a scroll lock on the page behind
  useModal({ isOpen, onClose: handleClose });

  // Sends the booking to the Google Sheet, and only then says it worked
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSendError('');

    try {
      await sendBooking({
        source: 'Popup form',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        studentAge: formData.age,
        program: formData.program,
        preferredDay: '',
        notes: formData.notes,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Trial booking failed:', error);
      setSendError(
        'Sorry, we could not send your request just now. Please call or message us on (0917) 555-8963 and we will book you in.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a free trial class"
    >
      <div
        className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border relative space-y-5 max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
          }`}
          aria-label="Close booking form"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Thank-you message shown after sending */
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 p-2 ${
              isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
            }`}>
              <Logo className="w-full h-full object-contain" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">Trial Slot Requested!</h3>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              We look forward to meeting you, <strong>{formData.name || 'there'}</strong>! Our team in Angeles City will message or call <strong>{formData.phone}</strong> to confirm your day and answer any uniform questions.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className={`px-6 py-3 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                Close &amp; Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form header */}
            <div className="flex items-start gap-3.5">
              <div className={`w-11 h-11 rounded-xl border p-1.5 flex items-center justify-center shrink-0 ${
                isDark ? 'bg-black border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-black'
              }`}>
                <Logo className="w-full h-full object-contain" />
              </div>
              <div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border mb-1 ${
                  isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>100% Free • No Obligation</span>
                </div>
                <h3 className="font-heading text-2xl font-bold">Book Your Free Trial Class</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Join Master Edmond Dagpin at Living Wonder Taekwondo Center.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="trial-name" className={LABEL_CLASSES}>
                  Parent / Student Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="trial-name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className={fieldClasses(isDark, 'pl-9')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="trial-phone" className={LABEL_CLASSES}>
                    Mobile / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="trial-phone"
                      type="tel"
                      required
                      placeholder="0917-XXX-XXXX"
                      value={formData.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className={fieldClasses(isDark, 'pl-9')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="trial-age" className={LABEL_CLASSES}>
                    Student Age
                  </label>
                  <input
                    id="trial-age"
                    type="text"
                    placeholder="e.g. 6 or Adult"
                    value={formData.age}
                    onChange={(event) => updateField('age', event.target.value)}
                    className={fieldClasses(isDark)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="trial-email" className={LABEL_CLASSES}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="trial-email"
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className={fieldClasses(isDark, 'pl-9')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="trial-program" className={LABEL_CLASSES}>
                  Program or Schedule Slot
                </label>
                <input
                  id="trial-program"
                  type="text"
                  value={formData.program}
                  onChange={(event) => updateField('program', event.target.value)}
                  className={fieldClasses(isDark)}
                />
              </div>

              <div>
                <label htmlFor="trial-notes" className={LABEL_CLASSES}>
                  Special Notes or Questions (Optional)
                </label>
                <textarea
                  id="trial-notes"
                  rows={2}
                  placeholder="Tell us if you're new in town, shy, or have specific goals..."
                  value={formData.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  className={fieldClasses(isDark)}
                />
              </div>
            </div>

            {sendError && (
              <div
                role="alert"
                className={`flex items-start gap-2.5 p-3.5 rounded-lg border text-xs leading-relaxed ${
                  isDark
                    ? 'bg-red-950/40 border-red-900 text-red-200'
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{sendError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-lg font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              {isSubmitting ? (
                <span>Confirming slot...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Free Trial Class</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <p className={`text-center text-[11px] flex items-center justify-center gap-1 ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>We never share your information. No spam promise.</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
