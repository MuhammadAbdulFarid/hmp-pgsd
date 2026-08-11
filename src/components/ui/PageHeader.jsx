import Container from "./Container";

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="bg-deep-navy pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-accent">
          {eyebrow}
        </p>

        <h1 className="mt-6 max-w-5xl font-heading text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.93] tracking-[-0.06em] !text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55">
            {description}
          </p>
        )}
      </Container>
    </header>
  );
}
