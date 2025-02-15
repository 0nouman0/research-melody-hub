import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Track {
  id: number;
  title: string;
  image: string;
  authors?: string;
  audioUrl: string;
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
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
    duration: "15:30",
    type: 'research',
    language: 'hindi',
    category: 'business'
  },
  {
    id: 2,
    title: "ವ್ಯಾಪಾರ ಪ್ರವೃತ್ತಿಗಳು - Business Trends",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Business",
    authors: "Dr. Ramesh Hegde",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
    duration: "12:45",
    type: 'research',
    language: 'kannada',
    category: 'business'
  },
  {
    id: 3,
    title: "வணிக போக்குகள் - Business Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Business",
    authors: "Dr. Senthil Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav",
    duration: "14:20",
    type: 'research',
    language: 'tamil',
    category: 'business'
  },
  {
    id: 4,
    title: "വാണിജ്യ വിപണി - Commerce Market",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Commerce",
    authors: "Dr. Priya Reddy",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    duration: "11:15",
    type: 'research',
    language: 'telugu',
    category: 'commerce'
  },
  {
    id: 5,
    title: "वाणिज्य विश्लेषण - Commerce Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Commerce",
    authors: "Dr. Amit Sharma",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav",
    duration: "13:30",
    type: 'research',
    language: 'hindi',
    category: 'commerce'
  },
  {
    id: 6,
    title: "वಾಣಿಜ್ಯ ನಿರ್ಣಯ - Commerce Report",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Commerce",
    authors: "Dr. Kiran Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/tada.wav",
    duration: "16:45",
    type: 'research',
    language: 'kannada',
    category: 'commerce'
  },
  {
    id: 7,
    title: "मनोरंjang समाचार - Entertainment News",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Entertainment",
    authors: "Dr. Karthik Raja",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
    duration: "10:15",
    type: 'research',
    language: 'hindi',
    category: 'entertainment'
  },
  {
    id: 8,
    title: "பொழுதுபோக்கு - Entertainment Update",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Entertainment",
    authors: "Dr. Ravi Krishna",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav",
    duration: "18:20",
    type: 'research',
    language: 'tamil',
    category: 'entertainment'
  },
  {
    id: 9,
    title: "వినోద వార్తలు - Entertainment Report",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Entertainment",
    authors: "Dr. Priya Gupta",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
    duration: "15:45",
    type: 'research',
    language: 'telugu',
    category: 'entertainment'
  },
  {
    id: 10,
    title: "स्वास्थ्य जागरूकता - Healthcare Awareness",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Healthcare",
    authors: "Dr. Suresh Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
    duration: "12:30",
    type: 'research',
    language: 'hindi',
    category: 'healthcare'
  },
  {
    id: 11,
    title: "ആരോഗ്യ സംരക്ഷണം - Healthcare Update",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Healthcare",
    authors: "Dr. Vijay Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav",
    duration: "14:50",
    type: 'research',
    language: 'tamil',
    category: 'healthcare'
  },
  {
    id: 12,
    title: "ఆరోగ్య సంരక్షण - Healthcare Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Healthcare",
    authors: "Dr. Srinivas Reddy",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    duration: "16:15",
    type: 'research',
    language: 'telugu',
    category: 'healthcare'
  },
  {
    id: 13,
    title: "राजनीतिक विश्लेषण - Political Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Politics",
    authors: "Dr. Ramesh Sharma",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav",
    duration: "13:20",
    type: 'research',
    language: 'hindi',
    category: 'politics'
  },
  {
    id: 14,
    title: "రాజకీయ అధ్యయనం - Political Study",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Politics",
    authors: "Dr. Krishna Reddy",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/tada.wav",
    duration: "11:45",
    type: 'research',
    language: 'telugu',
    category: 'politics'
  },
  {
    id: 15,
    title: "அரசியல் ஆய்வு - Political Research",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Politics",
    authors: "Dr. Tamil Selvan",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
    duration: "15:30",
    type: 'research',
    language: 'tamil',
    category: 'politics'
  },
  {
    id: 16,
    title: "विज्ञान अनुसंधान - Science Research",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Science",
    authors: "Dr. Anil Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav",
    duration: "14:15",
    type: 'research',
    language: 'hindi',
    category: 'science'
  },
  {
    id: 17,
    title: "वಿಜ್ಞಾನ ಅಧ್ಯಯನ - Science Study",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Science",
    authors: "Dr. Shivakumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
    duration: "12:40",
    type: 'research',
    language: 'kannada',
    category: 'science'
  },
  {
    id: 18,
    title: "అభివృద్ధి శాస్త్రం - Science Development",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Science",
    authors: "Dr. Venkat Rao",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
    duration: "13:55",
    type: 'research',
    language: 'telugu',
    category: 'science'
  },
  {
    id: 19,
    title: "खेल समीक्षा - Sports Review",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Sports",
    authors: "Dr. Rahul Verma",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav",
    duration: "11:25",
    type: 'research',
    language: 'hindi',
    category: 'sports'
  },
  {
    id: 20,
    title: "క్రీడా విశ్లేషణ - Sports Analysis",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Sports",
    authors: "Dr. Suresh Reddy",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    duration: "14:30",
    type: 'research',
    language: 'telugu',
    category: 'sports'
  },
  {
    id: 21,
    title: "விளையாட்டு ஆய்வு - Sports Study",
    image: "https://placehold.co/400x400/1DB954/ffffff?text=Sports",
    authors: "Dr. Raja Kumar",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav",
    duration: "12:50",
    type: 'research',
    language: 'tamil',
    category: 'sports'
  }
];

const categories = [
  'all', 'business', 'commerce', 'entertainment', 
  'healthcare', 'politics', 'science', 'sports'
] as const;

const languages = [
  'hindi', 'kannada', 'tamil', 'telugu'
] as const;

export default function App() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [activeLanguage, setActiveLanguage] = useState<typeof languages[number]>('hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(1);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeUpdateHandler = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const endedHandler = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', timeUpdateHandler);
    audio.addEventListener('ended', endedHandler);
    audio.addEventListener('loadedmetadata', timeUpdateHandler);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdateHandler);
      audio.removeEventListener('ended', endedHandler);
      audio.removeEventListener('loadedmetadata', timeUpdateHandler);
    };
  }, [currentTrack]);

  const togglePlayPause = (track?: Track) => {
    if (track) {
      if (currentTrack?.id !== track.id) {
        setCurrentTrack(track);
        setIsPlaying(true);
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setCurrentTrack(track);
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                  }
                }}
              >
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
              <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full"
                onValueChange={handleTimeChange}
              />
              <span className="text-xs text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex w-[30%] items-center justify-end gap-2">
            <Volume2 className="h-5 w-5 text-gray-400" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => setVolume(value[0] / 100)}
            />
          </div>
        </div>
      </div>

      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent className="max-w-3xl bg-gradient-to-b from-[#282828] to-[#121212]">
          <DialogTitle className="text-xl font-bold text-white">Now Playing</DialogTitle>
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
