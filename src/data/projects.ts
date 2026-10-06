import { Project, StudioInfo } from '../types';

// Hero Videos from src/assets/Hero Videos
import ashianaAmodhVideo from '../assets/Hero Videos/Ashiana Amodh.mp4';
import atmosphereVideo from '../assets/Hero Videos/Atmosphere.mp4';
import avicoreVideo from '../assets/Hero Videos/Avicore.mp4';
import avicore2Video from '../assets/Hero Videos/Avicore2.mp4';
import avicore3Video from '../assets/Hero Videos/Avicore3.mp4';
import avicore4Video from '../assets/Hero Videos/Avicore4.mp4';
import cafeVideo from '../assets/Hero Videos/cafe.mp4';
import cineSanskritiVideo from '../assets/Hero Videos/Cine Sanskriti.mp4';
import fiddlecraftVideo from '../assets/Hero Videos/fiddlecraft.mp4';
import starfishVideo from '../assets/Hero Videos/Starfish Showreel.mp4';
import titanVideo from '../assets/Hero Videos/titan.mp4';

// Hero Covers from src/assets/Hero Covers
import ashianaAmodhCover from '../assets/Hero Covers/Ashiana Amodh.jpeg';
import atmosphereCover from '../assets/Hero Covers/atmostphere.jpg';
import avicore1Cover from '../assets/Hero Covers/Avicore1.jpeg';
import avicore2Cover from '../assets/Hero Covers/Avicore2.jpeg';
import avicore3Cover from '../assets/Hero Covers/Avicore3.jpeg';
import avicore4Cover from '../assets/Hero Covers/Avicore4.jpeg';
import cafeCover from '../assets/Hero Covers/cafe.jpg';
import cineSanskritiCover from '../assets/Hero Covers/Cine Sanskriti.jpg';
import fiddlecraftCover from '../assets/Hero Covers/fiddlecraft.jpeg';
import starfishCover from '../assets/Hero Covers/Starfish.jpeg';
import titanCover from '../assets/Hero Covers/titan.jpeg';

export const STUDIO_INFO: StudioInfo = {
  title: 'ODD MANGO',
  tagline: 'documenting emotion, movement and meaning.',
  bio: 'A boutique production studio with unyielding passion for storytelling. Photography and film documenting emotion, movement and meaning — for brands and culture.',
  since: '2016',
  location: 'Pune, Maharashtra',
  email: 'oddmangomedia@gmail.com',
  phone: '+91 93706 02824',
  instagram: '@oddmango',
  services: [
    'Commercial Photography',
    'Film Production & Direction',
    'Fashion & Editorial',
    'Brand Campaigns',
    'Events & Cultural Moments',
    'Art Direction & Color Grading'
  ],
  trustedClients: [
    { name: 'Aston Martin', slug: 'aston-martin', category: 'Automotive' },
    { name: 'Vans', slug: 'vans', category: 'Skate & Street' },
    { name: 'Under Armour', slug: 'under-armour', category: 'Performance' },
    { name: 'Nike', slug: 'nike', category: 'Sportswear' },
    { name: 'Adidas', slug: 'adidas', category: 'Sportswear' },
    { name: 'Puma', slug: 'puma', category: 'Sportswear' },
    { name: 'Netflix', slug: 'netflix', category: 'Entertainment' },
    { name: 'Red Bull', slug: 'redbull', category: 'Beverage & Culture' },
    { name: 'Crocs', slug: 'crocs', category: 'Footwear' },
    { name: 'New Balance', slug: 'new-balance', category: 'Footwear' },
    { name: 'Glenfiddich', slug: 'glenfiddich', category: 'Luxury Spirits' },
    { name: 'Johnnie Walker', slug: 'johnnie-walker', category: 'Luxury Spirits' },
    { name: 'Maybelline', slug: 'maybelline', category: 'Beauty' },
    { name: 'Fujifilm', slug: 'fujifilm', category: 'Imaging' }
  ]
};

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Omkar Janvekar',
    role: 'Founder & Creative Director',
    email: 'oddmangomedia@gmail.com',
    phone: '+91 93706 02824'
  }
];

export const PROJECTS: Project[] = [
  // 1. Ashiana Amodh
  {
    id: '1',
    slug: 'ashiana-amodh',
    name: 'Ashiana Amodh',
    client: 'Ashiana Amodh',
    type: 'motion',
    tag: 'commercial',
    count: 12,
    duration: 17,
    image: ashianaAmodhCover,
    video: ashianaAmodhVideo,
    gallery: [ashianaAmodhCover],
    alt: 'Ashiana Amodh luxury architectural and design motion film',
    description: 'Architectural serenity and luxurious spatial design captured through high-definition motion.',
    meta: {
      camera: 'RED V-Raptor 8K VV',
      lens: 'Leitz Hugo 50mm T1.5',
      aperture: 'T2.0',
      shutter: '1/48s',
      iso: '800',
      year: '2024',
      location: 'Ashiana Amodh Estate'
    }
  },
  // 2. Atmosphere
  {
    id: '2',
    slug: 'atmosphere',
    name: 'Atmosphere',
    client: 'Atmosphere',
    type: 'motion',
    tag: 'commercial',
    count: 15,
    duration: 102,
    image: atmosphereCover,
    video: atmosphereVideo,
    gallery: [atmosphereCover],
    alt: 'Atmosphere commercial campaign capturing architectural ambiance and lifestyle',
    description: 'Expansive commercial direction highlighting luxury retail architecture, daylight interaction, and curated consumer experience.',
    meta: {
      camera: 'ARRI Alexa Mini LF',
      lens: 'Cooke S4/i 32mm',
      aperture: 'T2.0',
      shutter: '1/48s',
      iso: '800',
      year: '2024',
      location: 'Retail Flagship'
    }
  },
  // 3. Avicore 1
  {
    id: '3',
    slug: 'avicore-1',
    name: 'Avicore 1',
    client: 'Avicore Dynamics',
    type: 'motion',
    tag: 'commercial',
    count: 9,
    duration: 11,
    image: avicore1Cover,
    video: avicoreVideo,
    gallery: [avicore1Cover],
    alt: 'Avicore motion showcase exploring tactile craft and modern visual energy',
    description: 'High-octane visual identity piece exploring precision performance, kinetic momentum, and modern digital craft.',
    meta: {
      camera: 'RED Komodo 6K',
      lens: 'Canon Cine-Servo 17-120mm',
      aperture: 'T2.8',
      shutter: '1/50s',
      iso: '800',
      year: '2024',
      location: 'Innovation Hub'
    }
  },
  // 4. Avicore 2
  {
    id: '4',
    slug: 'avicore-2',
    name: 'Avicore 2',
    client: 'Avicore Dynamics',
    type: 'motion',
    tag: 'campaign',
    count: 12,
    duration: 32,
    image: avicore2Cover,
    video: avicore2Video,
    gallery: [avicore2Cover],
    alt: 'Avicore 2 creative direction and cinematic brand campaign',
    description: 'An immersive cinematic brand narrative showcasing modern tailoring, evocative lighting, and focused pacing.',
    meta: {
      camera: 'Sony FX6',
      lens: 'Sony GM 24-70mm f/2.8',
      aperture: 'f/2.8',
      shutter: '1/48s',
      iso: '1250',
      year: '2024',
      location: 'Metropolitan Soundstage'
    }
  },
  // 5. Avicore 3
  {
    id: '5',
    slug: 'avicore-3',
    name: 'Avicore 3',
    client: 'Avicore Dynamics',
    type: 'motion',
    tag: 'editorial',
    count: 8,
    duration: 10,
    image: avicore3Cover,
    video: avicore3Video,
    gallery: [avicore3Cover],
    alt: 'Avicore 3 dynamic editorial short exploring form and rhythm',
    description: 'Fluid choreography meets high-contrast cinematography in a focused exploration of human silhouette and form.',
    meta: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 50mm',
      aperture: 'f/2.0',
      shutter: '1/50s',
      iso: '640',
      year: '2024',
      location: 'Concrete Warehouse'
    }
  },
  // 6. Avicore 4
  {
    id: '6',
    slug: 'avicore-4',
    name: 'Avicore 4',
    client: 'Avicore Dynamics',
    type: 'motion',
    tag: 'campaign',
    count: 10,
    duration: 10,
    image: avicore4Cover,
    video: avicore4Video,
    gallery: [avicore4Cover],
    alt: 'Avicore 4 concluding high-impact cinematic visual vignette',
    description: 'Expressive framing, bold saturation, and contemporary visual syntax highlighting avant-garde urban motion.',
    meta: {
      camera: 'ARRI Amira',
      lens: 'Zeiss Super Speed 25mm T1.3',
      aperture: 'T1.8',
      shutter: '1/48s',
      iso: '800',
      year: '2024',
      location: 'Downtown Rooftop'
    }
  },
  // 7. Cafe
  {
    id: '7',
    slug: 'cafe',
    name: 'Cafe',
    client: 'Hospitality & Dining',
    type: 'motion',
    tag: 'commercial',
    count: 11,
    duration: 7,
    image: cafeCover,
    video: cafeVideo,
    isReel: true,
    gallery: [cafeCover],
    alt: 'Culinary motion sizzle reel and cafe ambience tour',
    description: 'Dynamic pacing, culinary artistry, and vibrant restaurant hospitality captured on film.',
    meta: {
      camera: 'Phantom Flex4K',
      lens: 'Laowa 24mm T14 2X PeriProbe',
      aperture: 'T14',
      shutter: '1/2000s (1000fps)',
      iso: '1600',
      year: '2024',
      location: 'Culinary District'
    }
  },
  // 8. Cine Sanskriti
  {
    id: '8',
    slug: 'cine-sanskriti',
    name: 'Cine Sanskriti',
    client: 'Cine Sanskriti',
    type: 'motion',
    tag: 'events',
    count: 14,
    duration: 15,
    image: cineSanskritiCover,
    video: cineSanskritiVideo,
    gallery: [cineSanskritiCover],
    alt: 'Cine Sanskriti cinematic showcase capturing cultural essence and visual depth',
    description: 'Cinematic journey through cultural landscapes, rich textures and vibrant live movement.',
    meta: {
      camera: 'Sony FX6',
      lens: 'Sony GM 24-70mm f/2.8',
      aperture: 'f/2.8',
      shutter: '1/50s',
      iso: '1600',
      year: '2024',
      location: 'Cultural Tour'
    }
  },
  // 9. Fiddlecraft
  {
    id: '9',
    slug: 'fiddlecraft',
    name: 'Fiddlecraft',
    client: 'Fiddlecraft',
    type: 'motion',
    tag: 'events',
    count: 16,
    duration: 24,
    image: fiddlecraftCover,
    video: fiddlecraftVideo,
    gallery: [fiddlecraftCover],
    alt: 'Fiddlecraft musical and cultural motion production',
    description: 'Electrifying musical performance and rhythmic visuals documenting stage energy and acoustic craft.',
    meta: {
      camera: 'Sony FX9',
      lens: 'Fujinon MK 18-55mm T2.9',
      aperture: 'T2.9',
      shutter: '1/50s',
      iso: '1000',
      year: '2024',
      location: 'Concert Hall'
    }
  },
  // 10. Starfish Showreel
  {
    id: '10',
    slug: 'starfish-showreel',
    name: 'Starfish Showreel',
    client: 'Starfish',
    type: 'motion',
    tag: 'campaign',
    count: 20,
    duration: 30,
    image: starfishCover,
    video: starfishVideo,
    isReel: true,
    gallery: [starfishCover],
    alt: 'Starfish Showreel dynamic motion showcase',
    description: 'A bold showcase of high-impact visual storytelling, creative direction, and seamless cinematography.',
    meta: {
      camera: 'ARRI Alexa 35',
      lens: 'Cooke Panchro/i Classic 32mm',
      aperture: 'T2.3',
      shutter: '1/48s',
      iso: '800',
      year: '2024',
      location: 'Studio Stage'
    }
  },
  // 11. Titan
  {
    id: '11',
    slug: 'titan',
    name: 'Titan',
    client: 'Titan',
    type: 'motion',
    tag: 'commercial',
    count: 14,
    duration: 25,
    image: titanCover,
    video: titanVideo,
    gallery: [titanCover],
    alt: 'Titan premium commercial timepiece and lifestyle campaign',
    description: 'Precision craftsmanship, elegant reflections, and timeless cinematic aesthetics for Titan.',
    meta: {
      camera: 'ARRI Alexa Mini LF',
      lens: 'Master Anamorphic 50mm',
      aperture: 'T1.9',
      shutter: '1/48s',
      iso: '800',
      year: '2024',
      location: 'Production Studio'
    }
  }
];
