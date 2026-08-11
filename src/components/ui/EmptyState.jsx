export default function EmptyState({
  title = "Data akan dilengkapi.",
  description,
}) {
  return (
    <div className="border-y border-deep-navy/10 py-14 text-center">
      <h2 className="font-heading text-2xl font-semibold text-deep-navy">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate">
          {description}
        </p>
      )}
    </div>
  );
}
