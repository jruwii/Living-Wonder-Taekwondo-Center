import { useId } from 'react';

interface LogoProps {
  className?: string;
  /** Defaults to the surrounding text color, so the logo works on any background */
  color?: string;
}

/**
 * The interlocking "LW" brand mark, drawn as an SVG so it stays sharp at any size.
 * The clip path flattens the tops of the two outer strokes.
 */
export const Logo: React.FC<LogoProps> = ({ className = 'w-10 h-10', color }) => {
  // The logo appears several times on the page, so the clip path needs a unique
  // id per instance. Sharing one id would be invalid HTML, and every copy would
  // point at whichever one happened to be first in the document.
  const clipPathId = useId();

  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Living Wonder Taekwondo Logo"
      role="img"
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect x="0" y="385" width="1000" height="600" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipPathId})`}>
        <g
          stroke={color || 'currentColor'}
          strokeWidth="78"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
        >
          {/* Left "L": down to the bottom point, up to the right, then hooks back down */}
          <path d="M 185 360 L 382 760 L 490 450 L 395 530" />

          {/* Right "W": mirrored, meeting the left shape at the centre peak */}
          <path d="M 815 360 L 618 760 L 472 405 L 567 570" />
        </g>
      </g>
    </svg>
  );
};
