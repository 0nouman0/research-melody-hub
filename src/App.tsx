
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
  language: 'hindi' | 'kannada' | 'tamil' | 'telugu';
  category: 'business' | 'commerce' | 'entertainment' | 'healthcare' | 'politics' | 'science' | 'sports';
}

const researchTracks: Track[] = [
  {
    id: 1,
    title: "Business Trends in India 2024",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Business",
    authors: "Dr. Rajesh Kumar",
    audioUrl: "https://example.com/audio1.mp3",
    duration: "15:30",
    type: 'research',
    language: 'hindi',
    category: 'business'
  },
  {
    id: 2,
    title: "ಆರೋಗ್ಯ ಸಂಶೋಧನೆ - Healthcare Research",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Healthcare",
    authors: "Dr. Shwetha Rao",
    audioUrl: "https://example.com/audio2.mp3",
    duration: "12:45",
    type: 'research',
    language: 'kannada',
    category: 'healthcare'
  },
  {
    id: 3,
    title: "அரசியல் ஆய்வு - Political Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Politics",
    authors: "Dr. Senthil Kumar",
    audioUrl: "https://example.com/audio3.mp3",
    duration: "14:20",
    type: 'research',
    language: 'tamil',
    category: 'politics'
  },
  {
    id: 4,
    title: "సైన్స్ అప్‌డేట్స్ - Science Updates",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Science",
    authors: "Dr. Priya Reddy",
    audioUrl: "https://example.com/audio4.mp3",
    duration: "11:15",
    type: 'research',
    language: 'telugu',
    category: 'science'
  },
  {
    id: 5,
    title: "खेल विश्लेषण - Sports Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Sports",
    authors: "Dr. Amit Sharma",
    audioUrl: "https://example.com/audio5.mp3",
    duration: "13:30",
    type: 'research',
    language: 'hindi',
    category: 'sports'
  },
  {
    id: 6,
    title: "ವಾಣಿಜ್ಯ ವರದಿ - Commerce Report",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Commerce",
    authors: "Dr. Ramesh Hegde",
    audioUrl: "https://example.com/audio6.mp3",
    duration: "16:45",
    type: 'research',
    language: 'kannada',
    category: 'commerce'
  }
];

const categories = [
  'business', 'commerce', 'entertainment', 
  'healthcare', 'politics', 'science', 'sports'
] as const;

const languages = [
  'hindi', 'kannada', 'tamil', 'telugu'
] as const;

export default function App() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('business');
  const [activeLanguage, setActiveLanguage] = useState<typeof languages[number]>('hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(100);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const togglePlayPause = (track?: Track) => {
    setIsPlaying(!isPlaying);
    if (track && !currentTrack) {
      setCurrentTrack(track);
    }
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setCurrentTrack(track);
  };

  const filteredTracks = researchTracks.filter(track => 
    track.language === activeLanguage && 
    (activeCategory === 'all' || track.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <header className="sticky top-0 z-50 bg-[#121212]/95 p-4 backdrop-blur-sm">
        <nav className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`nav-link ${activeCategory === category ? "!bg-[#282828] !text-white" : ""}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </nav>
        <nav className="mt-2 flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setActiveLanguage(language)}
              className={`nav-link ${activeLanguage === language ? "!bg-[#282828] !text-white" : ""}`}
            >
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <ScrollArea className="h-[calc(100vh-160px)]">
        <main className="p-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100">
                {activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1)} - {
                  activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
                }
              </h2>
            </div>
            <div className="spotify-grid">
              {filteredTracks.map((track) => (
                <div 
                  key={track.id} 
                  className="playlist-card group bg-[#282828] hover:bg-[#383838]"
                  onClick={() => handleTrackSelect(track)}
                >
                  <div className="relative">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-[#1DB954] opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause(track);
                      }}
                    >
                      {isPlaying && currentTrack?.id === track.id ? (
                        <Pause className="h-6 w-6 text-black" />
                      ) : (
                        <Play className="h-6 w-6 text-black" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-100">{track.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{track.authors}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>

      {/* Player Controls */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#282828] bg-[#181818] p-4">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <div className="flex w-[30%] items-center gap-4">
            {currentTrack && (
              <>
                <img src={currentTrack.image} alt={currentTrack.title} className="h-14 w-14" />
                <div>
                  <h4 className="text-sm font-medium text-gray-100">{currentTrack.title}</h4>
                  <p className="text-xs text-gray-400">{currentTrack.authors}</p>
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
                onClick={() => togglePlayPause()}
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
              <span className="text-xs text-gray-400">{currentTrack?.duration || "0:00"}</span>
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
                  <p className="text-sm uppercase text-gray-400">
                    {selectedTrack.language} - {selectedTrack.category}
                  </p>
                  <h1 className="mt-2 text-4xl font-bold text-white">{selectedTrack.title}</h1>
                  <p className="mt-4 text-gray-400">{selectedTrack.authors}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center gap-4">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DB954] hover:bg-[#1ed760]"
                    onClick={() => togglePlayPause(selectedTrack)}
                  >
                    {isPlaying && currentTrack?.id === selectedTrack.id ? (
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
