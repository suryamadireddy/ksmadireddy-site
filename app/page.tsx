import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Work } from "./components/Work";
import { Background } from "./components/Background";
import { Contact } from "./components/Contact";

export default function HomePage() {
  return (
    <main className="mx-auto px-6 md:px-10 lg:px-16 max-w-3xl lg:max-w-4xl">
      <Hero />
      <Story />
      <Work />
      <Background />
      <Contact />
    </main>
  );
}
