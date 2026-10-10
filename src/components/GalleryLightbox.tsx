import { useCallback, useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';
import { useModal } from '../hooks/useModal';

// 'all' is not a real category, it just means "do not filter"
const CATEGORIES = ['all', 'Classes', 'Grading', 'Sparring', 'Community'];

/** Photo grid with category filters. Clicking a photo opens a fullscreen viewer. */
export const GalleryLightbox: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState('all');
  // Index into visibleItems, or null when the viewer is closed
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);

  const visibleItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const closeViewer = useCallback(() => setOpenImageIndex(null), []);

  // Step through the photos, wrapping around at either end
  const showPrevious = useCallback(() => {
    setOpenImageIndex((current) =>
      current === null ? null : (current - 1 + visibleItems.length) % visibleItems.length,
    );
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setOpenImageIndex((current) =>
      current === null ? null : (current + 1) % visibleItems.length,
    );
  }, [visibleItems.length]);

  // Escape closes, left/right arrows move between photos, page scroll is locked
  useModal({
    isOpen: openImageIndex !== null,
    onClose: closeViewer,
    onPrevious: showPrevious,
    onNext: showNext,
  });

  const openImage = openImageIndex === null ? null : visibleItems[openImageIndex];

  return (
    <section id="gallery" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading and filters */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
          }`}>
            <Camera className="w-3.5 h-3.5" />
            <span>Moments of Wonder</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Life at Our Angeles City Dojang
          </h2>
          <p className={`mt-2 text-base sm:text-lg ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            High kicks, bright smiles, proud belt promotion milestones, and family training sessions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  // Close the viewer, since the indexes no longer line up
                  setOpenImageIndex(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === category
                    ? isDark
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-black text-white border-black shadow-sm'
                    : isDark
                      ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {category === 'all' ? 'All Photos' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenImageIndex(index)}
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border aspect-[4/3] cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-300'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />

              {/* Dark gradient so the white caption text stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white text-left">
                <span className="inline-block w-fit px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-white text-black mb-1.5 shadow-xs">
                  {item.category}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Fullscreen viewer. Clicking the backdrop closes it. */}
      {openImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label={openImage.title}
        >
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 transition-colors z-50 cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black flex items-center justify-center">
              <img
                src={openImage.imageUrl}
                alt={openImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-zinc-950 text-white border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-white text-black">
                  {openImage.category}
                </span>
                <span className="text-xs text-zinc-400">
                  {(openImageIndex ?? 0) + 1} of {visibleItems.length}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">{openImage.title}</h3>
              <p className="text-sm text-zinc-300 mt-1">{openImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
