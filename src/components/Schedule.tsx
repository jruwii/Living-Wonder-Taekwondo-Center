import { useState } from 'react';
import { Calendar, Clock, UserCheck, Filter, ArrowRight } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/taekwondoData';
import type { ScheduleItem } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

interface ScheduleProps {
  onSelectSlotForTrial: (slotInfo: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
 * Age-group filters. Each one carries its own test, so adding a new filter
 * only means adding an entry here instead of editing an if/else chain.
 */
const AGE_FILTERS: { id: string; label: string; matches: (item: ScheduleItem) => boolean }[] = [
  {
    id: 'all',
    label: 'All Classes',
    matches: () => true,
  },
  {
    id: 'tigers',
    label: 'Little Tigers (Ages 4-6)',
    matches: (item) => item.program.includes('Little Tigers') || item.ageGroup.includes('4–6'),
  },
  {
    id: 'kids',
    label: 'Kids (Ages 7-12)',
    matches: (item) => item.program.includes('Kids') || item.ageGroup.includes('7–12'),
  },
  {
    id: 'adults',
    label: 'Teens & Adults (13+)',
    matches: (item) =>
      item.program.includes('Adult') || item.ageGroup.includes('13+') || item.ageGroup.includes('14+'),
  },
  {
    id: 'team',
    label: 'Competition Sparring',
    matches: (item) => item.program.includes('Competition') || item.program.includes('Sparring'),
  },
];

/** Weekly timetable with a day picker and an age-group filter. */
export const Schedule: React.FC<ScheduleProps> = ({ onSelectSlotForTrial }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedFilterId, setSelectedFilterId] = useState('all');

  const activeFilter = AGE_FILTERS.find((filter) => filter.id === selectedFilterId) ?? AGE_FILTERS[0];
  const visibleSlots = SCHEDULE_DATA.filter(
    (item) => item.day === selectedDay && activeFilter.matches(item),
  );

  return (
    <section id="schedule" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#040812] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark ? 'bg-[#0b162c] border-blue-900/60 text-blue-300' : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Weekly Class Timetable</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Find the Perfect Class Time
          </h2>
          <p className={`mt-2 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Structured weekday and weekend slots designed to fit school and family routines in Angeles City.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Day picker */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40'
                    : isDark
                      ? 'bg-[#0b162c] text-slate-300 hover:bg-[#11203e] border border-blue-950/80'
                      : 'bg-white text-slate-700 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Age-group filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className={`text-xs font-semibold mr-1 flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Filter className="w-3.5 h-3.5 text-blue-500" /> Filter by group:
            </span>
            {AGE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilterId(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                  selectedFilterId === filter.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : isDark
                      ? 'bg-[#0b162c] text-blue-300 border-blue-900/60 hover:bg-[#11203e]'
                      : 'bg-white text-blue-950 border-blue-200 hover:bg-blue-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matching class slots, or a message when the filter finds nothing */}
        <div className="space-y-3">
          {visibleSlots.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl border ${
              isDark ? 'bg-[#0b162c] border-blue-900/60 text-slate-400' : 'bg-white border-blue-100 text-slate-600'
            }`}>
              <p className="text-sm">
                No classes match this specific age group on {selectedDay}. Please select "All Classes" or pick another day.
              </p>
            </div>
          ) : (
            visibleSlots.map((slot) => (
              <div
                key={slot.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                  isDark
                    ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 text-slate-100 shadow-blue-950/30'
                    : 'bg-white border-blue-100 hover:border-blue-300 text-slate-900 shadow-blue-100/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold w-fit shrink-0 border ${
                    isDark
                      ? 'bg-[#060c18] border-blue-900/60 text-blue-300'
                      : 'bg-blue-50 border-blue-200 text-blue-950'
                  }`}>
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{slot.time}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-bold">{slot.program}</h3>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-[#060c18] text-blue-300 border-blue-900/60'
                          : 'bg-blue-50 text-blue-900 border-blue-200'
                      }`}>
                        {slot.ageGroup}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <strong>Level:</strong> {slot.level} • <strong>Instructor:</strong> {slot.instructor} •{' '}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{slot.mat}</span>
                    </p>
                  </div>
                </div>

                {/* Sends the day, time and program across to the booking form */}
                <button
                  onClick={() => onSelectSlotForTrial(`${slot.day} @ ${slot.time} - ${slot.program}`)}
                  className="shrink-0 w-full md:w-auto px-4 py-2.5 rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-all cursor-pointer ring-1 ring-blue-400/30"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Book Trial in this Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
