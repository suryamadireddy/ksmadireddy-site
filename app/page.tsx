import { Work } from "./components/Work";
import { contentBleed, contentMeasure } from "./components/contentLayout";

export default function HomePage() {
  return (
    <main>
      <div className={contentBleed}>
        <div className={contentMeasure}>
          <Work />
        </div>
      </div>
    </main>
  );
}
