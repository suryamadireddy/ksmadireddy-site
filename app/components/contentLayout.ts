/** Full-bleed horizontal padding matching the work section breakout. */
export const contentBleed =
  "relative w-screen max-w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] box-border px-3 md:px-5 lg:px-10";

export const contentMeasure = "mx-auto w-full min-w-0 max-w-[84rem]";

/** Left text column + media column — shared by hero, story, and work cards. */
export const contentGrid =
  "grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12";

/** Border, radius, and background shared by hero intro and work media. */
export const mediaShellBase =
  "relative w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]";

/** Work card images and embeds — fixed min height and clipping. */
export const mediaShellClass = `${mediaShellBase} min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[380px]`;
