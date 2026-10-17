/**
 * BSGSS Homepage & Website Customizer Configuration
 * Controls section ordering, visibility, collage imagery, live typing headlines, and ambient music soundscapes.
 */

export type HomepageSectionId =
  | "hero"
  | "live_ticker"
  | "photo_collage"
  | "about"
  | "programmes"
  | "media_showcase"
  | "government"
  | "impact_stats"
  | "india_map"
  | "partners"
  | "management"
  | "support_cta";

export type SectionConfig = {
  id: HomepageSectionId;
  name: string;
  category: "hero" | "media" | "content" | "impact" | "partners" | "action";
  enabled: boolean;
  order: number;
  description: string;
};

export type CollagePhotoItem = {
  id: string;
  src: string;
  title: string;
  category: string;
  tag: string;
  caption: string;
  year?: string;
  tilt: "-rotate-2" | "-rotate-1" | "rotate-0" | "rotate-1" | "rotate-2";
  featured?: boolean;
};

export type AmbientTrackPreset = {
  id: string;
  name: string;
  genre: string;
  description: string;
  audioUrl?: string; // Optional remote MP3/stream; falls back to Web Audio soothing synthesizer
};

export type AmbientAudioConfig = {
  enabled: boolean;
  trackId: string;
  customUrl: string;
  defaultVolume: number; // 0.05 to 1.0 (default 0.25)
  clickSounds: boolean;
};

export type LiveTypingConfig = {
  eyebrow: string;
  phrases: string[];
  statusText: string;
};

export type CustomizerImagesConfig = {
  heroSlides: string[];
  collagePhotos: CollagePhotoItem[];
};

export type MapFootprintConfig = {
  eyebrow: string;
  heading: string;
  description: string;
  defaultMode: "world" | "india";
  worldNote: string;
  indiaNote: string;
  globalVisionGoal: string;
};

export type CustomizerSettings = {
  sections: SectionConfig[];
  audio: AmbientAudioConfig;
  typing: LiveTypingConfig;
  images: CustomizerImagesConfig;
  footprint: MapFootprintConfig;
};

export const AMBIENT_TRACK_PRESETS: AmbientTrackPreset[] = [
  {
    "id": "santoor-serenity",
    "name": "Gramodyog Santoor Serenity",
    "genre": "Acoustic Santoor & Tanpura Drone",
    "description": "Gentle acoustic Kashmiri santoor plucks layered with deep calming tanpura resonance, designed specifically for peaceful rural reflection.",
    "audioUrl": "/audio/gramodyog-santoor-serenity.m4a"
  },
  {
    "id": "kashmiri-santur",
    "name": "Kashmiri Santur & Hypnotic Tanpura",
    "genre": "Santur, Tanpura & Atmospheric Strings",
    "description": "Exquisite Kashmiri santur strokes layered over a deep hypnotic tanpura drone and subtle atmospheric strings.",
    "audioUrl": "/audio/kashmiri-santur-tanpura.m4a"
  },
  {
    "id": "sitar-sunset",
    "name": "Sitar Sunset Serenity",
    "genre": "Meditative Classical Sitar",
    "description": "Slow, contemplative acoustic sitar phrases with calming sympathetic string decay, perfect for peaceful reflection.",
    "audioUrl": "/audio/sitar-sunset-serenity.m4a"
  },
  {
    "id": "sitar-raga",
    "name": "Classical Sitar Morning Alaap",
    "genre": "Indian Classical Sitar",
    "description": "Contemplative morning raga played on traditional acoustic sitar with delicate sympathetic string resonance.",
    "audioUrl": "/audio/sitar-serenity-raga.mp3"
  },
  {
    "id": "ananda-sitar",
    "name": "Ananda Sitar Harmony",
    "genre": "Uplifting Indian Sitar",
    "description": "Joyful, melodious sitar cadence bringing gentle optimism, warmth, and dignity to community engagement.",
    "audioUrl": "/audio/ananda-sitar-harmony.m4a"
  },
  {
    "id": "veena-sitar",
    "name": "Saraswati Veena & Sitar Jugalbandi",
    "genre": "Classical String Duet",
    "description": "Sacred acoustic conversation between the South Indian Saraswati Veena and traditional North Indian Sitar.",
    "audioUrl": "/audio/veena-sitar-jugalbandi.m4a"
  },
  {
    "id": "raga-yaman",
    "name": "Evening Raga Yaman Alaap",
    "genre": "Kalyan Thaat Classical Raga",
    "description": "The quintessential twilight raga of peace, patience, and devotion played with pristine classical authenticity.",
    "audioUrl": "/audio/raga-yaman-alaap.m4a"
  },
  {
    "id": "sarod-serenity",
    "name": "Classical Sarod Serenity (Raga Bhairav)",
    "genre": "Acoustic Sarod Solo",
    "description": "Meditative metallic glides of the classical Indian Sarod on steel strings in the dawn raga Bhairav.",
    "audioUrl": "/audio/classical-sarod-serenity.m4a"
  },
  {
    "id": "sarvodaya-flute",
    "name": "Bansuri Dawn Meditation",
    "genre": "Meditative Indian Bamboo Flute",
    "description": "Peaceful morning bamboo flute melody capturing the tranquility of Indian village dawns.",
    "audioUrl": "/audio/bansuri-meditation.mp3"
  },
  {
    "id": "carnatic-flute",
    "name": "Carnatic Wind Serenity",
    "genre": "Classical Indian Flute",
    "description": "Acoustic 8-hole bamboo flute playing contemplative phrases for deep relaxation.",
    "audioUrl": "/audio/carnatic-flute-serenity.mp3"
  },
  {
    "id": "dakshin-venu",
    "name": "Dakshin Venu Flute Alaap",
    "genre": "Devotional South Indian Flute",
    "description": "Traditional bamboo flute playing devotional South Indian gamaka phrases in peaceful stillness.",
    "audioUrl": "/audio/dakshin-venu-flute.m4a"
  },
  {
    "id": "sacred-om-drone",
    "name": "Sacred Om (136.1 Hz) & Tanpura Drone",
    "genre": "Cosmic Drone & Tanpura Plucks",
    "description": "Continuous cosmic fundamental drone tuned to the sacred 136.1 Hz frequency layered with rhythmic Tanpura plucks.",
    "audioUrl": "/audio/sacred-om-tanpura-drone.m4a"
  },
  {
    "id": "peaceful-piano",
    "name": "Sarvodaya Hope Piano & Strings",
    "genre": "Warm Ambient Piano Pad",
    "description": "Soothing acoustic felt piano arpeggios over warm atmospheric orchestral strings, creating an uplifting and dignified ambiance.",
    "audioUrl": "/audio/peaceful-ambient-piano.m4a"
  },
  {
    "id": "tranquil-piano",
    "name": "Tranquil Dawn Piano & Synth Pad",
    "genre": "Minimalist Ambient Piano",
    "description": "Minimalist soothing piano notes floating softly over warm atmospheric synth pads for deep mental calm.",
    "audioUrl": "/audio/tranquil-dawn-piano.m4a"
  },
  {
    "id": "himalayan-spiritual",
    "name": "Himalayan Spiritual Breeze",
    "genre": "Spatial New Age Ambiance",
    "description": "Calm spatial soundscape with ethereal harmonic chords inspiring hope, service, and quiet stillness.",
    "audioUrl": "/audio/himalayan-spiritual-breeze.m4a"
  },
  {
    "id": "gramin-sunset",
    "name": "Gramin Sunset Folk Acoustic",
    "genre": "Warm Acoustic Guitar & Strings",
    "description": "Nostalgic, heartfelt acoustic fingerpicking capturing the quiet beauty of rural Indian villages at dusk.",
    "audioUrl": "/audio/gramin-sunset-acoustic.m4a"
  },
  {
    "id": "vedic-temple-chimes",
    "name": "Vedic Temple Chimes & Singing Bowls",
    "genre": "Resonant Singing Bowls",
    "description": "Pure harmonic singing bowl frequencies and temple chime overtones creating a serene contemplative sanctuary.",
    "audioUrl": "/audio/vedic-temple-chimes.m4a"
  },
  {
    "id": "bamboo-zen-chimes",
    "name": "Bamboo Zen Wind Chimes",
    "genre": "Organic Wind Percussion",
    "description": "Delicate natural bamboo tubes gently swaying in the breeze, producing soft wooden acoustic intervals.",
    "audioUrl": "/audio/bamboo-zen-wind-chimes.m4a"
  },
  {
    "id": "himalayan-rain",
    "name": "Himalayan Monsoon Rain & Stream",
    "genre": "Natural Water & Raindrops",
    "description": "Gentle natural rain falling on lush leaves with the distant soothing murmur of a mountain stream.",
    "audioUrl": "/audio/himalayan-monsoon-stream.m4a"
  },
  {
    "id": "morning-forest-birds",
    "name": "Morning Forest Sunrise & Birds",
    "genre": "Natural Forest Soundscape",
    "description": "Authentic dawn chorus of songbirds singing amidst a gentle morning forest breeze.",
    "audioUrl": "/audio/morning-forest-birds.m4a"
  },
  {
    "id": "raga-bhairav",
    "name": "Raga Bhairav Dawn Awakening",
    "genre": "Indian Classical Raga",
    "description": "Morning devotional raga instilling solemn peace and spiritual awakening.",
    "audioUrl": "/audio/raga-bhairav.m4a"
  },
  {
    "id": "raga-bilawal",
    "name": "Shuddha Bilawal Morning Radiance",
    "genre": "Indian Classical Raga",
    "description": "Bright, cheerful major scale raga bringing natural warmth and optimism.",
    "audioUrl": "/audio/raga-bilawal.m4a"
  },
  {
    "id": "raga-kalyan",
    "name": "Raga Kalyan Sunset Contemplation",
    "genre": "Indian Classical Raga",
    "description": "Deep, dignified evening melody of peace and gratitude.",
    "audioUrl": "/audio/raga-kalyan.m4a"
  },
  {
    "id": "raga-kafi",
    "name": "Raga Kafi Spring Joy",
    "genre": "Indian Classical Raga",
    "description": "Lyrical folk-rooted melody celebrating community harmony and rural life.",
    "audioUrl": "/audio/raga-kafi.m4a"
  },
  {
    "id": "raga-asavari",
    "name": "Raga Asavari Gentle Compassion",
    "genre": "Indian Classical Raga",
    "description": "Introspective mood conveying empathy, patience, and tender care.",
    "audioUrl": "/audio/raga-asavari.m4a"
  },
  {
    "id": "raga-khamaj",
    "name": "Raga Khamaj Twilight Romance",
    "genre": "Indian Classical Raga",
    "description": "Soulful evening thumri raga expressing quiet devotion and serenity.",
    "audioUrl": "/audio/raga-khamaj.m4a"
  },
  {
    "id": "raga-todi",
    "name": "Miyan Ki Todi Solitude & Prayer",
    "genre": "Indian Classical Raga",
    "description": "Profound, meditative morning masterpiece of devotion and surrender.",
    "audioUrl": "/audio/raga-todi.m4a"
  },
  {
    "id": "raga-marwa",
    "name": "Raga Marwa Twilight Dissolution",
    "genre": "Indian Classical Raga",
    "description": "Haunting sunset raga evoking eternity, vast horizons, and stillness.",
    "audioUrl": "/audio/raga-marwa.m4a"
  },
  {
    "id": "raga-poorvi",
    "name": "Raga Poorvi Dusk Solace",
    "genre": "Indian Classical Raga",
    "description": "Contemplative sunset raga capturing the quiet beauty of rural twilight.",
    "audioUrl": "/audio/raga-poorvi.m4a"
  },
  {
    "id": "raga-bhairavi",
    "name": "Raga Bhairavi Peace & Universal Love",
    "genre": "Indian Classical Raga",
    "description": "The ultimate concluding raga of peace, benediction, and contentment.",
    "audioUrl": "/audio/raga-bhairavi.m4a"
  },
  {
    "id": "raga-darbari",
    "name": "Darbari Kanada Midnight Dignity",
    "genre": "Indian Classical Raga",
    "description": "Majestic, deep midnight raga commanding respect, gravity, and calm.",
    "audioUrl": "/audio/raga-darbari.m4a"
  },
  {
    "id": "raga-bageshree",
    "name": "Raga Bageshri Midnight Longing",
    "genre": "Indian Classical Raga",
    "description": "Romantic late-night melody invoking patience and sweet emotional stillness.",
    "audioUrl": "/audio/raga-bageshree.m4a"
  },
  {
    "id": "raga-kedar",
    "name": "Raga Kedar Moonlit Devotion",
    "genre": "Indian Classical Raga",
    "description": "Sacred Shaivite raga embodying tranquil night and pristine river waters.",
    "audioUrl": "/audio/raga-kedar.m4a"
  },
  {
    "id": "raga-hindo",
    "name": "Raga Hindol Spring Breeze",
    "genre": "Indian Classical Raga",
    "description": "Ancient five-note morning melody symbolizing rejuvenation and growth.",
    "audioUrl": "/audio/raga-hindo.m4a"
  },
  {
    "id": "raga-chandrakauns",
    "name": "Raga Chandrakauns Moonlit Path",
    "genre": "Indian Classical Raga",
    "description": "Mystical nocturnal meditation under clear starlit skies.",
    "audioUrl": "/audio/raga-chandrakauns.m4a"
  },
  {
    "id": "raga-madhuvanti",
    "name": "Raga Madhuvanti Sweet Twilight",
    "genre": "Indian Classical Raga",
    "description": "Heartfelt evening composition filled with warmth and peaceful hope.",
    "audioUrl": "/audio/raga-madhuvanti.m4a"
  },
  {
    "id": "raga-shree-dawn",
    "name": "Raga Shree Cosmic Stillness",
    "genre": "Indian Classical Raga",
    "description": "Noble, deep devotion at the transition between day and night.",
    "audioUrl": "/audio/raga-shree-dawn.m4a"
  },
  {
    "id": "raga-jaunpuri",
    "name": "Raga Jaunpuri Morning Stroll",
    "genre": "Indian Classical Raga",
    "description": "Delightful mid-morning melody capturing village pathways and sunbeams.",
    "audioUrl": "/audio/raga-jaunpuri.m4a"
  },
  {
    "id": "raga-patdeep",
    "name": "Raga Patdeep Afternoon Tranquility",
    "genre": "Indian Classical Raga",
    "description": "Relaxing mid-afternoon raga easing mental tension and tiredness.",
    "audioUrl": "/audio/raga-patdeep.m4a"
  },
  {
    "id": "raga-desh-flute",
    "name": "Raga Desh Monsoon Rain & Breeze",
    "genre": "Indian Classical Raga",
    "description": "Traditional monsoon folk melody celebrating green fields and cool rains.",
    "audioUrl": "/audio/raga-desh-flute.m4a"
  },
  {
    "id": "ganges-morning-flow",
    "name": "Ganges River Sacred Dawn Flow",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Gentle holy river ripples with soft distant morning ghat bells.",
    "audioUrl": "/audio/ganges-morning-flow.m4a"
  },
  {
    "id": "yamuna-water-stream",
    "name": "Yamuna Tranquil Stream Currents",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Peaceful murmuring water streams flowing through green riverbanks.",
    "audioUrl": "/audio/yamuna-water-stream.m4a"
  },
  {
    "id": "sarvodaya-monsoon-rain",
    "name": "Monsoon Petrichor Warm Rain",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Gentle drops of Indian monsoon rainfall falling on broad leaves.",
    "audioUrl": "/audio/sarvodaya-monsoon-rain.m4a"
  },
  {
    "id": "kedarnath-mountain-wind",
    "name": "Kedarnath Himalayan Ridge Breeze",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Crisp mountain wind whispering over alpine ridges and pine forests.",
    "audioUrl": "/audio/kedarnath-mountain-wind.m4a"
  },
  {
    "id": "thar-desert-twilight",
    "name": "Thar Desert Starlight Breeze",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Vast silent twilight breeze over golden dunes under starry skies.",
    "audioUrl": "/audio/thar-desert-twilight.m4a"
  },
  {
    "id": "vrindavan-peacocks-birds",
    "name": "Vrindavan Peacocks & Garden Songbirds",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Melodious chirping of garden songbirds and morning forest calls.",
    "audioUrl": "/audio/vrindavan-peacocks-birds.m4a"
  },
  {
    "id": "kerala-backwater-kayak",
    "name": "Kerala Backwater Ripples & Palms",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Rhythmic paddle strokes and gentle lapping waters amidst coconut palms.",
    "audioUrl": "/audio/kerala-backwater-kayak.m4a"
  },
  {
    "id": "nilgiri-tea-mist",
    "name": "Nilgiri Mountain Morning Mist",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Cool morning breeze drifting softly through misty tea plantations.",
    "audioUrl": "/audio/nilgiri-tea-mist.m4a"
  },
  {
    "id": "sunderbans-mangrove-flow",
    "name": "Sunderbans Tidal Mangrove Harmony",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Quiet estuary water currents moving gently through mangrove groves.",
    "audioUrl": "/audio/sunderbans-mangrove-flow.m4a"
  },
  {
    "id": "himalayan-buddhist-stream",
    "name": "Dharamshala Mountain Stream & Bell",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Rushing glacial stream accompanied by periodic resonant temple singing bowls.",
    "audioUrl": "/audio/himalayan-buddhist-stream.m4a"
  },
  {
    "id": "village-crickets-dusk",
    "name": "Gramin Dusk Crickets & Evening Solace",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Peaceful soothing drone of evening crickets in a quiet Indian village.",
    "audioUrl": "/audio/village-crickets-dusk.m4a"
  },
  {
    "id": "rishikesh-forest-zen",
    "name": "Rishikesh Forest Birds & Holy River",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Symphony of forest birds by the banks of the upper Ganges.",
    "audioUrl": "/audio/rishikesh-forest-zen.m4a"
  },
  {
    "id": "corbett-dawn-chorus",
    "name": "Corbett Reserve Dawn Wildlife Chorus",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Authentic dawn avian melodies from the foothills of Uttarakhand.",
    "audioUrl": "/audio/corbett-dawn-chorus.m4a"
  },
  {
    "id": "western-ghats-waterfall",
    "name": "Western Ghats Distant Waterfall Pad",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Muffled, calming roar of a distant forest cascade cushioned by lush foliage.",
    "audioUrl": "/audio/western-ghats-waterfall.m4a"
  },
  {
    "id": "bengal-paddy-breeze",
    "name": "Golden Paddy Fields Gentle Rustle",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Soft rustling of ripening paddy crop swaying in warm afternoon breezes.",
    "audioUrl": "/audio/bengal-paddy-breeze.m4a"
  },
  {
    "id": "amarnath-snow-ambiance",
    "name": "Amarnath High Altitude Stillness",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Deep, pristine stillness and faint alpine wind in snowy sanctuaries.",
    "audioUrl": "/audio/amarnath-snow-ambiance.m4a"
  },
  {
    "id": "pushkar-sacred-lake",
    "name": "Pushkar Sacred Lake Lapping Waters",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Quiet holy lake ripples under serene desert twilight.",
    "audioUrl": "/audio/pushkar-sacred-lake.m4a"
  },
  {
    "id": "konkan-sea-whispers",
    "name": "Konkan Arabian Sea Gentle Waves",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Slow, rhythmic, gentle ocean waves breaking on soft sand shores.",
    "audioUrl": "/audio/konkan-sea-whispers.m4a"
  },
  {
    "id": "kodaikanal-pine-forest",
    "name": "Kodaikanal Pine Forest Echoes",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Wind singing through evergreen needle pines in the high hills.",
    "audioUrl": "/audio/kodaikanal-pine-forest.m4a"
  },
  {
    "id": "gangotri-glacial-origin",
    "name": "Gangotri Glacial Spring Water",
    "genre": "Bio-Acoustic Nature Soundscape",
    "description": "Pure, crystal-clear glacial trickle radiating deep calm and clarity.",
    "audioUrl": "/audio/gangotri-glacial-origin.m4a"
  },
  {
    "id": "solfeggio-174hz",
    "name": "174 Hz Deep Physical Healing Drone",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Foundation frequency relieving tension, providing comfort and physical ease.",
    "audioUrl": "/audio/solfeggio-174hz.m4a"
  },
  {
    "id": "solfeggio-285hz",
    "name": "285 Hz Tissue Renewal & Cellular Calm",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Rejuvenating frequency promoting vitality, safety, and deep restoration.",
    "audioUrl": "/audio/solfeggio-285hz.m4a"
  },
  {
    "id": "solfeggio-396hz",
    "name": "396 Hz Liberation from Fear & Sorrow",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Clearing anxiety, fostering emotional resilience, and opening peaceful awareness.",
    "audioUrl": "/audio/solfeggio-396hz.m4a"
  },
  {
    "id": "solfeggio-417hz",
    "name": "417 Hz Facilitating Positive Change",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Cleanses past stress, inspiring positive transformative action for communities.",
    "audioUrl": "/audio/solfeggio-417hz.m4a"
  },
  {
    "id": "solfeggio-432hz",
    "name": "432 Hz Sacred Earth Resonance",
    "genre": "Healing Frequency / Solfeggio",
    "description": "The natural acoustic tuning harmonic aligned with cosmic frequencies and heartbeat.",
    "audioUrl": "/audio/solfeggio-432hz.m4a"
  },
  {
    "id": "solfeggio-528hz",
    "name": "528 Hz Miracle Tone & Transformation",
    "genre": "Healing Frequency / Solfeggio",
    "description": "The revered frequency of boundless love, mental peace, and spiritual harmony.",
    "audioUrl": "/audio/solfeggio-528hz.m4a"
  },
  {
    "id": "solfeggio-639hz",
    "name": "639 Hz Interpersonal Harmony & Unity",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Fosters compassion, connection, understanding, and community togetherness.",
    "audioUrl": "/audio/solfeggio-639hz.m4a"
  },
  {
    "id": "solfeggio-741hz",
    "name": "741 Hz Intuition & Expressive Clarity",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Promotes intellectual clarity, truthful purpose, and mental focus.",
    "audioUrl": "/audio/solfeggio-741hz.m4a"
  },
  {
    "id": "solfeggio-852hz",
    "name": "852 Hz Spiritual Order & Enlightenment",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Deep inner peace awakening spiritual devotion and cosmic alignment.",
    "audioUrl": "/audio/solfeggio-852hz.m4a"
  },
  {
    "id": "solfeggio-963hz",
    "name": "963 Hz Crown Pure Consciousness Pad",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Transcendent ambient pad connecting to infinite light, stillness, and universal grace.",
    "audioUrl": "/audio/solfeggio-963hz.m4a"
  },
  {
    "id": "solfeggio-108hz",
    "name": "108 Hz Vedic Auspicious Tanpura Drone",
    "genre": "Healing Frequency / Solfeggio",
    "description": "Sacred Vedic number frequency radiating auspicious blessings across all homes.",
    "audioUrl": "/audio/solfeggio-108hz.m4a"
  },
  {
    "id": "solfeggio-136hz",
    "name": "136.1 Hz Cosmic Sadja Om Tone",
    "genre": "Healing Frequency / Solfeggio",
    "description": "The primordial sound of creation vibrating with profound grounding serenity.",
    "audioUrl": "/audio/solfeggio-136hz.m4a"
  },
  {
    "id": "santoor-shanti",
    "name": "Kashmiri Santoor Lake Shanti",
    "genre": "Acoustic Santoor",
    "description": "Gentle acoustic wooden hammer plucks echoing across Dal Lake.",
    "audioUrl": "/audio/santoor-shanti.m4a"
  },
  {
    "id": "santoor-dal-lake",
    "name": "Santoor & Water Reflections",
    "genre": "Acoustic Santoor",
    "description": "Peaceful ripples of mountain lakes accompanying resonant santoor melodies.",
    "audioUrl": "/audio/santoor-dal-lake.m4a"
  },
  {
    "id": "santoor-megh",
    "name": "Santoor Monsoon Cloudscape",
    "genre": "Acoustic Santoor",
    "description": "Delicate metallic resonance celebrating the arrival of refreshing monsoon showers.",
    "audioUrl": "/audio/santoor-megh.m4a"
  },
  {
    "id": "sarod-bhairav",
    "name": "Sarod Morning Prayer (Bhairav)",
    "genre": "Acoustic Sarod",
    "description": "Soulful steel string glides on polished teak fretboard.",
    "audioUrl": "/audio/sarod-bhairav.m4a"
  },
  {
    "id": "sarod-bilawal",
    "name": "Sarod Dawn Radiance",
    "genre": "Acoustic Sarod",
    "description": "Warm optimistic morning raga performed with pristine acoustic dignity.",
    "audioUrl": "/audio/sarod-bilawal.m4a"
  },
  {
    "id": "sitar-yaman-dusk",
    "name": "Sitar Twilight Yaman Meditation",
    "genre": "Acoustic Sitar",
    "description": "Graceful meend bends and sympathetic tarab resonance at dusk.",
    "audioUrl": "/audio/sitar-yaman-dusk.m4a"
  },
  {
    "id": "sitar-bhupali",
    "name": "Sitar Raga Bhupali Simplicity",
    "genre": "Acoustic Sitar",
    "description": "Five-note peaceful pentatonic scale expressing childlike joy and purity.",
    "audioUrl": "/audio/sitar-bhupali.m4a"
  },
  {
    "id": "sitar-tilak-kamod",
    "name": "Sitar Tilak Kamod Grace",
    "genre": "Acoustic Sitar",
    "description": "Charming, melodious phrasing evoking devotion and humble service.",
    "audioUrl": "/audio/sitar-tilak-kamod.m4a"
  },
  {
    "id": "veena-kalyani",
    "name": "Saraswati Veena Kalyani Alaap",
    "genre": "Acoustic Veena",
    "description": "Deep, resonant gamakas from South India's divine instrument.",
    "audioUrl": "/audio/veena-kalyani.m4a"
  },
  {
    "id": "veena-hamsadhwani",
    "name": "Veena Hamsadhwani Joyful Flight",
    "genre": "Acoustic Veena",
    "description": "Auspicious, vibrant swan-song raga welcoming prosperity and goodwill.",
    "audioUrl": "/audio/veena-hamsadhwani.m4a"
  },
  {
    "id": "bansuri-pahadi",
    "name": "Bansuri Raga Pahadi Mountain Echoes",
    "genre": "Acoustic Flute",
    "description": "Folk flute melody carrying songs across Himalayan terraced valleys.",
    "audioUrl": "/audio/bansuri-pahadi.m4a"
  },
  {
    "id": "bansuri-bhoop",
    "name": "Bansuri Bhoopali Sunset Serenade",
    "genre": "Acoustic Flute",
    "description": "Pure breath and bamboo overtones singing the five notes of peace.",
    "audioUrl": "/audio/bansuri-bhoop.m4a"
  },
  {
    "id": "bansuri-pilu",
    "name": "Bansuri Raga Pilu Village Nostalgia",
    "genre": "Acoustic Flute",
    "description": "Sweet, melancholic folk phrases celebrating ancient village bonds.",
    "audioUrl": "/audio/bansuri-pilu.m4a"
  },
  {
    "id": "shehnai-mangal",
    "name": "Shehnai Mangal Dhwani Auspicious Tune",
    "genre": "Acoustic Shehnai",
    "description": "Auspicious double-reed acoustic chimes blessing grassroots progress.",
    "audioUrl": "/audio/shehnai-mangal.m4a"
  },
  {
    "id": "harp-celtic-serenity",
    "name": "Celtic Harp Peaceful Waters",
    "genre": "Acoustic Harp",
    "description": "Cascading crystal harp arpeggios bringing timeless mental tranquility.",
    "audioUrl": "/audio/harp-celtic-serenity.m4a"
  },
  {
    "id": "acoustic-guitar-gramodyog",
    "name": "Gramodyog Fingerstyle Acoustic",
    "genre": "Acoustic Guitar",
    "description": "Warm nylon strings celebrating handloom weavers and rural artisans.",
    "audioUrl": "/audio/acoustic-guitar-gramodyog.m4a"
  },
  {
    "id": "felt-piano-sarvodaya",
    "name": "Felt Piano Sarvodaya Dawn",
    "genre": "Acoustic Piano",
    "description": "Intimate, warm felt hammers striking vintage strings for quiet reflection.",
    "audioUrl": "/audio/felt-piano-sarvodaya.m4a"
  },
  {
    "id": "piano-strings-uplift",
    "name": "Piano & Orchestral String Adagio",
    "genre": "Acoustic Piano",
    "description": "Heartwarming harmonic chords conveying hope, charity, and dignity.",
    "audioUrl": "/audio/piano-strings-uplift.m4a"
  },
  {
    "id": "tibetan-singing-bowls-monastery",
    "name": "Ladakh Monastery Singing Bowls",
    "genre": "Acoustic Bowls",
    "description": "Deep multi-phonic brass bowls echoing through mountain monasteries.",
    "audioUrl": "/audio/tibetan-singing-bowls-monastery.m4a"
  },
  {
    "id": "temple-bell-ghanta",
    "name": "Temple Ghanta Sacred Bronze Chimes",
    "genre": "Acoustic Bowls",
    "description": "Resonant temple bronze bell clearing all negative thoughts.",
    "audioUrl": "/audio/temple-bell-ghanta.m4a"
  },
  {
    "id": "shanti-ambient-warmth",
    "name": "Shanti Warm Atmospheric Glow",
    "genre": "Meditative Ambient Soundscape",
    "description": "Serene atmospheric synth pad radiating golden sunrise warmth.",
    "audioUrl": "/audio/shanti-ambient-warmth.m4a"
  },
  {
    "id": "dhyana-deep-stillness",
    "name": "Dhyana Deep Contemplative Stillness",
    "genre": "Meditative Ambient Soundscape",
    "description": "Hypnotic low-frequency drone perfect for meditation and focus.",
    "audioUrl": "/audio/dhyana-deep-stillness.m4a"
  },
  {
    "id": "moksha-infinite-peace",
    "name": "Moksha Infinite Sky Soundscape",
    "genre": "Meditative Ambient Soundscape",
    "description": "Vast spatial pads echoing through unclouded mountain peaks.",
    "audioUrl": "/audio/moksha-infinite-peace.m4a"
  },
  {
    "id": "ananda-inner-joy-pad",
    "name": "Ananda Radiant Joy Soundscape",
    "genre": "Meditative Ambient Soundscape",
    "description": "Uplifting harmonic overtone progression inspiring peace and optimism.",
    "audioUrl": "/audio/ananda-inner-joy-pad.m4a"
  },
  {
    "id": "samadhi-universal-light",
    "name": "Samadhi Universal Harmony Pad",
    "genre": "Meditative Ambient Soundscape",
    "description": "Ethereal angelic harmonic textures fostering deep tranquility.",
    "audioUrl": "/audio/samadhi-universal-light.m4a"
  },
  {
    "id": "gram-swaraj-village-hymn",
    "name": "Gram Swaraj Village Ambiance",
    "genre": "Meditative Ambient Soundscape",
    "description": "Warm pastoral ambient chords celebrating community self-reliance.",
    "audioUrl": "/audio/gram-swaraj-village-hymn.m4a"
  },
  {
    "id": "sarvodaya-global-hope",
    "name": "Sarvodaya Global Compassion Pad",
    "genre": "Meditative Ambient Soundscape",
    "description": "Stirring, dignified atmospheric pads evoking international unity.",
    "audioUrl": "/audio/sarvodaya-global-hope.m4a"
  },
  {
    "id": "karuna-compassion-strings",
    "name": "Karuna Compassion String Ensemble",
    "genre": "Meditative Ambient Soundscape",
    "description": "Gentle cello and violin pads playing slow, comforting chords.",
    "audioUrl": "/audio/karuna-compassion-strings.m4a"
  },
  {
    "id": "ahimsa-gentle-breeze",
    "name": "Ahimsa Gentle Nonviolence Tone",
    "genre": "Meditative Ambient Soundscape",
    "description": "Soft, non-intrusive harmonic atmosphere calming nervous systems.",
    "audioUrl": "/audio/ahimsa-gentle-breeze.m4a"
  },
  {
    "id": "seva-dedicated-service",
    "name": "Seva Spirit of Selfless Service",
    "genre": "Meditative Ambient Soundscape",
    "description": "Steady, grounding harmonic resonance inspiring quiet dedication.",
    "audioUrl": "/audio/seva-dedicated-service.m4a"
  },
  {
    "id": "prana-breath-of-life",
    "name": "Prana Deep Breath Vitality Pad",
    "genre": "Meditative Ambient Soundscape",
    "description": "Gentle pulsating ambient pad synchronized with human breathing rhythm.",
    "audioUrl": "/audio/prana-breath-of-life.m4a"
  },
  {
    "id": "satya-truth-clarity",
    "name": "Satya Pure Truth & Lucidity",
    "genre": "Meditative Ambient Soundscape",
    "description": "Crystal clear sine waves washing away mental fatigue.",
    "audioUrl": "/audio/satya-truth-clarity.m4a"
  },
  {
    "id": "tapas-resilience-strength",
    "name": "Tapas Inner Strength Drone",
    "genre": "Meditative Ambient Soundscape",
    "description": "Deep earth drone inspiring fortitude in rural social work.",
    "audioUrl": "/audio/tapas-resilience-strength.m4a"
  },
  {
    "id": "shanti-mantra-frequencies",
    "name": "Shanti Mantra Triple Peace Echo",
    "genre": "Meditative Ambient Soundscape",
    "description": "Layered Om frequencies radiating peace for mind, body, and soul.",
    "audioUrl": "/audio/shanti-mantra-frequencies.m4a"
  },
  {
    "id": "bhumika-mother-earth",
    "name": "Bhumika Mother Earth Sanctuary",
    "genre": "Meditative Ambient Soundscape",
    "description": "Low resonant frequencies connecting with natural soil and harvest.",
    "audioUrl": "/audio/bhumika-mother-earth.m4a"
  },
  {
    "id": "jyoti-light-of-wisdom",
    "name": "Jyoti Eternal Flame of Wisdom",
    "genre": "Meditative Ambient Soundscape",
    "description": "Warm harmonic overtones illuminating rural educational journeys.",
    "audioUrl": "/audio/jyoti-light-of-wisdom.m4a"
  },
  {
    "id": "chetana-awakened-mind",
    "name": "Chetana Mindful Awareness Drone",
    "genre": "Meditative Ambient Soundscape",
    "description": "Gentle binaural beating frequencies promoting relaxed alertness.",
    "audioUrl": "/audio/chetana-awakened-mind.m4a"
  },
  {
    "id": "sankalpa-noble-resolve",
    "name": "Sankalpa Noble Purpose Soundscape",
    "genre": "Meditative Ambient Soundscape",
    "description": "Inspiring, expansive chordal pad supporting charitable missions.",
    "audioUrl": "/audio/sankalpa-noble-resolve.m4a"
  },
  {
    "id": "mangala-auspicious-dawn",
    "name": "Mangala Auspicious Morning Radiance",
    "genre": "Meditative Ambient Soundscape",
    "description": "Peaceful ambient dawn chorus announcing auspicious new beginnings.",
    "audioUrl": "/audio/mangala-auspicious-dawn.m4a"
  },
  {
    "id": "amrita-nectar-of-life",
    "name": "Amrita Nectar of Grace Atmosphere",
    "genre": "Meditative Ambient Soundscape",
    "description": "Pure heavenly chord progression instilling enduring peace.",
    "audioUrl": "/audio/amrita-nectar-of-life.m4a"
  },
  {
    "id": "custom-stream",
    "name": "Custom Hosted Audio / MP3 Stream",
    "genre": "External Audio URL",
    "description": "Provide your own hosted MP3 or audio stream URL."
  }
];

export const DEFAULT_CUSTOMIZER_SETTINGS: CustomizerSettings = {
  sections: [
    {
      id: "hero",
      name: "Hero Banner Carousel",
      category: "hero",
      enabled: true,
      order: 1,
      description: "Full-width photographic slideshow with primary mission statement and support links.",
    },
    {
      id: "live_ticker",
      name: "Live Mission & Typing Ticker",
      category: "content",
      enabled: true,
      order: 2,
      description: "Interactive typewriter text showcasing dynamic mission statements with real-time operational pulse.",
    },
    {
      id: "photo_collage",
      name: "Stylish Collage Exhibition",
      category: "media",
      enabled: true,
      order: 3,
      description: "Magazine-style asymmetric photo collage showcasing authentic grassroots field operations.",
    },
    {
      id: "about",
      name: "About BSGSS Story & Scope",
      category: "content",
      enabled: true,
      order: 4,
      description: "The founding story since 1994, village roots, and 4 trust highlight cards.",
    },
    {
      id: "programmes",
      name: "Key Development Programmes",
      category: "content",
      enabled: true,
      order: 5,
      description: "Education, healthcare, skills training, and women empowerment pathways.",
    },
    {
      id: "media_showcase",
      name: "Community Action & Video Showcase",
      category: "media",
      enabled: true,
      order: 6,
      description: "Interactive tabs featuring photo moments, YouTube videos, and newspaper press clippings.",
    },
    {
      id: "government",
      name: "State & Central Govt Activities",
      category: "impact",
      enabled: true,
      order: 7,
      description: "Institutional public-purpose initiatives and government-aligned grassroots programmes.",
    },
    {
      id: "impact_stats",
      name: "Verified Impact Numbers",
      category: "impact",
      enabled: true,
      order: 8,
      description: "Key verifiable metrics: 50,000+ reached, 30,000+ patients treated, 5,000+ women trained.",
    },
    {
      id: "india_map",
      name: "Interactive India Operations Map",
      category: "impact",
      enabled: true,
      order: 9,
      description: "Interactive SVG map highlighting the 5 states and active districts of BSGSS presence.",
    },
    {
      id: "partners",
      name: "CSR Partnerships & Logo Marquee",
      category: "partners",
      enabled: true,
      order: 10,
      description: "Institutional CSR collaborators with interactive scrolling logo wall.",
    },
    {
      id: "management",
      name: "Leadership & Governance",
      category: "content",
      enabled: true,
      order: 11,
      description: "Profiles and guiding messages from Chairperson and CEO.",
    },
    {
      id: "support_cta",
      name: "Support & Contribution Banner",
      category: "action",
      enabled: true,
      order: 12,
      description: "Encouraging call to action with direct links to UPI, bank transfer, and 80G tax exemptions.",
    },
  ],
  audio: {
    enabled: true,
    trackId: "santoor-serenity",
    customUrl: "",
    defaultVolume: 0.22,
    clickSounds: true,
  },
  typing: {
    eyebrow: "LIVE SARVODAYA MOVEMENT · ACTIVE ACROSS 5 STATES",
    phrases: [
      "Empowering 1,00,000+ rural women through skill training & economic self-reliance.",
      "Conducting free cancer screenings & preventive medical care in 350+ villages.",
      "Nurturing sustainable livelihoods with Khadi, embroidery & Self Help Groups.",
      "Delivering transparent, verified grassroots change alongside 30+ CSR partners.",
      "Serving communities with dedication, dignity & equal opportunity since 1994.",
    ],
    statusText: "Field Operations Active in Delhi NCR · Haryana · UP · Punjab · Rajasthan",
  },
  images: {
    heroSlides: [
      "/images/bsgss/banners/589-banner-1.webp",
      "/images/bsgss/banners/590-banner-2.webp",
      "/images/bsgss/banners/592-banner-3.webp",
      "/images/bsgss/banners/593-untitled-4.webp",
    ],
    collagePhotos: [
      {
        id: "c1",
        src: "/images/bsgss/gallery-community/203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg",
        title: "Women Vocational Center",
        category: "Skill Development",
        tag: "Delhi NCR",
        caption: "Hands-on garment cutting and professional stitching training for rural young women.",
        year: "Active Hub",
        tilt: "-rotate-1",
        featured: true,
      },
      {
        id: "c2",
        src: "/images/bsgss/healthcare-camps/149-camp1.jpeg",
        title: "Mobile Health & Cancer Screening",
        category: "Healthcare",
        tag: "Rural Outreach",
        caption: "Specialist doctors providing free consultations, cancer diagnostics, and essential medicines.",
        year: "Field Clinic",
        tilt: "rotate-2",
      },
      {
        id: "c3",
        src: "/images/bsgss/gallery-training/185-tal1.jpeg",
        title: "Master Tailoring Class",
        category: "Empowerment",
        tag: "Self Reliance",
        caption: "Certification in apparel construction leading to micro-enterprise incubation.",
        year: "Vocational Batch",
        tilt: "-rotate-2",
      },
      {
        id: "c4",
        src: "/images/bsgss/gallery-community/200-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg",
        title: "Village Women Council",
        category: "Social Justice",
        tag: "Community Action",
        caption: "Participatory village meetings where women decide local priorities and development plans.",
        year: "Grassroots Circle",
        tilt: "rotate-1",
      },
      {
        id: "c5",
        src: "/images/bsgss/gallery-community/196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg",
        title: "Youth Digital & Life Skills",
        category: "Education",
        tag: "Digital Literacy",
        caption: "Introducing basic computer operations, typing, and digital tools to first-generation learners.",
        year: "Learning Lab",
        tilt: "-rotate-1",
      },
      {
        id: "c6",
        src: "/images/bsgss/healthcare-camps/150-camp3.jpeg",
        title: "Specialist Medical Consultations",
        category: "Wellness",
        tag: "Free Medicines",
        caption: "Direct healthcare access for elder villagers and mothers in remote districts.",
        year: "Health Camp",
        tilt: "rotate-2",
      },
    ],
  },
  footprint: {
    eyebrow: "Global Alliances & Verified Grassroots Footprint",
    heading: "Where grassroots action meets international vision.",
    description: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan anchors 30+ years of verified grassroots field execution across 350+ villages in India, with our institutional target to reach, connect, and collaborate globally across diaspora networks and UN SDG frameworks.",
    defaultMode: "world",
    worldNote: "Uncolored international territories represent our strategic global outreach roadmap and diaspora engagement horizon.",
    indiaNote: "Grassroots presence verified through official statutory filings across Uttar Pradesh, Delhi NCR, Haryana, Punjab, and Rajasthan.",
    globalVisionGoal: "Target: Expanding grassroots Indian handloom, health vans & micro-credit to 10+ international diaspora alliances.",
  },
};
