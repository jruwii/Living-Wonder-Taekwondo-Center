/*
 * Both booking forms (the popup and the one in the contact section) style their
 * inputs the same way. Keeping the class list here avoids repeating it on every
 * single field.
 */

/** Classes for a text input, select or textarea. Pass `true` when in dark mode. */
export function fieldClasses(isDark: boolean, extraClasses = '') {
  const base = 'w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none';

  const themed = isDark
    ? 'bg-black border-zinc-800 text-white focus:border-white'
    : 'bg-white border-zinc-300 text-black focus:border-black';

  return `${base} ${themed} ${extraClasses}`.trim();
}

/** Classes for the small uppercase label above each field. */
export const LABEL_CLASSES = 'block text-xs font-bold uppercase tracking-wider mb-1.5';
