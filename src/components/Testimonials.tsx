import { Star, MessageSquareQuote, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

/** Review cards from parents and students, each with a star rating. */
export const Testimonials: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-white border-zinc-300 text-zinc-800'
          }`}>
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Stories</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Loved by Parents &amp; Students in Angeles City
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Hear why families from Angeles City, Clark Freeport Zone, and across Pampanga call Living Wonder their martial arts home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`rounded-3xl border p-8 shadow-sm transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative ${
                isDark
                  ? 'bg-black border-zinc-800 hover:border-zinc-500 text-white'
                  : 'bg-white border-zinc-300 hover:border-black text-black'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  {/* One star per point of the rating */}
                  <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }, (_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${isDark ? 'fill-white text-white' : 'fill-black text-black'}`}
                      />
                    ))}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isDark
                      ? 'bg-zinc-900 text-zinc-300 border-zinc-700'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-300'
                  }`}>
                    {testimonial.tag}
                  </span>
                </div>

                <blockquote className={`text-sm sm:text-[15px] leading-relaxed italic relative ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  {/* Oversized decorative quote mark behind the text */}
                  <MessageSquareQuote className={`w-8 h-8 absolute -top-3 -left-3 pointer-events-none ${
                    isDark ? 'text-zinc-800' : 'text-zinc-200'
                  }`} />
                  “{testimonial.quote}”
                </blockquote>
              </div>

              <div className={`pt-6 mt-6 border-t flex items-center gap-3 ${
                isDark ? 'border-zinc-800' : 'border-zinc-200'
              }`}>
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  loading="lazy"
                  className={`w-11 h-11 rounded-full object-cover border-2 filter grayscale ${
                    isDark ? 'border-zinc-700' : 'border-zinc-300'
                  }`}
                />
                <div>
                  <h3 className="font-heading font-bold text-sm leading-tight">{testimonial.name}</h3>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
