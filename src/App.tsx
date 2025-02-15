import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Track {
  id: number;
  title: string;
  image: string;
  authors?: string;
  audioUrl?: string;
  duration?: string;
  type: 'research' | 'music' | 'podcast';
}

const dailyMixes: Track[] = [
  {
    id: 1,
    title: "AI and Machine Learning",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=AI+ML",
    authors: "Geoffrey Hinton, Yann LeCun, Yoshua Bengio",
    audioUrl: "https://example.com/audio1.mp3",
    duration: "15:30",
    type: 'research'
  },
  {
    id: 2,
    title: "Quantum Computing",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Quantum",
    authors: "Richard Feynman, David Deutsch",
    audioUrl: "https://example.com/audio2.mp3",
    duration: "10:45",
    type: 'research'
  },
  {
    id: 3,
    title: "Biotechnology",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Biotech",
    authors: "Jennifer Doudna, Emmanuelle Charpentier",
    audioUrl: "https://example.com/audio3.mp3",
    duration: "12:30",
    type: 'research'
  },
  {
    id: 4,
    title: "Neuroscience",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Neuro",
    authors: "Eric Kandel, Antonio Damasio",
    audioUrl: "https://example.com/audio4.mp3",
    duration: "11:20",
    type: 'research'
  },
  {
    id: 5,
    title: "Climate Science",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Climate",
    authors: "James Hansen, Michael Mann",
    audioUrl: "https://example.com/audio5.mp3",
    duration: "13:15",
    type: 'research'
  },
  {
    id: 6,
    title: "Space Exploration",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Space",
    authors: "Neil deGrasse Tyson, Brian Cox",
    audioUrl: "https://example.com/audio6.mp3",
    duration: "14:00",
    type: 'research'
  }
];

const topHits: Track[] = [
  {
    id: 1,
    title: "Breakthrough in Quantum Error Correction",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Quantum",
    authors: "Research Team Alpha",
    audioUrl: "https://example.com/audio5.mp3",
    duration: "12:45",
    type: 'research'
  },
  {
    id: 2,
    title: "New CRISPR Applications in Medicine",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=CRISPR",
    authors: "Research Team Beta",
    audioUrl: "https://example.com/audio6.mp3",
    duration: "11:30",
    type: 'research'
  },
  {
    id: 3,
    title: "Advances in Fusion Energy",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Fusion",
    authors: "Research Team Gamma",
    audioUrl: "https://example.com/audio7.mp3",
    duration: "10:20",
    type: 'research'
  },
  {
    id: 4,
    title: "Novel Machine Learning Architectures",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=ML",
    authors: "Research Team Delta",
    audioUrl: "https://example.com/audio8.mp3",
    duration: "13:00",
    type: 'research'
  }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(100);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <header className="sticky top-0 z-50 bg-[#121212]/95 p-4 backdrop-blur-sm">
        <nav className="flex gap-2">
          <button
            onClick={() => setActivePage("all")}
            className={`nav-link ${activePage === "all" ? "!bg-[#282828] !text-white" : ""}`}
          >
            {t("all")}
          </button>
          <button
            onClick={() => setActivePage("music")}
            className={`nav-link ${activePage === "music" ? "!bg-[#282828] !text-white" : ""}`}
          >
            {t("music")}
          </button>
          <button
            onClick={() => setActivePage("podcasts")}
            className={`nav-link ${activePage === "podcasts" ? "!bg-[#282828] !text-white" : ""}`}
          >
            {t("podcasts")}
          </button>
          <div className="ml-auto">
            <select
              onChange={handleLanguageChange}
              className="rounded-full bg-[#282828] px-4 py-2 text-gray-200"
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </nav>
      </header>

      <ScrollArea className="h-[calc(100vh-160px)]">
        <main className="p-6">
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100">
                {t("madeFor", { name: "Mohammed Nouman" })}
              </h2>
              <button className="text-sm text-gray-400 hover:text-white hover:underline">
                {t("showAll")}
              </button>
            </div>
            <div className="spotify-grid">
              {dailyMixes.map((mix) => (
                <div 
                  key={mix.id} 
                  className="playlist-card group bg-[#282828] hover:bg-[#383838]"
                  onClick={() => handleTrackSelect(mix)}
                >
                  <div className="relative">
                    <img
                      src={mix.image}
                      alt={mix.title}
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-[#1DB954] opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-black" />
                      ) : (
                        <Play className="h-6 w-6 text-black" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-100">{mix.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{mix.authors}</p>
                  </div>
                  <div className="daily-mix-number text-gray-500">
                    {String(mix.id).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100">{t("todaysBiggestHits")}</h2>
              <button className="text-sm text-gray-400 hover:text-white hover:underline">
                {t("showAll")}
              </button>
            </div>
            <div className="spotify-grid">
              {topHits.map((hit) => (
                <div 
                  key={hit.id} 
                  className="playlist-card group bg-[#282828] hover:bg-[#383838]"
                  onClick={() => handleTrackSelect(hit)}
                >
                  <div className="relative">
                    <img
                      src={hit.image}
                      alt={hit.title}
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-[#1DB954] opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-black" />
                      ) : (
                        <Play className="h-6 w-6 text-black" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-100">{hit.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>

      <div className="fixed bottom-0 left-0 right-0 border-t border-[#282828] bg-[#181818] p-4">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <div className="flex w-[30%] items-center gap-4">
            {selectedTrack && (
              <>
                <img src={selectedTrack.image} alt={selectedTrack.title} className="h-14 w-14" />
                <div>
                  <h4 className="text-sm font-medium text-gray-100">{selectedTrack.title}</h4>
                  <p className="text-xs text-gray-400">{selectedTrack.authors}</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex w-[40%] flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-black" />
                ) : (
                  <Play className="h-5 w-5 text-black" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
            <div className="flex w-full items-center gap-2">
              <span className="text-xs text-gray-400">0:00</span>
              <Slider
                value={[currentTime]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
              <span className="text-xs text-gray-400">3:45</span>
            </div>
          </div>
          
          <div className="flex w-[30%] items-center justify-end gap-2">
            <Volume2 className="h-5 w-5 text-gray-400" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
        </div>
      </div>

      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent className="max-w-3xl bg-gradient-to-b from-[#282828] to-[#121212]">
          {selectedTrack && (
            <div className="p-6">
              <div className="flex gap-6">
                <img
                  src={selectedTrack.image}
                  alt={selectedTrack.title}
                  className="h-48 w-48 shadow-2xl"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm uppercase text-gray-400">{selectedTrack.type}</p>
                  <h1 className="mt-2 text-4xl font-bold text-white">{selectedTrack.title}</h1>
                  <p className="mt-4 text-gray-400">{selectedTrack.authors}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center gap-4">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DB954] hover:bg-[#1ed760]"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-black" />
                    ) : (
                      <Play className="h-6 w-6 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
