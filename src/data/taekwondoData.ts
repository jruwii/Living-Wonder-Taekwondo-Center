/*
 * All of the website content lives here, separated from the components.
 * Keeping the text in one place means the dojang staff can update class
 * times, notices or instructor details without touching any JSX.
 */

export interface Instructor {
  id: string;
  name: string;
  role: string;
  beltRank: string;
  experienceYears: string;
  tagline: string;
  bio: string[];
  credentials: string[];
  specialties: string[];
  imageUrl: string;
  isFounder?: boolean;
}

export interface Program {
  id: string;
  title: string;
  ageGroup: string;
  beltLevel: string;
  tagline: string;
  description: string;
  highlights: string[];
  schedule: string;
  iconName: string;
  badge: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  program: string;
  ageGroup: string;
  level: string;
  instructor: string;
  mat: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Belt Grading' | 'Tournament' | 'Special Event' | 'Holiday Notice';
  summary: string;
  details: string;
  isUrgent?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classes' | 'Grading' | 'Sparring' | 'Community';
  caption: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  tag: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface BeltStage {
  level: string;
  name: string;
  /** Tailwind classes for the little colored belt bar on the card */
  barClass: string;
  meaning: string;
  focus: string;
  duration: string;
}

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'master-edmond-dagpin',
    name: 'Master Edmond Dagpin',
    role: 'Founder & Head Master',
    beltRank: '6th Dan Kukkiwon Black Belt',
    experienceYears: '25+ Years Experience',
    tagline: '“Martial arts is not about teaching people how to fight, but empowering them to live with courage, kindness, and unshakeable character.”',
    bio: [
      'Master Edmond Dagpin is the visionary founder and Head Instructor of Living Wonder Taekwondo Center. With over two and a half decades dedicated to traditional and Olympic World Taekwondo, Master Dagpin has mentored hundreds of martial artists across the Philippines and Southeast Asia.',
      'Recognized for his patient, human-centered coaching philosophy, Master Edmond specializes in guiding students through crucial developmental milestones — especially children adapting to new social environments, young athletes preparing for national competition, and adult practitioners seeking focus and physical vitality.',
      'Under his leadership, Living Wonder Taekwondo Center has grown into an inclusive sanctuary where foreign families, relocated residents in Angeles City and Clark, and local youth find belonging, discipline, and lifelong friendships.'
    ],
    credentials: [
      '6th Dan Black Belt — Kukkiwon (World Taekwondo Headquarters, Seoul)',
      'Philippine Taekwondo Association (PTA) Licensed Master Instructor',
      'Certified International Referee & Poomsae Adjudicator',
      'Pampanga Regional Taekwondo Association Senior Technical Consultant',
      'Child & Youth Sports Psychology & Positive Mentorship Accredited',
      'Red Cross Certified in First Aid & Emergency Sports Response'
    ],
    specialties: [
      'Kukkiwon Standard Poomsae & Forms Mastery',
      'Youth Confidence Coaching & Anti-Bullying Leadership',
      'Olympic Sparring Tactical Footwork & Counter-Strategy',
      'Family Martial Arts Integration'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    isFounder: true
  },
  {
    id: 'coach-ara-santos',
    name: 'Coach Ara Santos',
    role: 'Head of Little Tigers & Youth Foundations',
    beltRank: '4th Dan Kukkiwon Black Belt',
    experienceYears: '10+ Years Experience',
    tagline: '“Every child learns differently. When we meet them with joy and patience, their confidence blooms effortlessly.”',
    bio: [
      'Coach Ara leads the Little Tigers (Ages 4–6) and early youth programs. With a strong background in Early Childhood Education and sports pedagogy, she transforms fundamental martial movements into joyful, interactive learning experiences.',
      'She has a proven track record of helping shy, anxious, or sensory-sensitive children feel safe, celebrated, and eager to participate in group classes.'
    ],
    credentials: [
      '4th Dan Black Belt — Kukkiwon Certified',
      'Former National University Collegiate Poomsae Medalist',
      'Early Childhood Movement & Motor Development Specialist',
      'Certified Youth Character Coach'
    ],
    specialties: [
      'Preschool Motor Coordination & Balance',
      'Active Listening & Focus Conditioning',
      'Introductory Korean Etiquette & Language',
      'Positive Reinforcement Pedagogy'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'coach-mark-villanueva',
    name: 'Coach Mark Villanueva',
    role: 'Head Sparring & Competition Team Coach',
    beltRank: '4th Dan Kukkiwon Black Belt',
    experienceYears: '12+ Years Experience',
    tagline: '“Real strength is composure under pressure. We train champions of sportsmanship first and athletes second.”',
    bio: [
      'Coach Mark steers the Competition and Sparring Team as well as Teens & Adults fitness conditioning. An experienced regional champion, he combines modern athletic conditioning with tactical electronic scoring sparring methods.',
      'He places strong emphasis on mutual respect, rigorous safety protocols, and helping teen athletes balance academic discipline with tournament goals.'
    ],
    credentials: [
      '4th Dan Black Belt — Kukkiwon Certified',
      'Central Luzon Regional Sparring Gold Medalist (Under-68kg)',
      'Certified Strength & Conditioning Specialist (CSCS)',
      'National Olympic Sparring Coach Certification (PTA)'
    ],
    specialties: [
      'Olympic Electronic Scoring Tactics (Daedo & KP&P)',
      'Agility, Speed Kicking & Dynamic Plyometrics',
      'Adult Functional Fitness & Stress Relief',
      'Athlete Mindset & Mental Resilience'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'coach-rachel-lim',
    name: 'Coach Rachel Lim',
    role: 'Poomsae Form Specialist & Community Coordinator',
    beltRank: '3rd Dan Kukkiwon Black Belt',
    experienceYears: '8+ Years Experience',
    tagline: '“Poomsae is moving meditation. It teaches precision, inner breath, and total presence.”',
    bio: [
      'Coach Rachel works closely with youth and adult students refining their traditional forms (Taegeuk and Black Belt Poomsae). She also serves as our Welcoming Coordinator for foreign and newcomer families relocating to Angeles City.',
      'Fluent in English, Filipino, and basic conversational Korean, she ensures seamless communication for international students.'
    ],
    credentials: [
      '3rd Dan Black Belt — Kukkiwon Certified',
      'Pampanga Poomsae Synchronized Forms Champion',
      'International Student Orientation Coordinator',
      'Certified Kyorugi & Poomsae Judge'
    ],
    specialties: [
      'Taegeuk 1–8 Forms Precision & Timing',
      'Flexibility & Core Mobility Training',
      'Newcomer Family Integration & Orientation',
      'Women’s Self-Defense & Practical Awareness'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'little-tigers',
    title: 'Little Tigers',
    ageGroup: 'Ages 4 – 6',
    beltLevel: 'Beginner Foundations',
    tagline: 'Playful movement, active listening, and social confidence.',
    description: 'Specially structured for young minds and growing bodies under Coach Ara and Master Edmond. Little Tigers introduces essential motor skills, balance, listening habits, and self-regulation in a joyful, encouraging environment.',
    highlights: [
      'Focus & listening skills through structured games',
      'Fundamental balance, agility, and motor coordination',
      'Basic kicks, punches, and Korean martial arts courtesy',
      'Positive reinforcement and confidence badges'
    ],
    schedule: 'Mon, Wed, Fri: 4:00 PM – 4:45 PM | Sat: 9:00 AM – 9:45 AM',
    iconName: 'Sparkles',
    badge: 'Preschool Foundations'
  },
  {
    id: 'kids-taekwondo',
    title: 'Kids Taekwondo',
    ageGroup: 'Ages 7 – 12',
    beltLevel: 'All Belts (White to Black)',
    tagline: 'Character building, poomsae forms, and resilient spirit.',
    description: 'Our core youth program balances authentic Taekwondo traditions with positive personal development. Students master poomsae (forms), basic sparring defense, and everyday leadership habits.',
    highlights: [
      'Comprehensive Kukkiwon-aligned belt curriculum',
      'Poomsae (forms), target kicking, and self-defense basics',
      'Bullying awareness, mental focus, and school discipline',
      'Supportive mentorship for newcomers & new residents'
    ],
    schedule: 'Mon – Fri: 5:00 PM – 6:00 PM | Sat: 10:00 AM – 11:15 AM',
    iconName: 'Shield',
    badge: 'Core Curriculum'
  },
  {
    id: 'teens-adults',
    title: 'Teens & Adults',
    ageGroup: 'Ages 13 and above',
    beltLevel: 'Beginner to Advanced',
    tagline: 'High-energy fitness, stress relief, and practical self-defense.',
    description: 'Whether you are starting martial arts for the first time or returning after years away, our adult classes combine dynamic cardiovascular conditioning, practical self-defense, and mental clarity.',
    highlights: [
      'Full-body conditioning, flexibility, and core power',
      'Real-world self-defense principles & situational awareness',
      'Stress relief in a respectful, ego-free community',
      'Flexible pacing tailored to your fitness level'
    ],
    schedule: 'Tue, Thu: 6:30 PM – 7:45 PM | Sat: 3:30 PM – 5:00 PM',
    iconName: 'Zap',
    badge: 'Fitness & Defense'
  },
  {
    id: 'competition-team',
    title: 'Competition & Sparring Team',
    ageGroup: 'Ages 8+ (By Invitation / Tryout)',
    beltLevel: 'Green Belt & Above',
    tagline: 'Advanced Olympic sparring techniques and competitive poise.',
    description: 'For dedicated athletes aspiring to compete in regional, national, and international tournaments. Focuses on Olympic electronic scoring tactics, athletic conditioning, and mental grit under pressure.',
    highlights: [
      'Olympic-style Kyorugi (sparring) & Poomsae competition training',
      'Footwork speed, reaction drills, and tactical game plans',
      'Safe, supervised sparring with full protective gear',
      'Regional Pampanga & Central Luzon championship preparation'
    ],
    schedule: 'Wed, Fri: 6:15 PM – 7:45 PM | Sat: 1:30 PM – 3:15 PM',
    iconName: 'Trophy',
    badge: 'Varsity Team'
  },
  {
    id: 'family-classes',
    title: 'Family Taekwondo',
    ageGroup: 'Parents & Children (All Ages)',
    beltLevel: 'All Levels Welcome',
    tagline: 'Bond, sweat, and progress together on the mats.',
    description: 'A unique opportunity for parents and kids to train side-by-side. Share healthy habits, learn the same belt syllabus, and build unforgettable family memories through martial arts.',
    highlights: [
      'Shared physical activity that unites parents and kids',
      'Mutual goal setting and shared belt testing ceremonies',
      'Family discounts and adaptable training stations',
      'Wonderful way for relocated families to make local friends'
    ],
    schedule: 'Saturday: 11:30 AM – 12:45 PM | Sunday Special Clinics',
    iconName: 'HeartHandshake',
    badge: 'Family Bonding'
  }
];

export const SCHEDULE_DATA: ScheduleItem[] = [
  // Monday
  { id: 'm1', day: 'Monday', time: '4:00 PM – 4:45 PM', program: 'Little Tigers', ageGroup: 'Ages 4–6', level: 'Beginner', instructor: 'Master Edmond / Coach Ara', mat: 'Mat A (Main Floor)' },
  { id: 'm2', day: 'Monday', time: '5:00 PM – 6:00 PM', program: 'Kids Taekwondo', ageGroup: 'Ages 7–12', level: 'White to Green Belt', instructor: 'Master Edmond Dagpin', mat: 'Mat A (Main Floor)' },
  { id: 'm3', day: 'Monday', time: '6:15 PM – 7:15 PM', program: 'Kids Advanced Poomsae', ageGroup: 'Ages 8–12', level: 'Blue to Black Belt', instructor: 'Coach Rachel Lim', mat: 'Mat B (Poomsae Hall)' },
  { id: 'm4', day: 'Monday', time: '7:30 PM – 8:30 PM', program: 'Adult Open Mat / Conditioning', ageGroup: 'Ages 14+', level: 'All Belts', instructor: 'Master Edmond & Coach Mark', mat: 'Mat A' },

  // Tuesday
  { id: 't1', day: 'Tuesday', time: '4:00 PM – 4:45 PM', program: 'Little Tigers Focus Drills', ageGroup: 'Ages 4–6', level: 'All Tigers', instructor: 'Coach Ara Santos', mat: 'Mat A' },
  { id: 't2', day: 'Tuesday', time: '5:00 PM – 6:00 PM', program: 'Kids Foundation & Kicking', ageGroup: 'Ages 7–12', level: 'All Levels', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },
  { id: 't3', day: 'Tuesday', time: '6:30 PM – 7:45 PM', program: 'Teens & Adults Taekwondo', ageGroup: 'Ages 13+', level: 'All Levels', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },

  // Wednesday
  { id: 'w1', day: 'Wednesday', time: '4:00 PM – 4:45 PM', program: 'Little Tigers', ageGroup: 'Ages 4–6', level: 'Beginner', instructor: 'Coach Ara Santos', mat: 'Mat A' },
  { id: 'w2', day: 'Wednesday', time: '5:00 PM – 6:00 PM', program: 'Kids Taekwondo', ageGroup: 'Ages 7–12', level: 'All Belts', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },
  { id: 'w3', day: 'Wednesday', time: '6:15 PM – 7:45 PM', program: 'Competition Sparring Team', ageGroup: 'Ages 8+', level: 'Green Belt & Up', instructor: 'Master Edmond & Coach Mark', mat: 'Mat A & B' },

  // Thursday
  { id: 'th1', day: 'Thursday', time: '4:00 PM – 4:45 PM', program: 'Little Tigers Agility', ageGroup: 'Ages 4–6', level: 'All Tigers', instructor: 'Coach Ara Santos', mat: 'Mat A' },
  { id: 'th2', day: 'Thursday', time: '5:00 PM – 6:00 PM', program: 'Kids Forms & Self-Defense', ageGroup: 'Ages 7–12', level: 'All Belts', instructor: 'Coach Rachel Lim', mat: 'Mat A' },
  { id: 'th3', day: 'Thursday', time: '6:30 PM – 7:45 PM', program: 'Teens & Adults Self-Defense', ageGroup: 'Ages 13+', level: 'All Belts', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },

  // Friday
  { id: 'f1', day: 'Friday', time: '4:00 PM – 4:45 PM', program: 'Little Tigers Fun & Focus', ageGroup: 'Ages 4–6', level: 'Beginner', instructor: 'Coach Ara Santos', mat: 'Mat A' },
  { id: 'f2', day: 'Friday', time: '5:00 PM – 6:00 PM', program: 'Kids Poomsae & Target Kicks', ageGroup: 'Ages 7–12', level: 'All Belts', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },
  { id: 'f3', day: 'Friday', time: '6:15 PM – 7:45 PM', program: 'Competition Sparring Team', ageGroup: 'Ages 8+', level: 'Team Members', instructor: 'Coach Mark Villanueva', mat: 'Mat A' },

  // Saturday
  { id: 's1', day: 'Saturday', time: '9:00 AM – 9:45 AM', program: 'Little Tigers Weekend Class', ageGroup: 'Ages 4–6', level: 'All Tigers', instructor: 'Coach Ara Santos', mat: 'Mat A' },
  { id: 's2', day: 'Saturday', time: '10:00 AM – 11:15 AM', program: 'Kids General Taekwondo', ageGroup: 'Ages 7–12', level: 'All Belts', instructor: 'Master Edmond Dagpin', mat: 'Mat A' },
  { id: 's3', day: 'Saturday', time: '11:30 AM – 12:45 PM', program: 'Family Taekwondo Class', ageGroup: 'Parents & Kids', level: 'All Levels', instructor: 'Master Edmond & Coach Ara', mat: 'Mat A' },
  { id: 's4', day: 'Saturday', time: '1:30 PM – 3:15 PM', program: 'Competition Team Strategy', ageGroup: 'Ages 8+', level: 'Team Only', instructor: 'Coach Mark Villanueva', mat: 'Mat A' },
  { id: 's5', day: 'Saturday', time: '3:30 PM – 5:00 PM', program: 'Teens & Adults Weekend Workout', ageGroup: 'Ages 13+', level: 'All Belts', instructor: 'Coach Rachel & Master Edmond', mat: 'Mat A' }
];

export const NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: 'Quarterly Belt Promotion Grading Test',
    date: 'Saturday, September 26, 2026',
    category: 'Belt Grading',
    summary: 'Official promotion examination presided over by Master Edmond Dagpin for eligible students from White Belt through Red Belt candidates.',
    details: 'Eligibility forms have been distributed during classes. Candidates must complete minimum attendance and master required Poomsae forms. Family and friends are warmly invited to cheer on our students in the main viewing gallery.',
    isUrgent: true
  },
  {
    id: 'notice-2',
    title: 'Pampanga Inter-Dojang Friendship Games',
    date: 'October 10 – 11, 2026',
    category: 'Tournament',
    summary: 'A friendly, sportsmanship-first regional tournament hosted here in Angeles City for our novice and varsity athletes.',
    details: 'Categories for Speed Kicking, Individual Poomsae, and Kyorugi (Sparring). Great opportunity for first-time tournament competitors in a safe, supportive setting.',
    isUrgent: false
  },
  {
    id: 'notice-3',
    title: 'Newcomer Family Welcome Week',
    date: 'Starting Next Monday',
    category: 'Special Event',
    summary: 'Complimentary uniform fitting and parent orientation with Master Edmond and Coach Rachel for newly enrolled students and relocated families.',
    details: 'Are you new to Angeles City or Clark? Join us after Saturday family class for light refreshments, meeting fellow parents, and a friendly walkthrough of our belt curriculum.',
    isUrgent: false
  },
  {
    id: 'notice-4',
    title: 'Philippine National Holiday Schedule',
    date: 'Upcoming Public Holiday',
    category: 'Holiday Notice',
    summary: 'Morning Little Tiger sessions merged with special noon community open mat. Evening classes proceed as regular.',
    details: 'Please check your parent WhatsApp announcement group for specific morning slot adjustments on official regular holidays.',
    isUrgent: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Little Tigers High-Five Warmup',
    category: 'Classes',
    caption: 'Teaching teamwork, listening skills, and mutual respect right from the opening bow.',
    imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g2',
    title: 'Belt Promotion Ceremony & Black Belt Oath',
    category: 'Grading',
    caption: 'Master Edmond Dagpin presenting certificates and celebrating personal perseverance during promotion exam.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g3',
    title: 'Poomsae Precision Training',
    category: 'Classes',
    caption: 'Focusing the mind, body, and breath through Taegeuk forms practice under Coach Rachel and Master Edmond.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g4',
    title: 'Olympic Sparring Drills with Full Safety Gear',
    category: 'Sparring',
    caption: 'Building fast reaction timing, courage, and athletic composure under Coach Mark Villanueva.',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g5',
    title: 'Family Bonding on the Mat',
    category: 'Community',
    caption: 'Parents and children sweating, smiling, and achieving goals together.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g6',
    title: 'Medalists & Sportsmanship Awardees',
    category: 'Sparring',
    caption: 'Proud smiles representing Living Wonder at the Central Luzon Taekwondo Championships.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M. (Expat Mom from Clark)',
    role: 'Mother of Lucas (Age 8) & Maya (Age 5)',
    tag: 'Relocated Family',
    quote: 'Moving from abroad to Angeles City was overwhelming for our kids until we met Master Edmond Dagpin and the Living Wonder team. The coaches welcomed them like family from day one. Lucas went from being painfully shy to leading warm-ups with pride. Truly a second home for us!',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't2',
    name: 'Atty. Roberto Santos',
    role: 'Adult Class Student & Father of Noah (Age 10)',
    tag: 'Parent & Adult Trainee',
    quote: 'I originally enrolled my son to build discipline, but after watching Master Edmond’s inspiring method, I joined the evening adult class myself. It is the best mental reset after long days at the office. Respectful, ego-free, and high energy.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't3',
    name: 'Min-Jun & Grace Park',
    role: 'Parents of Chloe (Age 7, Yellow Belt)',
    tag: 'Preschool to Youth Transition',
    quote: 'The teachers at Living Wonder understand children on an emotional level. Master Edmond and Coach Ara don’t just teach kicks; they teach gratitude, patience, and how to bounce back when things get challenging. The community here in Pampanga is wonderful.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const BELT_STAGES: BeltStage[] = [
  {
    level: '10th – 9th Geup',
    name: 'White Belt',
    barClass: 'bg-white border-slate-300',
    meaning: 'The Pure Beginning',
    focus: 'Signifies innocence and openness. The student is a clean slate ready to absorb foundational etiquette, balance, and basic stance.',
    duration: '2 – 3 months'
  },
  {
    level: '8th – 7th Geup',
    name: 'Yellow Belt',
    barClass: 'bg-amber-400 border-amber-500',
    meaning: 'The Earth & Seed',
    focus: 'Signifies the earth where roots are established. Focus shifts to basic front & roundhouse kicks and Taegeuk Il Jang.',
    duration: '3 – 4 months'
  },
  {
    level: '6th – 5th Geup',
    name: 'Green Belt',
    barClass: 'bg-emerald-500 border-emerald-600',
    meaning: 'The Growing Sprout',
    focus: 'Signifies growth and developing strength. Students master side kicks, counter-movements, and basic controlled sparring.',
    duration: '3 – 4 months'
  },
  {
    level: '4th – 3rd Geup',
    name: 'Blue Belt',
    barClass: 'bg-blue-600 border-blue-700',
    meaning: 'The Sky & Tree Height',
    focus: 'Signifies reaching toward the sky as skills mature. Complex jumping kicks, timing, and mental resilience under pressure.',
    duration: '4 – 6 months'
  },
  {
    level: '2nd – 1st Geup',
    name: 'Red Belt',
    barClass: 'bg-rose-600 border-rose-700',
    meaning: 'The Sun & Self-Control',
    focus: 'Signifies danger and high power. The student must practice deep self-restraint, leadership, and mentor junior belts.',
    duration: '6 months'
  },
  {
    level: '1st Dan / Poom',
    name: 'Black Belt (Dan/Poom)',
    barClass: 'bg-slate-950 border-slate-700',
    meaning: 'Mastery & A New Dawn',
    focus: 'The opposite of white; mastery of basics and entry into true martial artistry. A lifelong commitment to humility and community leadership.',
    duration: 'Lifelong Journey'
  }
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'My child has never done sports and is quite shy. Will they feel comfortable?',
    answer: 'Absolutely. That is our specialty! Master Edmond Dagpin and our instructors specialize in gentle positive reinforcement. We never push children into the spotlight before they are ready; instead, we partner them with supportive peers and celebrate every small step.'
  },
  {
    question: 'We just moved to Angeles City / Clark. Is your dojang welcoming to new residents and international families?',
    answer: 'Very much so! A significant portion of our community consists of relocated families, expat families, and local Angeles City residents. Master Edmond and our team conduct classes in clear, encouraging English and Filipino, ensuring everyone feels right at home.'
  },
  {
    question: 'What should we wear and bring to our Free Trial class?',
    answer: 'Wear comfortable athletic attire (like t-shirt and track pants or leggings). Taekwondo is practiced barefoot on our sanitized puzzle mats. Just bring a water bottle and an eager mind! We provide all training gear.'
  },
  {
    question: 'What is the minimum age to enroll?',
    answer: 'Our Little Tigers program welcomes children starting at 4 years old. If your child is 3.5 and potty-trained with good listening attention, Master Edmond and Coach Ara are happy to conduct a brief readiness assessment during a free trial.'
  },
  {
    question: 'Is Taekwondo safe for young children?',
    answer: 'Safety is our top priority. We use high-density shock-absorbing mats, certified padded safety targets, and strict non-contact or supervised light-touch rules for youth. Instructors are first-aid certified and maintain low student-to-coach ratios.'
  }
];
