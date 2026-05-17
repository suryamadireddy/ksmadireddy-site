import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Work } from "./components/Work";
import { Background } from "./components/Background";

export default function HomePage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 md:px-5 lg:px-10">
      <Hero />
      <Story />
      <div className="relative w-screen max-w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] box-border px-3 md:px-5 lg:px-10">
        <div className="mx-auto w-full min-w-0 max-w-[84rem]">
          <Work />
        </div>
      </div>
      <Background />
    </main>
  );
}
