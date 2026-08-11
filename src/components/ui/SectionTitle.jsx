import SectionEyebrow from "./SectionEyebrow";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && <SectionEyebrow className="mb-5">{eyebrow}</SectionEyebrow>}

      <h2 className="section-title">{title}</h2>

      {description && (
        <p className="body-large mt-6 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
