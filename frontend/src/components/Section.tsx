import { Container } from "./Container";

interface SectionProps {
  title?: string;
  id?: string;
  children: React.ReactNode;
}

/** Content section with the archive container and a placeholder heading. */
export function Section({ title, id, children }: SectionProps) {
  return (
    <section id={id} className="py-10">
      <Container>
        {title ? <h1 className="mb-4 text-2xl font-bold leading-8">{title}</h1> : null}
        {children}
      </Container>
    </section>
  );
}
