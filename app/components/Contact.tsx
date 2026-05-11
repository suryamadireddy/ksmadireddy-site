export function Contact() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mb-10 md:mb-12">
        <span className="label">Get in touch</span>
      </div>

      <div className="mb-10 md:mb-12">
        <p className="display text-3xl md:text-5xl lg:text-6xl max-w-[20ch]">
          The fastest path is{" "}
          <a
            href="mailto:ksmadireddy@gmail.com"
            className="italic underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[8px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
          >
            an email
          </a>
          .
        </p>
      </div>

      <ul className="space-y-3 text-base md:text-lg">
        <li>
          <ContactLink
            label="Email"
            value="ksmadireddy@gmail.com"
            href="mailto:ksmadireddy@gmail.com"
          />
        </li>
        <li>
          <ContactLink
            label="LinkedIn"
            value="linkedin.com/in/ksmadireddy"
            href="https://www.linkedin.com/in/ksmadireddy/"
            external
          />
        </li>
        <li>
          <ContactLink
            label="GitHub"
            value="github.com/suryamadireddy"
            href="https://github.com/suryamadireddy"
            external
          />
        </li>
      </ul>

      <footer className="mt-24 md:mt-32 pt-8 border-t border-[var(--color-border)] text-sm text-[var(--color-fg-muted)]">
        <p>
          <span className="font-mono text-xs uppercase tracking-wider">
            KSM
          </span>{" "}
          · Built with Next.js · Last updated May 2026
        </p>
      </footer>
    </section>
  );
}

function ContactLink({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
      <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-muted)] w-20 shrink-0">
        {label}
      </span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[5px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
      >
        {value}
      </a>
    </div>
  );
}
