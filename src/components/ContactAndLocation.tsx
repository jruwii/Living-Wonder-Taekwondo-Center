import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2, Navigation, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sendBooking } from '../services/bookings';
import { fieldClasses, LABEL_CLASSES } from './formStyles';

interface ContactAndLocationProps {
  /** Program or timetable slot carried over from whatever the visitor clicked */
  initialProgramInterest?: string;
}

const PROGRAM_OPTIONS = [
  'Little Tigers (Ages 4-6)',
  'Kids Taekwondo (Ages 7-12)',
  'Teens & Adults (13+)',
  'Competition Sparring Team',
  'Family Taekwondo',
];

const PREFERRED_DAY_OPTIONS = [
  'Saturday Morning',
  'Saturday Afternoon',
  'Monday Afternoon',
  'Wednesday Afternoon',
  'Friday Afternoon',
  'Weekday Evening (Adults)',
];

const EMPTY_FORM = {
  parentOrStudentName: '',
  email: '',
  phone: '',
  studentAge: '',
  programInterest: PROGRAM_OPTIONS[1],
  preferredDay: PREFERRED_DAY_OPTIONS[0],
  message: '',
};

/** Dojang address, opening hours, a map, and the main trial booking form. */
export const ContactAndLocation: React.FC<ContactAndLocationProps> = ({ initialProgramInterest }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    programInterest: initialProgramInterest || EMPTY_FORM.programInterest,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Holds the message shown when the booking could not be saved
  const [sendError, setSendError] = useState('');

  // Fill in the program when the visitor arrives here from a program or slot button
  useEffect(() => {
    if (initialProgramInterest) {
      setFormData((previous) => ({ ...previous, programInterest: initialProgramInterest }));
    }
  }, [initialProgramInterest]);

  /** Updates one field while leaving the rest of the form untouched */
  const updateField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  // Sends the booking to the Google Sheet, and only then says it worked
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSendError('');

    try {
      await sendBooking({
        source: 'Contact section',
        name: formData.parentOrStudentName,
        phone: formData.phone,
        email: formData.email,
        studentAge: formData.studentAge,
        program: formData.programInterest,
        preferredDay: formData.preferredDay,
        notes: formData.message,
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

  return (
    <section id="contact" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
          }`}>
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us in Angeles City</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Start Your Journey with a Free Trial
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Experience our friendly atmosphere, meet Master Edmond Dagpin, and see the difference positive martial arts makes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: address, phone, email, hours and the map */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
            }`}>
              <h3 className="font-heading text-2xl font-bold">Dojang Headquarters</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Physical Location</h4>
                    <p className={`mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      2nd Floor, Wonder Heritage Plaza, MacArthur Highway, Angeles City, 2009 Pampanga, Philippines
                    </p>
                    <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                      (5 minutes from Clark Main Gate &amp; Friendship Highway)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Call / SMS / WhatsApp</h4>
                    <p className="mt-0.5">
                      <a href="tel:+639175558963" className="hover:underline font-bold">
                        +63 (0917) 555-8963
                      </a>
                    </p>
                    <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Direct line to front desk &amp; trial bookings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Inquiries</h4>
                    <p className="mt-0.5">
                      <a href="mailto:ruwiitkd@gmail.com" className="hover:underline font-bold">
                        ruwiitkd@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Operating Hours</h4>
                    <p className={`mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Monday – Friday: 3:30 PM – 8:30 PM
                    </p>
                    <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                      Saturday: 8:30 AM – 6:00 PM
                    </p>
                    <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Sunday: Private Clinics &amp; Testing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google map of the area */}
            <div className={`rounded-3xl border p-4 shadow-sm overflow-hidden ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
            }`}>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-zinc-700">
                <iframe
                  title="Living Wonder Taekwondo Center location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123326.68531189422!2d120.51866343516086!3d15.14819777977462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f26b5d920367%3A0xe5433d7b309605ff!2sAngeles%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                  className="w-full h-full border-0 filter grayscale contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs">
                <span className="font-bold flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  Angeles City, Pampanga
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold uppercase tracking-wider hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Right: the booking form */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border p-8 sm:p-10 shadow-sm relative overflow-hidden ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
            }`}>

              {isSubmitted ? (
                /* Thank-you message shown after sending */
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 ${
                    isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                  }`}>
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold">Trial Request Received!</h3>
                  <p className={`max-w-md mx-auto text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}>
                    Thank you, <strong>{formData.parentOrStudentName || 'Friend'}</strong>. Master Edmond Dagpin and our front desk will reach out via phone/WhatsApp at <strong>{formData.phone}</strong> shortly to confirm your trial slot.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        // Clear the fields so the next booking starts fresh
                        setFormData(EMPTY_FORM);
                        setIsSubmitted(false);
                        setSendError('');
                      }}
                      className={`px-6 py-3 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                      }`}
                    >
                      Book Another Session
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className={`border-b pb-4 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider block mb-1 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      No Prior Experience Needed • Dobok Provided for Trial
                    </span>
                    <h3 className="font-heading text-2xl font-bold">Book a Free Trial Session</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className={LABEL_CLASSES}>
                        Parent or Student Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Maria Santos / John Smith"
                        value={formData.parentOrStudentName}
                        onChange={(event) => updateField('parentOrStudentName', event.target.value)}
                        className={fieldClasses(isDark)}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className={LABEL_CLASSES}>
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="0917-XXX-XXXX"
                        value={formData.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        className={fieldClasses(isDark)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className={LABEL_CLASSES}>
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        className={fieldClasses(isDark)}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-age" className={LABEL_CLASSES}>
                        Student Age
                      </label>
                      <input
                        id="contact-age"
                        type="text"
                        placeholder="e.g. 5 yrs old / Adult"
                        value={formData.studentAge}
                        onChange={(event) => updateField('studentAge', event.target.value)}
                        className={fieldClasses(isDark)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-program" className={LABEL_CLASSES}>
                        Program of Interest
                      </label>
                      <select
                        id="contact-program"
                        value={formData.programInterest}
                        onChange={(event) => updateField('programInterest', event.target.value)}
                        className={fieldClasses(isDark)}
                      >
                        {/*
                          A timetable slot arrives as free text that is not in this list,
                          so show it as an extra option rather than silently losing it.
                        */}
                        {!PROGRAM_OPTIONS.includes(formData.programInterest) && (
                          <option value={formData.programInterest}>{formData.programInterest}</option>
                        )}
                        {PROGRAM_OPTIONS.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-day" className={LABEL_CLASSES}>
                        Preferred Day / Time
                      </label>
                      <select
                        id="contact-day"
                        value={formData.preferredDay}
                        onChange={(event) => updateField('preferredDay', event.target.value)}
                        className={fieldClasses(isDark)}
                      >
                        {PREFERRED_DAY_OPTIONS.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={LABEL_CLASSES}>
                      Tell us about your goals or questions (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="e.g. My child is a bit shy, new in town, or looking to build focus..."
                      value={formData.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      className={fieldClasses(isDark)}
                    />
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
                    className={`w-full py-3.5 px-6 rounded-lg font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait ${
                      isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Reserving your trial...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Free Trial Reservation</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className={`text-center text-xs pt-2 flex items-center justify-center gap-1.5 ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>No credit card required. No obligation to enroll.</span>
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
