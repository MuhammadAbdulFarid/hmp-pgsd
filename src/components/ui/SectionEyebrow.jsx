export default function SectionEyebrow({ children, className = "" }) {
  if (!children) return null;

  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />

      {children}
    </span>
  );
}
