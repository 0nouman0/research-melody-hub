
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const dailyMixes = [
  {
    id: 1,
    title: "AI and Machine Learning",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=AI+ML",
    authors: "Geoffrey Hinton, Yann LeCun, Yoshua Bengio"
  },
  {
    id: 2,
    title: "Quantum Computing",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Quantum",
    authors: "Richard Feynman, David Deutsch"
  },
  {
    id: 3,
    title: "Biotechnology",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Biotech",
    authors: "Jennifer Doudna, Emmanuelle Charpentier"
  },
  {
    id: 4,
    title: "Neuroscience",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Neuro",
    authors: "Eric Kandel, Antonio Damasio"
  },
  {
    id: 5,
    title: "Climate Science",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Climate",
    authors: "James Hansen, Michael Mann"
  },
  {
    id: 6,
    title: "Space Exploration",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Space",
    authors: "Neil deGrasse Tyson, Brian Cox"
  }
];

const topHits = [
  {
    id: 1,
    title: "Breakthrough in Quantum Error Correction",
    image: "https://placehold.co/400x400/FF0000/ffffff?text=Quantum",
  },
  {
    id: 2,
    title: "New CRISPR Applications in Medicine",
    image: "https://placehold.co/400x400/FF0000/ffffff?text=CRISPR",
  },
  {
    id: 3,
    title: "Advances in Fusion Energy",
    image: "https://placehold.co/400x400/FF0000/ffffff?text=Fusion",
  },
  {
    id: 4,
    title: "Novel Machine Learning Architectures",
    image: "https://placehold.co/400x400/FF0000/ffffff?text=ML",
  }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState("all");

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="sticky top-0 z-50 bg-[#121212] p-4">
        <nav className="flex gap-2">
          <button
            onClick={() => setActivePage("all")}
            className={`nav-link ${activePage === "all" ? "active" : ""}`}
          >
            {t("all")}
          </button>
          <button
            onClick={() => setActivePage("music")}
            className={`nav-link ${activePage === "music" ? "active" : ""}`}
          >
            {t("music")}
          </button>
          <button
            onClick={() => setActivePage("podcasts")}
            className={`nav-link ${activePage === "podcasts" ? "active" : ""}`}
          >
            {t("podcasts")}
          </button>
          <div className="ml-auto">
            <select
              onChange={handleLanguageChange}
              className="rounded-full bg-black px-4 py-2 text-white"
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </nav>
      </header>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <main className="p-6">
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {t("madeFor", { name: "Mohammed Nouman" })}
              </h2>
              <button className="text-sm text-gray-400 hover:underline">
                {t("showAll")}
              </button>
            </div>
            <div className="spotify-grid">
              {dailyMixes.map((mix) => (
                <div key={mix.id} className="playlist-card">
                  <img
                    src={mix.image}
                    alt={mix.title}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{mix.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{mix.authors}</p>
                  </div>
                  <div className="daily-mix-number">
                    {String(mix.id).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t("todaysBiggestHits")}</h2>
              <button className="text-sm text-gray-400 hover:underline">
                {t("showAll")}
              </button>
            </div>
            <div className="spotify-grid">
              {topHits.map((hit) => (
                <div key={hit.id} className="playlist-card">
                  <img
                    src={hit.image}
                    alt={hit.title}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{hit.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>
    </div>
  );
}
