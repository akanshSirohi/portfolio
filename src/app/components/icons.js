export function Arrow({ diagonal = false, className = "" }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Asterisk({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((angle) => (
        <path
          key={angle}
          d="M50 8v84"
          stroke="currentColor"
          strokeWidth="15"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}
