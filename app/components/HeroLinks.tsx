export function HeroLinks() {
  return (
    <div className="pl-1 inline-flex w-max max-w-full flex-col items-stretch">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-fg)]">
        Krishna Surya Madireddy
      </span>
      <nav
        className="mt-1.5 flex w-full flex-nowrap justify-between gap-y-2 font-mono text-[11px] font-bold tracking-normal text-[var(--color-fg)] normal-case"
        aria-label="Contact links"
      >
        <a
          href="mailto:ksmadireddy@gmail.com"
          className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/ksmadireddy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/suryamadireddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
        >
          GitHub
        </a>
      </nav>
    </div>
  );
}
