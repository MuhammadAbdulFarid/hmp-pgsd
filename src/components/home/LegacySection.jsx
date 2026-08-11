import Container from "@/components/ui/Container";

export default function LegacySection() {
  return (
    <section className="relative overflow-hidden bg-primary-blue py-24 text-white md:py-32">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
          HMP PGSD FKIP
        </p>

        <h2 className="mt-7 max-w-5xl font-heading text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em] !text-white">
          Merawat sejarah.
          <br />
          Melanjutkan perjuangan.
        </h2>

        <p className="mt-8 max-w-xl text-sm leading-7 text-white/60">
          Generasi datang dan pergi. Nilai, pengalaman, dan perjalanan
          organisasi tetap diwariskan.
        </p>
      </Container>
    </section>
  );
}
