import type { Metadata } from "next";
import { ProjectShell } from "@/app/components/project/ProjectShell";
import { AtelierKilnThread } from "@/app/components/project/AtelierKilnThread";

export const metadata: Metadata = {
  title: "Atelier | Krishna Surya Madireddy",
  description: "A studio where ideas are judged, built, and kept or thrown away.",
};

const inlineLinkClass =
  "font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

export default function AtelierPage() {
  return (
    <ProjectShell title="ATELIER">
      <div className="mb-10 md:mb-12">
        <AtelierKilnThread current="atelier" />
      </div>

      {/* Atelier architecture diagram — next step */}
      <div />

      <p className="mb-14 md:mb-16 text-sm md:text-base leading-relaxed text-[var(--color-fg-muted)] italic max-w-xl">
        Most ideas don&rsquo;t make it. That&rsquo;s not a failure of the
        system. It&rsquo;s the system working.
      </p>

      <div className="space-y-8 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)] max-w-2xl">
        <p>
          The Atelier is my studio. It&rsquo;s where I catch ideas before they
          disappear, judge them honestly, and build the ones that survive into
          something worth showing. Every room in it exists because the work
          required it. Walk through it with me.
        </p>

        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            It starts with noticing.
          </strong>{" "}
          An idea arrives the way ideas always do &mdash; half-formed, at a bad
          time, easy to lose. So the first thing the Atelier needed was a place
          to put one down without ceremony. The Idea Vault is that place. No
          judgment, no structure, no pressure to act. You catch the thing before
          it&rsquo;s gone and you move on. A creative system that&rsquo;s hard
          to feed doesn&rsquo;t get fed, so the entry point had to cost nothing.
        </p>

        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            Then it gets tested.
          </strong>{" "}
          When an idea is ready to be taken seriously, it goes through the{" "}
          <a href="/kiln" className={inlineLinkClass}>
            Kiln
          </a>
          . The Kiln is adversarial on purpose. Its first agent, the Evaluator,
          plays devil&rsquo;s advocate across six dimensions and tries to find
          where the idea breaks &mdash; because most ideas should break, and the
          expensive mistake is being gentle with them. The ones that survive get
          grounded in research and turned into a real brief. The ones that
          don&rsquo;t are stopped before the system spends another minute on
          them.
        </p>

        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            The verdict decides where it goes.
          </strong>{" "}
          A passing idea lands in the Workshop &mdash; the active floor, where
          the things worth my time right now live, each one ready to pick up
          exactly where I left off. An idea with promise but no urgency gets
          benched &mdash; set aside on the Bench, where I can find it when I
          have the room to give it. And an idea that didn&rsquo;t survive is
          scrapped &mdash; not deleted, just honestly labeled, because the Kiln
          can be wrong and a discarded idea should always be recoverable.
          Separate places instead of one because the mind needs to know at a
          glance what deserves attention now and what can wait.
        </p>

        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            Working it is its own act.
          </strong>{" "}
          Inside any idea, wherever it lives, I can keep talking to it &mdash;
          pushing it further, reshaping it as I learn. An idea here isn&rsquo;t
          a document that gets filed. It stays live. When it&rsquo;s ready, the
          Builder turns its brief into prototype directions I can see and react
          to, and the Deployer stands it up as something real. Those tools
          belong to the idea, not a room, so a benched idea that&rsquo;s
          suddenly worth building doesn&rsquo;t have to move first.
        </p>

        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            And some of it goes public.
          </strong>{" "}
          The work I&rsquo;m proud of leaves the studio for the Gallery &mdash;
          the room that faces outward. Not everything that survives belongs in
          public, so the Gallery is curated, not automatic. The studio is where
          things are made. The Gallery is where the few worth showing are shown.
        </p>

        <p>
          That&rsquo;s the Atelier. A place built on one belief: that having
          ideas is easy, and the hard, valuable work is deciding which ones
          deserve to become real &mdash; then making those few beautiful.
        </p>
      </div>

      <div className="mt-16 md:mt-20 pt-10 border-t border-[var(--color-border)] max-w-2xl">
        <p className="text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          But the Atelier is the first tool, not the whole plan. The longer goal
          is Jarvis: a layer that holds tools like this one and orchestrates
          across them. The Atelier turns ideas into things. The next tool will
          do something else entirely. Jarvis is what connects them, and what
          comes next.
        </p>
      </div>

      {/* Jarvis layer diagram — next step */}
      <div />
    </ProjectShell>
  );
}
